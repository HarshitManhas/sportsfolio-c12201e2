
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

// Define a more specific type for tournament creation that matches the required fields in the database
interface CreateTournamentData {
  title: string;
  sport: string;
  start_date: string;
  end_date: string;
  location: any; // Using 'any' for the JSON field
  skill_level: string;
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
