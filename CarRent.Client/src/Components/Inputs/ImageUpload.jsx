import React, { useState, useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { Upload, X } from "lucide-react";

export default function ImageUpload({
  control,
  name,
  error,
  className,
  multiple = false,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const initialPreviews = fields
      .map((field) => {
        if (typeof field === "string") {
          return field;
        } else if (field instanceof File) {
          return URL.createObjectURL(field);
        }
        return null;
      })
      .filter(Boolean);

    setPreviews(initialPreviews);

    return () => {
      previews.forEach((preview) => {
        if (preview && !preview.startsWith("http")) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [fields]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        console.error("Invalid file type:", file.type);
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setPreviews((prev) => [...prev, previewUrl]);
      append(file);
    });

    e.target.value = "";
  };

  const handleRemove = (index) => {
    const previewUrl = previews[index];
    if (previewUrl && !previewUrl.startsWith("http")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    remove(index);
  };

  return (
    <div className={`bg-white rounded-lg p-8 ${className}`}>
      <div className="space-y-4">
        {fields.length === 0 ? (
          <div>
            <label
              className={`flex flex-col items-center gap-4 cursor-pointer border-2 border-dashed rounded-lg p-8
              ${error ? "border-red-500 bg-red-50" : "border-gray-300"}`}
            >
              <Upload
                size={48}
                className={error ? "text-red-400" : "text-gray-400"}
              />
              <p
                className={
                  error
                    ? "text-red-600 font-medium"
                    : "text-gray-600 font-medium"
                }
              >
                Click to upload images
              </p>
              <input
                type="file"
                multiple={multiple}
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error.message}</p>
            )}
          </div>
        ) : (
          <div
            className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 ${
              error ? "p-4 border-2 border-red-500 bg-red-50 rounded-lg" : ""
            }`}
          >
            {fields.map((field, index) => (
              <div key={field.id || index} className="relative group">
                <img
                  src={previews[index]}
                  alt={`preview ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <div className="absolute top-0 left-0 bg-black bg-opacity-40 text-white text-xs px-2 py-1 rounded-tl-lg">
                  {field instanceof File
                    ? field.name.substring(0, 15) +
                      (field.name.length > 15 ? "..." : "")
                    : `Image ${index + 1}`}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <X size={16} className="text-red-500" />
                </button>
              </div>
            ))}

            {multiple && (
              <label className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                <Upload size={24} className="text-gray-400" />
                <span className="text-sm text-gray-500 mt-2">Add More</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error.message}</p>}
      </div>
    </div>
  );
}
