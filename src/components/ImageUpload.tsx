import { FieldAttributes } from "formik";
import React from "react";

interface ImageUploadProps {
  field: FieldAttributes<any>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ field }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    console.log("file", file);

    // Handle the selected file here or perform any necessary actions
  };

  return (
    <label
      className="relative flex items-center justify-center w-1/2 mx-auto h-32 bg-purple-900 bg-opacity-[33%] rounded-md border-dashed border-2 border-purple-700 cursor-pointer"
      htmlFor={field.name}
    >
      <input
        type="file"
        id={field.name}
        className="sr-only"
        accept="image/*"
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-center text-purple-900 font-metrophobic">
        <p className="font-bold text-2xl">+</p>
        <p>Add Image</p>
      </div>
    </label>
  );
};

export default ImageUpload;
