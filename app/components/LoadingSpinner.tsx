import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-400 border-solid border-t-transparent rounded-full animate-spin"></div>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-blue-500">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
