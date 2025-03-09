
import { supabase } from "@/integrations/supabase/client";

// Upload a file to Supabase storage
export const uploadFile = async (file: File, folder: string): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('tournament_images')
      .upload(filePath, file);
    
    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      throw uploadError;
    }
    
    // Get the public URL for the uploaded file
    const { data } = supabase.storage
      .from('tournament_images')
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  } catch (err) {
    console.error("Error in file upload:", err);
    throw err;
  }
};
