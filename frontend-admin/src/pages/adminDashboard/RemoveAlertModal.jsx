import React from 'react';
import { X } from 'lucide-react';

const RemoveAlertModal = ({ isOpen, report, onClose }) => {

  if (!isOpen) return null;

  // If there's no report, you can show a fallback message
  if (!report) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
          <X className="absolute top-4 right-4 cursor-pointer" onClick={onClose} />
          <h2 className="text-lg font-semibold">No report selected</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <X className="absolute top-4 right-4 cursor-pointer" onClick={onClose} />
        <h2 className="text-xl font-semibold">{report?.name}</h2>
        <p>{report?.comment}</p>
        <div className="mt-4">
          <button className="bg-red-500 text-white py-2 px-4 rounded-md">Delete record</button>
        </div>
      </div>
    </div>
  );
};

export default RemoveAlertModal;
