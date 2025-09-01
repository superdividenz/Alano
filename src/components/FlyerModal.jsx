import React, { useRef } from "react";

const FlyerModal = ({ pdfUrl, handleClose }) => {
  const modalRef = useRef();

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-3xl p-4 shadow-lg relative"
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          ×
        </button>
        <iframe
          src={pdfUrl}
          title="Flyer"
          className="w-full h-[80vh] rounded"
        />
      </div>
    </div>
  );
};

export default FlyerModal;
