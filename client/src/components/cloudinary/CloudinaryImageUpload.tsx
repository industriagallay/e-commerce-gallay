import React, { useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";

type CloudinaryImageUploadProps = {
  onImageUpload: (imageUrl: string) => void;
  cloudinaryName: string;
};

const CloudinaryImageUpload: React.FC<CloudinaryImageUploadProps> = ({
  onImageUpload,
  cloudinaryName,
}) => {
  const [image, setImage] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
        formData
      );

      setImage(response.data.secure_url);
      onImageUpload(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {image && (
        <Image cloudName={cloudinaryName} publicId={image} width="300" />
      )}
    </div>
  );
};

export default CloudinaryImageUpload;