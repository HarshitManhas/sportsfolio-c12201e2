import { supabase } from "@/integrations/supabase/client";
import { uploadFile } from "./fileUpload";
import { createNotification } from "./notificationService";

// Register for a tournament 
export const registerForTournament = async (
  tournamentId: string, 
  registrationData: any, 
  paymentScreenshot?: File
): Promise<any> => {
  try {
    // Check if the user is authenticated
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !sessionData.session) {
      throw new Error("You must be logged in to register for a tournament");
    }
    
    const userId = sessionData.session.user.id;
    
    // Upload payment screenshot if provided
    let paymentScreenshotUrl = undefined;
    if (paymentScreenshot) {
      paymentScreenshotUrl = await uploadFile(paymentScreenshot, 'payment_screenshots');
    }
    
    // Add user to tournament participants
    const { error: participantError } = await supabase
      .from('tournament_participants')
      .insert({
        profile_id: userId,
        tournament_id: tournamentId,
        payment_status: 'pending',
        payment_details: {
          ...registrationData,
          payment_screenshot_url: paymentScreenshotUrl,
          timestamp: new Date().toISOString()
        }
      });
      
    if (participantError) {
      console.error("Error registering for tournament:", participantError);
      throw participantError;
    }
    
    // Get tournament organizer for notification purposes
    const { data: tournamentData, error: tournamentError } = await supabase
      .from('tournaments')
      .select('organizer_id, title')
      .eq('id', tournamentId)
      .single();
      
    if (!tournamentError && tournamentData) {
      // Create notification for the organizer
      await createNotification(
        tournamentData.organizer_id,
        'tournament_registration',
        'New Tournament Registration',
        `A new player has registered for your tournament: ${tournamentData.title}`
      );
    }
    
    return { success: true };
  } catch (err) {
    console.error("Error registering for tournament:", err);
    throw err;
  }
};

// Fetch pending registrations for a tournament organizer
export const fetchPendingRegistrations = async (tournamentId: string) => {
  try {
    const { data, error } = await supabase
      .from('tournament_participants')
      .select(`
        *,
        profiles:profile_id(name, email)
      `)
      .eq('tournament_id', tournamentId)
      .eq('payment_status', 'pending');
      
    if (error) {
      console.error("Error fetching pending registrations:", error);
      throw error;
    }
    
    return data || [];
  } catch (err) {
    console.error("Error in fetchPendingRegistrations:", err);
    throw err;
  }
};

// Update registration status
export const updateRegistrationStatus = async (
  tournamentId: string,
  profileId: string,
  status: 'approved' | 'denied',
  notes?: string
) => {
  try {
    // Check if the user is authenticated and is the tournament organizer
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !sessionData.session) {
      throw new Error("You must be logged in to update registration status");
    }
    
    const organizerId = sessionData.session.user.id;
    
    // Verify the user is the tournament organizer
    const { data: tournamentData, error: tournamentError } = await supabase
      .from('tournaments')
      .select('id, title')
      .eq('id', tournamentId)
      .eq('organizer_id', organizerId)
      .single();
      
    if (tournamentError || !tournamentData) {
      throw new Error("You are not authorized to update this tournament's registrations");
    }
    
    // Update the registration status
    const { error: updateError } = await supabase
      .from('tournament_participants')
      .update({ payment_status: status })
      .eq('tournament_id', tournamentId)
      .eq('profile_id', profileId);
      
    if (updateError) {
      console.error("Error updating registration status:", updateError);
      throw updateError;
    }
    
    // Record the organizer action
    const { error: actionError } = await supabase
      .from('tournament_organizer_actions')
      .upsert({
        tournament_id: tournamentId,
        participant_id: profileId,
        action: status,
        notes: notes || ''
      });
      
    if (actionError) {
      console.error("Error recording organizer action:", actionError);
    }
    
    // Create notification for the participant
    const notificationTitle = status === 'approved' 
      ? 'Tournament Registration Approved' 
      : 'Tournament Registration Denied';
      
    const notificationMessage = status === 'approved'
      ? `Your registration for ${tournamentData.title} has been approved!`
      : `Your registration for ${tournamentData.title} has been denied.${notes ? ` Reason: ${notes}` : ''}`;
      
    await createNotification(
      profileId,
      'registration_status',
      notificationTitle,
      notificationMessage
    );
    
    return { success: true };
  } catch (err) {
    console.error("Error in updateRegistrationStatus:", err);
    throw err;
  }
};
