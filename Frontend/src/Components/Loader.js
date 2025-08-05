import React from 'react';

const Loader = ({ text }) => (
  <div className="flex items-center justify-center space-x-3 my-4 p-4">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-gray-600 text-lg">{text}</p>
  </div>
);

export default Loader;