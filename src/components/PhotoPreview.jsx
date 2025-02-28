// PhotoPreview.jsx
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Camera, Download, RefreshCw } from "lucide-react";

const PhotoPreview = ({ images, onRetake, template }) => {
  const previewRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const safeImages = Array.isArray(images) ? images : [];

  const getTemplateLayout = () => {
    switch (template) {
      case "Classic":
        return "grid-cols-1 gap-3";
      case "Modern":
        return "grid-cols-2 gap-2";
      case "Vintage":
        return "grid-cols-1 md:grid-rows-3 gap-3";
      default:
        return "grid-cols-1 gap-3";
    }
  };

  const getTemplateStyles = () => {
    switch (template) {
      case "Classic":
        return {
          containerClass:
            "bg-white p-6 rounded-lg border-2 border-gray-300 shadow-lg",
          titleClass: "text-xl font-bold text-center text-gray-800 mb-4",
          imageClass:
            "rounded-lg border-2 border-gray-400 shadow-md w-full h-auto object-cover",
        };
      case "Modern":
        return {
          containerClass:
            "bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-lg shadow-xl",
          titleClass: "text-xl font-bold text-center text-white mb-4",
          imageClass: "rounded-lg shadow-md w-full h-auto object-cover",
        };
      case "Vintage":
        return {
          containerClass:
            "bg-amber-50 p-6 rounded-lg border-4 border-amber-800 shadow-lg",
          titleClass:
            "text-xl font-serif font-bold text-center text-amber-900 mb-4",
          imageClass:
            "rounded-none border-8 border-white shadow-md w-full h-auto object-cover transform rotate-1",
        };
      default:
        return {
          containerClass:
            "bg-white p-6 rounded-lg border-2 border-gray-300 shadow-lg",
          titleClass: "text-xl font-bold text-center text-gray-800 mb-4",
          imageClass:
            "rounded-lg border-2 border-gray-400 shadow-md w-full h-auto object-cover",
        };
    }
  };

  const downloadImage = async () => {
    if (!previewRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(previewRef.current);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `photobooth-${template.toLowerCase()}.png`;
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    } finally {
      setDownloading(false);
    }
  };

  const styles = getTemplateStyles();

  return (
    <div className="flex flex-col items-center">
      <div
        ref={previewRef}
        className={`${styles.containerClass} max-w-md w-full transition-all duration-300 ease-in-out`}
      >
        <h2 className={styles.titleClass}>{template} Photobooth</h2>
        <div className={`grid ${getTemplateLayout()}`}>
          {safeImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Captured ${index + 1}`}
              className={`${styles.imageClass} transition-all duration-300`}
              style={
                template === "Vintage"
                  ? {
                      transform: `rotate(${index % 2 === 0 ? "1deg" : "-1deg"}`,
                    }
                  : {}
              }
            />
          ))}
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <button
          onClick={onRetake}
          className="bg-red-500 px-4 py-2 rounded-md text-white font-medium shadow-md hover:bg-red-600 transition-colors duration-200 flex items-center gap-2"
          disabled={downloading}
        >
          <RefreshCw size={18} />
          Retake
        </button>
        <button
          onClick={downloadImage}
          className="bg-green-500 px-4 py-2 rounded-md text-white font-medium shadow-md hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
          disabled={downloading}
        >
          <Download size={18} />
          {downloading ? "Processing..." : "Download"}
        </button>
      </div>
    </div>
  );
};

export default PhotoPreview;
