import React, { useState } from 'react';
import { X } from 'lucide-react';
import grayAvatar from '../../assets/user-avatar.png';
import PublishFraudReportModal from './PublishFraudReportModal';

const ReportedNumberDetailsModal = ({ isOpen, onClose, report }) => {
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  if (!isOpen) return null; // Only render if isOpen is true

  const handlePublishClick = () => {
    setIsPublishModalOpen(true); // Open the Publish modal
  };

  const handleClosePublishModal = () => {
    setIsPublishModalOpen(false); // Close the Publish modal
  };

  return (
    <>
      {/* Reported Number Details Modal */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-40">
        <div className="bg-white w-11/12 md:w-1/3 rounded-lg p-6 relative">
          <X className="absolute top-4 right-4 cursor-pointer" onClick={onClose} /> 

          {/* Profile Section */}
          <div className="flex flex-col items-center mb-6">
            <img 
              src={report?.avatar || grayAvatar} 
              alt="avatar" 
              className="w-24 h-24 rounded-full mb-4" 
            />
            <h2 className="text-xl font-semibold text-center">{report?.name}</h2>
            <p className="text-center">{report?.network} - {report?.phone}</p>
            <p className="text-center text-sm text-gray-500">Date reported: {report?.date}</p>
            <p className="text-center text-sm text-gray-500">Votes: {report?.votes}</p>
          </div>

          {/* Comments Section */}
          <div className="comments mt-4">
            {/* Render user comments here */}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-between">
            <button className="bg-red-500 text-white py-2 px-4 rounded-md" onClick={onClose}>Decline</button>
            <button 
              className="bg-[#1D4ED8] text-white py-2 px-4 rounded-md" 
              onClick={handlePublishClick} // Open Publish modal on click
            >
              Publish
            </button>
          </div>
        </div>
      </div>

      {/* Publish Fraud Report Modal */}
      <PublishFraudReportModal 
        isOpen={isPublishModalOpen} 
        report={report} 
        onClose={handleClosePublishModal} 
      />
    </>
  );
};

export default ReportedNumberDetailsModal;
