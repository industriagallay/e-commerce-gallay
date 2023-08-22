import React, { useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
import { VITE_UPLOAD_PRESET } from "../../variable";

type CloudinaryImageUploadProps = {
  onImageUpload: (imageUrl: string, resetImage: () => void) => void;
  cloudinaryName: string;
  clearImage: () => void;
  initialImage: string;
};

const uploadPreset = VITE_UPLOAD_PRESET;

const CloudinaryImageUpload: React.FC<CloudinaryImageUploadProps> = ({
  onImageUpload,
  cloudinaryName,
  clearImage,
  initialImage,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>(
    initialImage || ""
  );
  const [image, setImage] = useState<string>(initialImage || "");

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

      const imageUrl = response.data.secure_url;
      setImage(imageUrl);
      setSelectedImageUrl(imageUrl);
      onImageUpload(imageUrl, resetImage);
    } catch (error) {
      console.error("Error uploading image: ", error);
    } finally {
      setIsUploading(false);
    }
  };

  const resetImage = () => {
    setImage("");
    clearImage();
  };

  return (
    <div onReset={resetImage}>
      <input type="file" onChange={handleImageUpload} />
      {isUploading ? (
        <p>Subiendo imagen...</p>
      ) : (
        image && (
          <div>
            <Image cloudName={cloudinaryName} publicId={image} width="300" />
            <button onClick={resetImage}>Limpiar Imagen</button>
          </div>
        )
      )}
    </div>
  );
};

export default CloudinaryImageUpload;
