import { supabase } from "../supabase/client";


export async function uploadFiles(files: File[]) {

  const uploads = files.map(async (file) => {

    const { data, error } = await supabase.storage
      .from("wedding-photos")
      .upload(
        `photos/${file.name}`,
        file
      );


    if (error) {
      throw error;
    }


    return data;

  });


  return Promise.all(uploads);

}

export async function getPhotos() {

  const { data, error } = await supabase.storage
    .from("wedding-photos")
    .list("photos");


  if (error) {
    throw error;
  }


  return data.map((file) => {

    const { data } = supabase.storage
      .from("wedding-photos")
      .getPublicUrl(
        `photos/${file.name}`
      );


    return {
      url: data.publicUrl,
      type: file.metadata?.mimetype
    };

  });

}