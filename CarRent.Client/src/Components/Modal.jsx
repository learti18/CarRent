import React from 'react';

const Modal = ({ title, content, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="mb-4">{content}</div>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;