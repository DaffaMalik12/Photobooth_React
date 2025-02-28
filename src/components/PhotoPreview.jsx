import React, { useRef, useState } from "react";
import domtoimage from "dom-to-image";
import { Camera, Download, RefreshCw } from "lucide-react";

const PhotoPreview = ({ images, onRetake, template }) => {
  const previewRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  // Ensure images is an array and handle the new format with filter information
  const safeImages = Array.isArray(images) ? images : [];

  const getTemplateLayout = () => {
    switch (template) {
      case "Classic":
        return "grid-cols-1 gap-3";
      case "Modern":
        return "grid-cols-2 gap-2";
      case "Vintage":
        return "grid-cols-1 md:grid-rows-3 gap-3";
      case "Retro":
      case "Neon":
      case "Minimal":
      case "Nature":
      case "Tropical":
      case "Monochrome":
      case "Polaroid":
        return "grid-cols-1 gap-3";
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
      case "Retro":
        return {
          containerClass:
            "bg-teal-100 p-6 rounded-lg border-4 border-teal-500 shadow-lg",
          titleClass:
            "text-xl font-bold text-center text-teal-800 mb-4 font-mono",
          imageClass:
            "rounded-lg border-4 border-teal-300 shadow-md w-full h-auto object-cover transform -rotate-2",
        };
      case "Neon":
        return {
          containerClass:
            "bg-black p-6 rounded-lg border-4 border-pink-500 shadow-lg",
          titleClass:
            "text-xl font-bold text-center text-pink-500 mb-4 animate-pulse",
          imageClass:
            "rounded-lg border-4 border-blue-500 shadow-lg shadow-blue-500/50 w-full h-auto object-cover",
        };
      case "Minimal":
        return {
          containerClass: "bg-gray-50 p-6 rounded-sm shadow-sm",
          titleClass: "text-lg font-medium text-center text-gray-700 mb-4",
          imageClass: "w-full h-auto object-cover",
        };
      case "Nature":
        return {
          containerClass:
            "bg-green-50 p-6 rounded-lg border-2 border-green-600 shadow-lg",
          titleClass: "text-xl font-bold text-center text-green-800 mb-4",
          imageClass:
            "rounded-lg border-4 border-green-200 shadow-md w-full h-auto object-cover",
        };
      case "Tropical":
        return {
          containerClass:
            "bg-gradient-to-r from-orange-300 to-rose-300 p-6 rounded-lg shadow-lg",
          titleClass: "text-xl font-bold text-center text-white mb-4",
          imageClass:
            "rounded-lg border-4 border-white shadow-md w-full h-auto object-cover transform rotate-2",
        };
      case "Monochrome":
        return {
          containerClass:
            "bg-gray-900 p-6 rounded-lg border-2 border-gray-700 shadow-lg",
          titleClass: "text-xl font-bold text-center text-gray-100 mb-4",
          imageClass:
            "rounded-lg border-2 border-gray-500 shadow-md w-full h-auto object-cover grayscale",
        };
      case "Polaroid":
        return {
          containerClass: "bg-white p-8 shadow-xl",
          titleClass:
            "text-lg font-handwriting text-center text-gray-800 mt-4 transform -rotate-1",
          imageClass:
            "border-8 border-white shadow-md w-full h-auto object-cover transform -rotate-1",
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

  // Convert filter name to CSS class
  const getFilterClass = (filter) => {
    if (!filter || filter === "none") return "";
    if (filter === "brightness-150") return "brightness-150";
    if (filter === "contrast-150") return "contrast-150";
    if (filter === "blur-sm") return "blur-sm";
    return filter; // For grayscale, sepia, invert
  };

  const downloadImage = async () => {
    if (!previewRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await domtoimage.toPng(previewRef.current);
      const link = document.createElement("a");
      link.href = dataUrl;
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
          {safeImages.map((img, index) => {
            // Handle both old format (string) and new format (object with src and filter)
            const imgSrc = typeof img === "string" ? img : img.src;
            const imgFilter = typeof img === "string" ? "none" : img.filter;

            return (
              <div key={index} className={getFilterClass(imgFilter)}>
                <img
                  src={imgSrc}
                  alt={`Captured ${index + 1}`}
                  className={`${styles.imageClass} transition-all duration-300`}
                  style={
                    template === "Vintage"
                      ? {
                          transform: `rotate(${
                            index % 2 === 0 ? "1deg" : "-1deg"
                          }`,
                        }
                      : {}
                  }
                />
              </div>
            );
          })}
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
