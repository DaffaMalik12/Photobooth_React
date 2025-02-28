// TemplatePicker.jsx
import React from "react";

const templates = [
  { id: "Classic", icon: "📸" },
  { id: "Modern", icon: "🌈" },
  { id: "Vintage", icon: "🎞️" },
  { id: "Retro", icon: "🕹️" },
  { id: "Neon", icon: "✨" },
  { id: "Minimal", icon: "⬜" },
  { id: "Nature", icon: "🌿" },
  { id: "Tropical", icon: "🏝️" },
  { id: "Monochrome", icon: "◼️" },
  { id: "Polaroid", icon: "📷" },
];

const TemplatePicker = ({ onSelect, currentTemplate }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-md mb-6">
      <h3 className="text-lg font-medium text-gray-200 mb-3">
        Choose Template
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 text-sm sm:text-base 
              ${
                currentTemplate === template.id
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-gray-700 text-gray-200 hover:bg-gray-600"
              }
            `}
            onClick={() => onSelect(template.id)}
          >
            <span className="text-lg sm:text-xl">{template.icon}</span>
            <span>{template.id}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplatePicker;
