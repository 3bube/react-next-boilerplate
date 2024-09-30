import supabase from '../utils/supabase.utils';


const uploadFile = async (file: File, bucketName: string): Promise<string | null> => {
    if (!file) return null;

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, {
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = await supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      if (!publicUrlData) throw new Error("Failed to get public URL");

      console.log('File uploaded successfully:', publicUrlData.publicUrl);
      return publicUrlData.publicUrl;
    } catch (err) {
      console.error('Failed to upload file:', err);
      throw new Error("Failed to upload file");
    }
};

export { uploadFile };