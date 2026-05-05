import { createClient } from "./client";

/**
 * Upload an image to a Supabase storage bucket.
 * 
 * @param file The file object to upload
 * @param bucket The target bucket ('avatars' or 'banners')
 * @param userId The ID of the user (for pathing)
 */
export async function uploadImage(file: File, bucket: 'avatars' | 'banners', userId: string) {
  const supabase = createClient();
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${bucket}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = fileName;

  const { error: uploadError, data } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      upsert: true,
      cacheControl: '3600'
    });

  if (uploadError) {
    throw uploadError;
  }

  // Get the public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return publicUrl;
}
