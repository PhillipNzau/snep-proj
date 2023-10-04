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
      className="relative flex items-center justify-center w-32 h-32 bg-purple-900 rounded-md border-dashed border-2 border-purple-900 cursor-pointer"
      htmlFor={field.name}
    >
      <input
        type="file"
        id={field.name}
        className="sr-only"
        accept="image/*"
        onChange={handleFileChange}
      />
      +
    </label>
  );
};

export default ImageUpload;
