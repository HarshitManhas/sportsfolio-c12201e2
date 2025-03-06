
import { supabase } from "@/integrations/supabase/client";
import { Tournament } from "@/types/tournament";

export const fetchTournaments = async (): Promise<Tournament[]> => {
  try {
    const { data, error } = await supabase
      .from('tournaments')
      .select('*')
      .eq('visibility', 'public');
      
    if (error) {
      console.error("Error fetching tournaments:", error);
      throw error;
    }

    return data as Tournament[] || [];
  } catch (err) {
    console.error("Unexpected error:", err);
    throw err;
  }
};
