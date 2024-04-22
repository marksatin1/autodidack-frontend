"use server";

import { createClient } from "@supabase/supabase-js";
import { AudioFile, CollageImage, ImageType, GalleryType, PageType } from "./definitions";

// SETUP
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

// API CALLS //
//           //
export async function getOnePhoto(photoID: number) {
  const { data, error } = await supabase.from("images").select("*").eq("id", photoID).limit(1);

  if (error) {
    console.error(error);
    throw new Error("Error fetching entrance photo");
  }

  if (data.length === 1) {
    const { id, description, path, width, height }: ImageType = data[0];
    return {
      id,
      description,
      path,
      width,
      height,
    };
  }
}

export async function getImagesInSequentialOrder(galleryid?: number) {
  // Remote Procedure Call built in Supabase
  const { data, error } = await supabase.rpc("get_images_in_sequential_order", {
    galleryid,
  });

  if (error) {
    console.error(error);
    throw new Error("Error fetching images in sequential order.");
  }

  if (data.length > 0) {
    return data.map((p: CollageImage) => {
      const {
        id,
        description,
        path,
        width,
        height,
        x_coord,
        y_coord,
        audio_id,
        audio_path,
        audio_type,
      } = p;
      return {
        id,
        description,
        path,
        width,
        height,
        x_coord,
        y_coord,
        audio_id,
        audio_path,
        audio_type,
      };
    });
  }
}

// returns all photos in random order OR all photos of specific gallery in random order
// variable names must be lowercase to work with supabase rpc - annoying
export async function getImagesInRandomOrder(galleryid?: number) {
  // Remote Procedure Call built in Supabase
  const { data, error } = await supabase.rpc("get_images_in_random_order", {
    galleryid,
  });

  if (error) {
    console.error(error);
    throw new Error("Error fetching random images.");
  }

  if (data.length > 0) {
    return data.map((p: CollageImage) => {
      const {
        id,
        description,
        path,
        width,
        height,
        x_coord,
        y_coord,
        audio_id,
        audio_path,
        audio_type,
      } = p;
      return {
        id,
        description,
        path,
        width,
        height,
        x_coord,
        y_coord,
        audio_id,
        audio_path,
        audio_type,
      };
    });
  }
}

export async function getPageMetadata(pageid?: number) {
  const { data, error } = await supabase.rpc("get_page_metadata", {
    pageid,
  });

  if (error) {
    console.error(error);
    throw new Error("Error fetching page metadata.");
  }

  if (data.length > 0) {
    return data.map((p: PageType) => {
      const { id, name, description, keywords } = p;
      return {
        id,
        name,
        description,
        keywords,
      };
    });
  }
}

export async function getGalleryMetadata(galleryid?: number) {
  const { data: galleryData, error } = await supabase.rpc("get_gallery_metadata", {
    galleryid,
  });

  if (error) {
    console.error(error);
    throw new Error("Error fetching galleries metadata.");
  }

  if (galleryData.length > 0) {
    return galleryData.map((g: GalleryType) => {
      const {
        id,
        name,
        description,
        keywords,
        image_path,
        image_width,
        image_height,
        image_description,
      } = g;
      return {
        id,
        name,
        description,
        keywords,
        image_path,
        image_width,
        image_height,
        image_description,
      };
    });
  }
}

export async function getAudioFiles(albumID: number) {
  const { data: audioFiles, error } = await supabase
    .from("audio")
    .select("*")
    .eq("album_id", albumID);

  if (error) {
    console.error(error);
    throw new Error(`Error fetching audio files for Album ID ${albumID}.`);
  }

  if (audioFiles.length > 0) {
    return audioFiles.map((f: AudioFile) => {
      const { id, path, type, title, artist, year, format } = f;
      return {
        id,
        path,
        type,
        title,
        artist,
        year,
        format,
      };
    });
  }
}
