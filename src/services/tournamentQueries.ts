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
    // Update the query to specify the exact relationship with profiles using !tournaments_organizer_id_fkey
    const { data, error } = await supabase
      .from('tournaments')
      .select(`
        *,
        participants_count:tournament_participants(count),
        profiles!tournaments_organizer_id_fkey(name)
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

// Add the missing function that was moved from tournamentService.ts
export const fetchTournamentRegistrations = async (tournamentId: string) => {
  try {
    const { data, error } = await supabase
      .from('tournament_participants')
      .select(`
        *,
        profiles:profile_id(name, email)
      `)
      .eq('tournament_id', tournamentId);
      
    if (error) {
      console.error("Error fetching tournament registrations:", error);
      throw error;
    }
    
    return data || [];
  } catch (err) {
    console.error("Error in fetchTournamentRegistrations:", err);
    throw err;
  }
};
