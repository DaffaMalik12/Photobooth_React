// FilterButtons.jsx
import React from "react";

const filters = [
  "none",
  "grayscale",
  "sepia",
  "invert",
  "brightness-150",
  "contrast-150",
  "blur-sm",
];

const FilterButtons = ({ currentFilter, setFilter }) => {
  return (
    <div className="mt-6 flex flex-wrap gap-2 justify-center">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition border-2 border-white ${
            currentFilter === f
              ? "bg-white text-black"
              : "bg-transparent text-white"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
