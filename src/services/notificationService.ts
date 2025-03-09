
import { supabase } from "@/integrations/supabase/client";

// Create a notification
export const createNotification = async (
  profileId: string,
  type: string,
  title: string,
  message: string
): Promise<void> => {
  try {
    const { error } = await supabase.rpc('create_notification', {
      profile_id: profileId,
      type: type,
      title: title,
      message: message
    });
    
    if (error) {
      console.error("Error creating notification:", error);
    }
  } catch (err) {
    console.error("Error in createNotification:", err);
  }
};
