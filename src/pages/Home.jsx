import React, { useState, useEffect } from "react";
import WebcamCapture from "../components/WebcamCapture";
import PhotoPreview from "../components/PhotoPreview";
import TemplatePicker from "../components/TemplatePicker";
import { Camera } from "lucide-react";

const Home = () => {
  const [images, setImages] = useState([]);
  const [template, setTemplate] = useState("Classic");
  const [cameraReady, setCameraReady] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("none"); // State untuk filter
  const MAX_PHOTOS = 4;

  useEffect(() => {
    // Check if the browser supports camera access
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => setCameraReady(true))
        .catch((error) => console.error("Camera access error:", error));
    }
  }, []);

  // Filter options
  const filters = [
    { id: "none", label: "Normal" },
    { id: "grayscale", label: "Grayscale" },
    { id: "sepia", label: "Sepia" },
    { id: "invert", label: "Invert" },
    { id: "brightness-150", label: "Bright" },
    { id: "contrast-150", label: "Contrast" },
    { id: "blur-sm", label: "Blur" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center py-6 mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Camera size={36} className="text-blue-400" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              React Photobooth
            </h1>
          </div>
          <p className="text-gray-300 max-w-md mx-auto">
            Capture memories with our digital photobooth. Choose a template,
            apply filters, and take up to {MAX_PHOTOS} photos!
          </p>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center">
          <TemplatePicker onSelect={setTemplate} currentTemplate={template} />

          {/* Filter Selector */}
          <div className="mb-6 w-full max-w-md">
            <h3 className="text-gray-300 text-center mb-2 font-medium">
              Choose Filter
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setCurrentFilter(filter.id)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                    currentFilter === filter.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Camera Section */}
            <div className="flex flex-col items-center">
              {!cameraReady ? (
                <div className="bg-gray-800 p-8 rounded-lg text-center">
                  <p className="text-lg text-gray-300 mb-3">
                    Please allow camera access to use the photobooth
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-600 px-4 py-2 rounded-lg"
                  >
                    Retry Camera Access
                  </button>
                </div>
              ) : images.length < MAX_PHOTOS ? (
                <WebcamCapture
                  images={images}
                  setImages={setImages}
                  maxPhotos={MAX_PHOTOS}
                  currentFilter={currentFilter} // Pass filter to WebcamCapture
                />
              ) : (
                <div className="bg-blue-800 bg-opacity-30 p-6 rounded-lg text-center">
                  <p className="text-xl font-medium mb-3">All photos taken!</p>
                  <p className="text-gray-300 mb-4">
                    You can download your photos or retake them.
                  </p>
                </div>
              )}
            </div>

            {/* Preview Section */}
            <div className="flex flex-col items-center">
              {images.length > 0 ? (
                <PhotoPreview
                  images={images}
                  onRetake={() => setImages([])}
                  template={template}
                />
              ) : (
                <div className="bg-gray-800 p-8 rounded-lg text-center max-w-md">
                  <p className="text-lg text-gray-300">
                    Your photos will appear here after you take them
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[...Array(MAX_PHOTOS)].map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square bg-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600"
                      >
                        <span className="text-gray-500 text-3xl">{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center mt-12 pt-6 border-t border-gray-700 text-gray-400 text-sm">
          <p className="flex items-center justify-center gap-2">
            <span>📸</span> Muhammad Daffa Malik Akram | React Photobooth App
            &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
