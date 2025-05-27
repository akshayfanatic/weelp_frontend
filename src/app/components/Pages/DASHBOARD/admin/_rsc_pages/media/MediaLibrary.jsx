"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { useMediaStore } from "@/lib/store/useMediaStore";
import { UploadImagesForm } from "./ImageUploadForm";
import { ImagePreviewForm } from "./ImagePreviewForm";
import axios from "axios";
import { isEmpty } from "lodash";

const images = [
  {
    id: 1,
    url: "https://picsum.photos/id/1015/400/300",
    alt_text: "Mountain River",
    name: "mountain-river.jpg",
  },
  {
    id: 2,
    url: "https://picsum.photos/id/1025/400/300",
    alt_text: "Puppy",
    name: "puppy.jpg",
  },
  {
    id: 3,
    url: "https://picsum.photos/id/1043/400/300",
    alt_text: "Lake View",
    name: "lake-view.jpg",
  },
  {
    id: 4,
    url: "https://picsum.photos/id/1069/400/300",
    alt_text: "Desert Rock",
    name: "desert-rock.jpg",
  },
  {
    id: 5,
    url: "https://picsum.photos/id/1076/400/300",
    alt_text: "Ocean Cliff",
    name: "ocean-cliff.jpg",
  },
  {
    id: 6,
    url: "https://picsum.photos/id/1084/400/300",
    alt_text: "Snow Mountains",
    name: "snow-mountains.jpg",
  },
  {
    id: 7,
    url: "https://picsum.photos/id/1080/400/300",
    alt_text: "City View",
    name: "city-view.jpg",
  },
  {
    id: 8,
    url: "https://picsum.photos/id/1060/400/300",
    alt_text: "Forest Path",
    name: "forest-path.jpg",
  },
  {
    id: 9,
    url: "https://picsum.photos/id/1039/400/300",
    alt_text: "Sunset Beach",
    name: "sunset-beach.jpg",
  },
  {
    id: 10,
    url: "https://picsum.photos/id/1020/400/300",
    alt_text: "Green Hills",
    name: "green-hills.jpg",
  },
];

export function Medialibrary() {
  const [isClient, setIsClient] = useState(false); // Hydration
  const [libraryImages, setLibraryImages] = useState({
    success: "",
    data: [],
    loading: true, // Initial loading state
  });

  const [selectedImage, setSelectedImage] = useState({}); // Media Page View Popup
  const [selectedImages, setSelectedImages] = useState([]); // Selecting list of Images for store
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadImagePop, setUploadImagePopUp] = useState(false); // For Uploading Image Popup
  const [toggleUpdateSucess, setToggleSuccess] = useState(false); // upload state  {listener}
  const pathname = usePathname();
  const { addMedia, selectedMedia } = useMediaStore();
  const isMediaPage = pathname === "/dashboard/admin/media";

  // Fetch Media
  const fetchMedia = async () => {
    try {
      const response = await axios.get("/api/dashboard/media");
      return response?.data; // Must be an object { success: '', data: [] }
    } catch (err) {
      return { success: "false", data: [] };
    }
  };

  const getMedia = async () => {
    const result = await fetchMedia();
    setLibraryImages((prev) => ({
      ...prev,
      data: result, // Only store array here
      loading: false,
    }));
  };

  //Hydrate First
  useEffect(() => {
    setIsClient(true);

    // fetch media
    getMedia();
  }, []);


  // listner for uploadsStatus
  useEffect(() => {
    getMedia();
  }, [toggleUpdateSucess]);


  // Select image Store Functionality
  const handleSelect = (image) => {
    setSelectedImages((prev) => (prev.some((img) => img.id === image.id) ? prev.filter((img) => img.id !== image.id) : [...prev, image])); //not match with previous
  };

  // Select image Dialog Functionality
  const handleSelectMedia = (image) => {
    setSelectedImage(image);
    setIsDialogOpen(true);
  };

  // Handle Store Images
  const selectedImagesHandleStore = () => {
    // Add Media Images to Store
    addMedia(selectedImages);
  };

  const { loading, data = [] } = libraryImages;

  if (isClient) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Media</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                setUploadImagePopUp(!uploadImagePop);
              }}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search media..." className="pl-9" />
          </div>
        </div>

        {/* if loading  */}
        {loading ? (
          <div className=" h-auto flex items-center justify-center">
            {" "}
            <span className="loader"></span>{" "}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {/* Media Gallery */}
            {!loading && !isEmpty(data) ? (
              data.map((image, index) => (
                <Card
                  key={index}
                  className={`group relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer ${
                    isMediaPage ? "" : selectedImages.some((img) => img.id === image.id) && "border p-4 border-secondaryDark"
                  } `}
                  onClick={() => (isMediaPage ? handleSelectMedia(image) : handleSelect(image))}
                >
                  <img src={image?.url} alt={image?.alt_text} className="object-cover transition-all hover:scale-105 w-full h-full" />
                </Card>
              ))
            ) : (
              <>
                <div className={` flex items-center justify-center ${isMediaPage ? "h-screen" : "h-fit"}`}>Sorry No Images </div>
              </>
            )}

            {/* Dialog to show selected image */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="max-w-md min-h-fit h-fit">
                <DialogHeader>
                  <DialogTitle>Image Preview</DialogTitle>
                  <DialogDescription className="sr-only">{selectedImage?.alt}</DialogDescription>
                </DialogHeader>
                <ImagePreviewForm
                  selectedImage={selectedImage}
                  isDialogOpen={isDialogOpen}
                  setIsDialogOpen={setIsDialogOpen}
                  toggleUpdateSucess={toggleUpdateSucess}
                  setToggleSuccess={setToggleSuccess}
                />
              </DialogContent>
            </Dialog>

            {/* Dialog to Upload image */}
            <Dialog open={uploadImagePop} onOpenChange={setUploadImagePopUp}>
              <DialogContent className="md:max-w-screen-lg max-w-md rounded-md">
                <DialogHeader>
                  <DialogTitle>Upload Image</DialogTitle>
                  <DialogDescription>Select an image from your computer to upload.</DialogDescription>
                </DialogHeader>
                <UploadImagesForm uploadImagePop={uploadImagePop} setUploadImagePopUp={setUploadImagePopUp} toggleUpdateSucess={toggleUpdateSucess} setToggleSuccess={setToggleSuccess} />
              </DialogContent>
            </Dialog>

            {/* If Images Are Selected */}
            {!isMediaPage && !isEmpty(selectedImages) && (
              <Button onClick={selectedImagesHandleStore} className="bg-secondaryDark w-fit col-span-full">
                Select Images
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
}
