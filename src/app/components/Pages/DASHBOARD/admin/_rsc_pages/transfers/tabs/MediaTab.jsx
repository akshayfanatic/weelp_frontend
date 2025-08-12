"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useMediaStore } from "@/lib/store/useMediaStore";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const Medialibrary = dynamic(() => import("../../media/MediaLibrary").then((mod) => mod.Medialibrary), { ssr: false }); // dynamically import model

// Media Tab
const MediaTab = () => {
  const { control } = useFormContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activityImages, setActivityImages] = useState([]); // all images intialize
  const { selectedMedia, resetMedia } = useMediaStore(); // Retrive images From Media

  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const media = useWatch({
    name: "media_gallery",
  });

  //  Hydarte First if there is already media exist
  useEffect(() => {
    if (media?.length > 0) {
      setActivityImages(media); // Sync from form to local state
    }
  }, []);

  // sideeffect for getting image from gallery popup
  useEffect(() => {
    if (selectedMedia.length > 0) {
      // 1. Transform selectedMedia (id → media_id) before adding
      const transformedMedia = selectedMedia.map((obj) => _.mapKeys(obj, (value, key) => (key === "id" ? "media_id" : key))); // update key to media id

      // 2. Push transformed data to local state
      setActivityImages((prev) => [...prev, ...transformedMedia]);
      resetMedia(); // runs immediately after set
      setDialogOpen(false);
    }
  }, [selectedMedia]);

  // sycn with form
  useEffect(() => {
    setValue("media_gallery", activityImages); // sync form
  }, [activityImages, setValue]);

  // handleDelteImage
  const handleDeleteImage = (image) => {
    setActivityImages((prev) => {
      const updatedImages = prev.filter((img) => img.url !== image.url);
      // setActivityImages(updatedImages);
      setTimeout(() => setValue("media_gallery", updatedImages), false); //
      return updatedImages;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="hidden">
        <Controller
          control={control}
          name="media_gallery"
          // defaultValue={[]}
          rules={{
            validate: (val) => val?.length > 0 || "Please upload at least 1 image.",
          }}
          render={() => ""}
        />
      </div>

      {/**Uploaded Media As Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-fit self-end">
            Upload Media
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-screen-xl">
          <DialogTitle className="sr-only">Edit profile</DialogTitle>
          <DialogDescription className="invisible">Upload Media For Activity</DialogDescription>
          <Medialibrary />
        </DialogContent>
      </Dialog>

      {/**Selected Media From Store */}
      {activityImages.length > 0 ? (
        <div className="w-full flex flex-wrap gap-4 ">
          {activityImages.map((image, index) => {
            return (
              <div key={index} className="group/item relative rounded-md border cursor-pointer p-2 border-black">
                <img className="size-72 rounded-md border" src={image?.url} alt="activity_image" />
                <Trash2 onClick={() => handleDeleteImage(image)} className="absolute bottom-8 right-8 size-0 group-hover/item:size-6 transition-all text-red-400 bg-white rounded-full shadow" />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full">{errors.media && <p className="text-red-500 mt-1">{errors.media.message}</p>}</div>
      )}
    </div>
  );
};

export default MediaTab;
