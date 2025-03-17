import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { X, ArrowLeft, ArrowRight, Upload } from "lucide-react";

interface ImageType {
  public_id: string;
  url: string;
}

interface ImageUploadProps {
  images: ImageType[];
  setImages: (images: ImageType[]) => void;
  onUpload: (files: File[]) => Promise<ImageType[]>;
  onDelete: (publicId: string) => Promise<void>;
}

export default function ImageUpload({ images = [], setImages, onUpload, onDelete }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsUploading(true);
      try {
        const uploadedImages = await onUpload(acceptedFiles);
        setImages((prev) => [...prev, ...uploadedImages]);
      } catch (error) {
        console.log(error);
      }
      setIsUploading(false);
    },
    [onUpload, setImages]
  );

  const removeImage = async (publicId) => {
    try {
      await onDelete(publicId);
      setImages((prev) => prev.filter((img) => img.public_id !== publicId));
     
    } catch (error) {
        console.log(error);
    }
  };

  const moveImage = (index, direction) => {
    setImages((prev) => {
      const newImages = [...prev];
      const [movedImage] = newImages.splice(index, 1);
      newImages.splice(direction === "left" ? index - 1 : index + 1, 0, movedImage);
      return newImages;
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="max-w-2xl border p-6 bg-background rounded-md my-4">
      <h2 className="text-xl font-bold mb-4">Images</h2>
      <div
        {...getRootProps()}
        className={`border border-dashed bg-image-man rounded-lg p-8 mb-4 text-center cursor-pointer ${
          isDragActive ? "border-emerald-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <p className="mt-4 text-lg font-semibold">Drop or select file</p>
      </div>
      {images.length > 0 && (
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-4 mb-4">
          {images.map((image, index) => (
            <div key={image.public_id} className="relative group">
              <img
                src={image.url}
                alt={`preview ${index}`}
                className="aspect-square h-30 w-40 object-cover rounded-xl"
              />
              <button
                onClick={() => removeImage(image.public_id)}
                className="absolute top-1 right-1 bg-gray-500/80 rounded-full p-1 opacity-100 hover:bg-gray-600"
              >
                <X className="h-4 w-4 text-white" />
              </button>
              <div className="absolute bottom-2 right-2 flex space-x-2">
                {index > 0 && (
                  <button
                    onClick={() => moveImage(index, "left")}
                    className="bg-white rounded-full p-1 shadow-md"
                  >
                    <ArrowLeft className="h-4 w-4 text-gray-600" />
                  </button>
                )}
                {index < images.length - 1 && (
                  <button
                    onClick={() => moveImage(index, "right")}
                    className="bg-white rounded-full p-1 shadow-md"
                  >
                    <ArrowRight className="h-4 w-4 text-gray-600" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        disabled={isUploading || images.length === 0}
        className={`px-4 py-2 bg-green-600 text-white rounded-full flex items-center ${
          isUploading || images.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
        }`}
      >
        {isUploading ? "Uploading..." : <><Upload className="mr-2 h-5 w-5" /> Upload</>}
      </button>
    </div>
  );
}