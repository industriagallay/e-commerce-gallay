import React, { useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
import { VITE_UPLOAD_PRESET } from "../../variable";

type CloudinaryImageUploadProps = {
  onImageUpload: (imageUrl: string) => void;
  cloudinaryName: string;
};

const uploadPreset = VITE_UPLOAD_PRESET;

const CloudinaryImageUpload: React.FC<CloudinaryImageUploadProps> = ({
  onImageUpload,
  cloudinaryName,
}) => {
  const [image, setImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);

    const file = e.target.files && e.target.files[0];
    if (!file) {
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
        formData
      );

      setImage(response.data.secure_url);
      onImageUpload(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image: ", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {isUploading ? (
        <p>Subiendo imagen...</p>
      ) : (
        image && (
          <Image cloudName={cloudinaryName} publicId={image} width="300" />
        )
      )}
    </div>
  );
};

export default CloudinaryImageUpload;
