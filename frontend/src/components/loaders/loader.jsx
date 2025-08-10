import React from 'react';

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-48">
      <div 
        className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-600"
        style={{ animation: "spin 2s linear infinite" }}
      ></div>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
