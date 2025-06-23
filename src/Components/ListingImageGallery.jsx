// components/ListingImageGallery.jsx
import { useState } from "react";

const ListingImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images?.[0] || null);

  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
        <span className="text-gray-500">No Images Available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
        <img
          src={selectedImage}
          alt="Main listing"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail grid */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`rounded-md overflow-hidden h-24 transition-all duration-200 ${
              selectedImage === img
                ? "ring-4 ring-indigo-500 scale-105"
                : "opacity-70 hover:opacity-100 hover:scale-105"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListingImageGallery;