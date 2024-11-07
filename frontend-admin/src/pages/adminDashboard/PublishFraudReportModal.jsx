import React from 'react';
import { X } from 'lucide-react'; 
import grayAvatar from '../../assets/user-avatar.png'; 

const PublishFraudReportModal = ({ report, isOpen, onClose }) => {
  if (!isOpen) return null; // Only render if isOpen is true

  // Safeguard to ensure report exists and has an avatar
  const avatarSrc = report?.avatar || grayAvatar;

  // Check if report exists before rendering modal content
  if (!report) {
    return <div>No report data available</div>; // Optional fallback UI if report is missing
  }

  const handlePublishClick = () => {
    console.log(`Fraud report for ${report.name} published`);
    onClose(); // Close the modal after publishing
  };

  const handleDeclineClick = () => {
    console.log(`Fraud report for ${report.name} declined`);
    onClose(); // Close the modal after declining
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-11/12 md:w-1/3 rounded-lg p-6 relative">
        <X className="absolute top-4 right-4 cursor-pointer" onClick={onClose} />
        
        {/* Centered avatar and profile details */}
        <div className="flex flex-col items-center mb-4">
          <img src={avatarSrc} alt="avatar" className="w-16 h-16 rounded-full mb-2" />
          <h2 className="text-xl font-semibold">{report.name || 'No Name Available'}</h2>
          <p className="text-sm text-gray-600">{report.email || 'No Email Available'}</p>
          <p className="text-sm text-gray-600">{report.phone || 'No Contact Available'}</p>
        </div>

        {/* Display the date reported */}
        <p className="text-sm text-gray-600">Date reported: {report.date || 'No Date Available'}</p>

        {/* Evidence Attachments Section */}
        {report.attachments && report.attachments.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Evidence</h3>
            <ul className="list-disc pl-6 mt-2">
              {report.attachments.map((file, index) => (
                <li key={index}>
                  <a href={file.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                    {file.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Render user comments and evidence */}
        <div className="comments mt-4">
          <h3 className="text-lg font-semibold">User Comments:</h3>
          <p>{report.comments || 'No comments available'}</p>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex justify-between">
          <button className="bg-white hover:bg-red-500 hover:text-white border-red-500 text-red-700 py-2 px-4 rounded-md hover" onClick={handleDeclineClick}>Decline</button>
          <button className="bg-[#1D4ED8] text-white py-2 px-4 rounded-md" onClick={handlePublishClick}>Publish fraud report</button>
        </div>
      </div>
    </div>
  );
};

export default PublishFraudReportModal;
