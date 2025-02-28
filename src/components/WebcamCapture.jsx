import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Camera, RefreshCw } from "lucide-react";

const WebcamCapture = ({
  images,
  setImages,
  maxPhotos = 3,
  currentFilter,
  setFilter,
}) => {
  const webcamRef = useRef(null);
  const [countdown, setCountdown] = useState(null);

  const startCountdown = () => {
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          capturePhoto();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const capturePhoto = () => {
    if (webcamRef.current && images.length < maxPhotos) {
      const imageSrc = webcamRef.current.getScreenshot();
      // Store the image along with the current filter
      setImages([...images, { src: imageSrc, filter: currentFilter }]);
    }
  };

  // Convert filter name to CSS class
  const getFilterClass = (filter) => {
    if (filter === "none") return "";
    if (filter === "brightness-150") return "brightness-150";
    if (filter === "contrast-150") return "contrast-150";
    if (filter === "blur-sm") return "blur-sm";
    return filter; // For grayscale, sepia, invert
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className={getFilterClass(currentFilter)}>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/png"
            className="rounded-lg border-4 border-gray-700 shadow-xl w-full max-w-md"
            height={400}
            width={500}
            mirrored={true}
          />
        </div>

        {countdown && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-70 text-white text-6xl font-bold w-24 h-24 rounded-full flex items-center justify-center animate-pulse">
              {countdown}
            </div>
          </div>
        )}

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gray-900 bg-opacity-70 px-3 py-1 rounded-lg text-white">
            Photo {images.length + 1} of {maxPhotos}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={startCountdown}
          disabled={countdown !== null}
          className="bg-blue-600 px-6 py-3 rounded-full text-white font-medium hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Camera size={20} />
          {countdown ? `Taking photo in ${countdown}...` : "Take Photo"}
        </button>

        {images.length > 0 && (
          <button
            onClick={() => setImages(images.slice(0, -1))}
            className="bg-gray-700 px-4 py-2 rounded-lg text-white hover:bg-gray-600 transition-colors flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Undo Last Photo
          </button>
        )}
      </div>

      {/* Import FilterButtons component directly */}
      <div className="mt-6 w-full max-w-md">
        <h3 className="text-white text-center mb-2 font-medium">
          Photo Filters
        </h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            "none",
            "grayscale",
            "sepia",
            "invert",
            "brightness-150",
            "contrast-150",
            "blur-sm",
          ].map((filter) => (
            <button
              key={filter}
              onClick={() => setFilter(filter)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition border-2 ${
                currentFilter === filter
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white border-white/50"
              }`}
            >
              {filter === "none" ? "Normal" : filter.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebcamCapture;
