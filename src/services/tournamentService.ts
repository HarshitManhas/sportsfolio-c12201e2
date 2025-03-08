
import { supabase } from "@/integrations/supabase/client";
import { Tournament } from "@/types/tournament";

export const fetchTournaments = async (): Promise<Tournament[]> => {
  try {
    const { data, error } = await supabase
      .from('tournaments')
      .select(`
        *,
        participants_count:tournament_participants(count)
      `)
      .eq('visibility', 'public');
      
    if (error) {
      console.error("Error fetching tournaments:", error);
      throw error;
    }

    // Process the data to transform the participants_count from an array to a number
    const processedData = data.map((tournament: any) => ({
      ...tournament,
      participants_count: tournament.participants_count?.[0]?.count || 0
    }));

    return processedData as Tournament[] || [];
  } catch (err) {
    console.error("Unexpected error:", err);
    throw err;
  }
};

// Fetch a single tournament by its ID
export const fetchTournamentById = async (id: string): Promise<Tournament> => {
  try {
    const { data, error } = await supabase
      .from('tournaments')
      .select(`
        *,
        participants_count:tournament_participants(count),
        profiles(name)
      `)
      .eq('id', id)
      .single();
      
    if (error) {
      console.error("Error fetching tournament:", error);
      throw error;
    }

    // Process the data to transform the participants_count from an array to a number
    const processedData = {
      ...data,
      participants_count: data.participants_count?.[0]?.count || 0,
      organizer_name: data.profiles?.name || 'Unknown Organizer'
    };

    return processedData as Tournament;
  } catch (err) {
    console.error("Unexpected error:", err);
    throw err;
  }
};

// Define a more specific type for tournament creation that matches the required fields in the database
interface CreateTournamentData {
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
}

export const createTournament = async (tournamentData: CreateTournamentData): Promise<Tournament> => {
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
    
    const tournamentWithUserId = {
      ...tournamentData,
      organizer_id: userId
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
