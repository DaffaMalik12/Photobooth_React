// WebcamCapture.jsx
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Camera, RefreshCw } from "lucide-react";

const WebcamCapture = ({ images, setImages, maxPhotos = 3 }) => {
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
      setImages([...images, imageSrc]);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/png"
          className="rounded-lg border-4 border-gray-700 shadow-xl w-full max-w-md"
          height={400}
          width={500}
          mirrored={true}
        />

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
    </div>
  );
};

export default WebcamCapture;
