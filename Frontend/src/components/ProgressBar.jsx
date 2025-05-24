import React from "react";

export default function ProgressBar({ progressPercentage }) {
  return (
    <div
      className="relative w-full h-6 bg-gray-300 rounded-full overflow-hidden"
      aria-label="Video Watch Progress">
      <div
        className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500"
        style={{ width: `${progressPercentage}%` }}
        aria-valuenow={progressPercentage}
        aria-valuemin="0"
        aria-valuemax="100"
      />
      <span className="absolute right-2 top-0 bottom-0 flex items-center font-semibold text-white select-none">
        {progressPercentage.toFixed(1)}%
      </span>
    </div>
  );
}
