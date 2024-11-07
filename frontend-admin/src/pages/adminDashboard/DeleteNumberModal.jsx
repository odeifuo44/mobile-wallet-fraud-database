import React from 'react';
import { X } from 'lucide-react';
import grayAvatar from '../../assets/user-avatar.png';

const DeleteNumberModal = ({ isOpen, onClose, report, onDelete }) => {
  if (!isOpen) return null;  // Don't render the modal if not open

  return (
    <div 
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} // Close modal when clicking outside
    >
      <div 
        className="bg-white w-11/12 md:w-1/3 rounded-lg p-6 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <X 
          className="absolute top-4 right-4 cursor-pointer" 
          onClick={onClose} // Close the modal on clicking the 'X'
        />

        {/* Centering the avatar and profile section */}
        <div className="flex flex-col items-center mb-6">
          <img 
            src={report?.avatar || grayAvatar} 
            alt="avatar" 
            className="w-24 h-24 rounded-full mb-4" 
          />
          <p className="text-sm text-gray-500">Reported by:</p>
          <h2 className="text-xl font-semibold text-center">{report?.name}</h2>
          <p className="text-center">{report?.network} - {report?.phone}</p>
          <p className="text-center text-sm text-gray-500">Date reported: {report?.date}</p>
          <p className="text-center text-sm text-gray-500">Votes: {report?.votes}</p>
        </div>

        <div className="comments mt-4">
          {/* You can add more comments or info related to the report */}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <button 
            className="bg-red-500 text-white py-2 px-4 rounded-md" 
            onClick={() => onDelete(report)}  // Trigger the onDelete function passed as a prop
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteNumberModal;
