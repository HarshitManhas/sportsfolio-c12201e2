
import { supabase } from "@/integrations/supabase/client";
import { Tournament } from "@/types/tournament";
import { uploadFile } from "./fileUpload";

// Define a more specific type for tournament creation that matches the required fields in the database
export interface CreateTournamentData {
  title: string;
  sport: string;
  start_date: string;
  end_date: string;
  location: any; // Using 'any' for the JSON field
  max_participants: number;
  organizer_id: string;
  status: string;
  // Optional fields
  entry_fee?: string;
  format?: string;
  description?: string;
  rules?: string;
  visibility?: string;
  payment_qr_code?: string; // URL for payment QR code
  payment_upi_id?: string; // UPI ID for payment
}

export const createTournament = async (tournamentData: CreateTournamentData, qrCodeFile?: File): Promise<Tournament> => {
  try {
    // Check if the user is authenticated
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !sessionData.session) {
      console.error("Authentication error:", sessionError?.message || "User not authenticated");
      throw new Error("You must be logged in to create a tournament");
    }
    
    // Use the current user's ID as the organizer_id
    const userId = sessionData.session.user.id;
    
    // Check if the user profile exists
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();
    
    if (profileError || !profileData) {
      console.error("Profile error:", profileError?.message || "User profile not found");
      
      // If profile doesn't exist, create one
      const user = sessionData.session.user;
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: user.email || '',
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        });
      
      if (insertError) {
        console.error("Error creating profile:", insertError);
        throw new Error("Failed to create user profile");
      }
    }
    
    // Upload QR code if provided
    let qrCodeUrl = undefined;
    if (qrCodeFile) {
      qrCodeUrl = await uploadFile(qrCodeFile, 'qr_codes');
    }
    
    const tournamentWithUserId = {
      ...tournamentData,
      organizer_id: userId,
      payment_qr_code: qrCodeUrl
    };
    
    console.log("Creating tournament with data:", tournamentWithUserId);
    
    const { data, error } = await supabase
      .from('tournaments')
      .insert(tournamentWithUserId)
      .select()
      .single();

    if (error) {
      console.error("Error creating tournament:", error);
      throw error;
    }

    return data as Tournament;
  } catch (err) {
    console.error("Unexpected error:", err);
    throw err;
  }
};
