import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import ReportedNumberDetailsModal from './ReportedNumberDetailsModal';  
import RemoveAlertModal from './RemoveAlertModal';  
import PublishFraudReportModal from './PublishFraudReportModal';  
import DeleteNumberModal from './DeleteNumberModal';  
import RemovedReportModal from './RemovedReportModal'; // Import RemovedReportModal

const ReportedNumbersContent = () => {
  const data = [
    { name: "Odoh Craig", phone: "09059784163", network: "MTN", date: "April 15 2023", status: "Pending", comment: "Duped Someone of GHS12000, Sent......." },
    { name: "Odoh Craig", phone: "09059784163", network: "MTN", date: "April 15 2023", status: "Pending", comment: "Duped Someone of GHS12000, Sent......." },
    { name: "Odoh Craig", phone: "09059784163", network: "MTN", date: "April 15 2023", status: "Pending", comment: "Duped Someone of GHS12000, Sent......." },
  ];

  const [selectedReport, setSelectedReport] = useState(null);
  const [isReportedNumberDetailsModalOpen, setIsReportedNumberDetailsModalOpen] = useState(false);
  const [isRemoveAlertModalOpen, setIsRemoveAlertModalOpen] = useState(false);
  const [isPublishFraudReportModalOpen, setIsPublishFraudReportModalOpen] = useState(false);
  const [isDeleteNumberModalOpen, setIsDeleteNumberModalOpen] = useState(false);
  const [isRemovedReportModalOpen, setIsRemovedReportModalOpen] = useState(false); // State for RemovedReportModal
  const [checkedRows, setCheckedRows] = useState({}); // Track checked rows

  const handleReportClick = (report) => {
    setSelectedReport(report);
    setIsReportedNumberDetailsModalOpen(true);
  };

  const handleRemoveClick = (report) => {
    setSelectedReport(report);
    setIsDeleteNumberModalOpen(true);
  };

  const handlePublishClick = () => {
    setIsPublishFraudReportModalOpen(true);
  };

  const handleDelete = () => {
    // Close the delete modal and open the RemovedReportModal
    setIsDeleteNumberModalOpen(false);
    setIsRemovedReportModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedReport(null);
    setIsReportedNumberDetailsModalOpen(false);
    setIsRemoveAlertModalOpen(false);
    setIsPublishFraudReportModalOpen(false);
    setIsDeleteNumberModalOpen(false);
    setIsRemovedReportModalOpen(false); // Close RemovedReportModal
  };

  const handleCheckboxChange = (index) => {
    setCheckedRows(prev => ({
      ...prev,
      [index]: !prev[index], // Toggle checkbox state
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-4">
                <input 
                  type="checkbox" 
                  onChange={() => {}} // Handle select/deselect all if needed
                />
              </th>
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Network</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b last:border-none hover:bg-gray-50">
                <td className="p-4">
                  <input 
                    type="checkbox" 
                    checked={checkedRows[index] || false} 
                    onChange={() => handleCheckboxChange(index)} 
                  />
                </td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.phone}</td>
                <td className="p-4">{item.network}</td>
                <td className="p-4">{item.date}</td>
                <td className="p-4 flex space-x-4">
                  <button 
                    onClick={() => handleReportClick(item)} 
                    className="text-blue-500 hover:underline"
                  >
                    Details
                  </button>
                  <button 
                    onClick={() => handleRemoveClick(item)} 
                    className="text-red-500 hover:underline"
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <ReportedNumberDetailsModal 
        isOpen={isReportedNumberDetailsModalOpen} 
        onClose={handleCloseModal} 
        report={selectedReport} 
        onPublish={handlePublishClick}
      />
      <PublishFraudReportModal 
        isOpen={isPublishFraudReportModalOpen} 
        onClose={handleCloseModal} 
      />
      <RemoveAlertModal 
        isOpen={isRemoveAlertModalOpen} 
        onClose={handleCloseModal} 
      />
      <DeleteNumberModal 
        isOpen={isDeleteNumberModalOpen} 
        onClose={handleCloseModal} 
        onConfirm={handleDelete} // Trigger handleDelete when the user confirms deletion
      />
      {isRemovedReportModalOpen && (
        <RemovedReportModal
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ReportedNumbersContent;
