import React from 'react';
import Navbar from '../../components/navbar';
import { useState } from 'react'
import { DatabaseIcon, HomeIcon, ClipboardListIcon, ChevronDown, CalendarIcon } from 'lucide-react';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';  
import { changeAdminPassword } from '../../services/adminService';

// Importing the content components for the different tabs
import UsersContent from '../adminDashboard/usersContent';
import ReportedNumbersContent from '../adminDashboard/reportedNumbers';
import RequestsContent from '../adminDashboard/requestContents';
// import OverviewContent from '../adminDashboard/adminOverview';

const MyAccount = () => {
    const [activeTab, setActiveTab] = useState('Overview');
    const [timeFilter, setTimeFilter] = useState('All time');
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: ''
    });
    const [passwordStatus, setPasswordStatus] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
  
    // Function to handle tab click and update the active tab state
    const handleTabClick = (tabName) => {
      setActiveTab(tabName);
    };

    // Add password change handler
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            await changeAdminPassword(
                passwordData.currentPassword,
                passwordData.newPassword
            );
            
            setPasswordStatus({
                type: 'success',
                message: 'Password successfully updated'
            });
            
            // Clear form
            setPasswordData({
                currentPassword: '',
                newPassword: ''
            });
        } catch (error) {
            setPasswordStatus({
                type: 'error',
                message: error.message || 'Failed to update password'
            });
        } finally {
            setIsLoading(false);
        }
    };

  return (
  <div>
    <Navbar />
    <div>
      <div className="px-4">
        {/* Rendering the navigation bar */}
        <div className="flex justify-between items-center p-1">
          <div className="flex space-x-6">
            {/* Rendering the nav items */}
            <NavItem
              icon={<HomeIcon size={18} />}
              text="Overview"
              active={activeTab === 'Overview'}
              onClick={() => handleTabClick('Overview')}
            />
            <NavItem
              icon={<DatabaseIcon size={18} />}
              text="Reported numbers"
              active={activeTab === 'Reported numbers'}
              onClick={() => handleTabClick('Reported numbers')}
            />
            <NavItem
              icon={<UserGroupIcon className='w-[28px] h-[20px]' />}
              text="Users"
              active={activeTab === 'Users'}
              onClick={() => handleTabClick('Users')}
            />
            <NavItem
              icon={<ClipboardListIcon size={18} />}
              text="Requests"
              active={activeTab === 'Requests'}
              onClick={() => handleTabClick('Requests')}
            />
          </div>
          <div className="flex items-center space-x-4">
            {/* Rendering the notification badge */}
            <span className="bg-red-100 px-2 py-2 rounded text-red-500 text-sm">
              New fraudulent number request - <a href="#" className="text-red-500 hover:underline font-bold">View</a>
            </span>
            <div className="relative ">
              {/* Rendering the time filter dropdown */}
              <div className="pointer-events-none absolute  inset-y-0 left-0 flex items-center px-2 text-gray-700 ">
                <CalendarIcon className="w-4 h-4 text-gray-500 mr-2" />
              </div>
              <select
                className="bg-white appearance-none border-gray-600 rounded pl-8 py-2 text-sm"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option>All time</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 6 months</option>
                <option>Last year</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rendering the content based on the active tab */}
      <div>
        {/* {activeTab === 'Overview' && <OverviewContent />} */}
        {activeTab === 'Reported numbers' && <ReportedNumbersContent />}
        {activeTab === 'Users' && <UsersContent />}
        {activeTab === 'Requests' && <RequestsContent />}
      </div>
    </div>
    <div className="p-8 bg-gray-100">
        {/* Header with Back Arrow */}
        <div className="flex items-center mb-4">
          <Link to="/reported" className="text-gray-600 hover:text-blue-600 mr-2">
            <ArrowLeft size={20} />
          </Link>
          <h2 className="text-2xl font-bold">My account</h2>
        </div>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Personal Info Section */}
        <div>
          <label className="block font-medium">First name</label>
          <input type="text" defaultValue="Isaac" className="border rounded p-2 w-full mb-4" />

          <label className="block font-medium">Last name</label>
          <input type="text" defaultValue="Osei" className="border rounded p-2 w-full mb-4" />

          <label className="block font-medium">Email address</label>
          <input type="email" defaultValue="isaac@gmail.com" className="border rounded p-2 w-full mb-4" />

          <label className="block font-medium">Phone number</label>
          <input type="tel" defaultValue="09058794813" className="border rounded p-2 w-full mb-4" />

          <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2">Update details</button>
        </div>

        {/* Password Update Section */}
        <div>
          {passwordStatus.message && (
            <div className={`p-4 mb-4 rounded ${
              passwordStatus.type === 'success' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {passwordStatus.message}
            </div>
          )}

          <form onSubmit={handlePasswordChange}>
            <label className="block font-medium">Old password</label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({
                ...passwordData,
                currentPassword: e.target.value
              })}
              className="border rounded p-2 w-full mb-4"
              required
            />

            <label className="block font-medium">New password</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({
                ...passwordData,
                newPassword: e.target.value
              })}
              className="border rounded p-2 w-full mb-4"
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`bg-blue-600 text-white px-4 py-2 rounded mt-2 w-full
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              {isLoading ? 'Updating...' : 'Change password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

// Component for rendering a single nav item
const NavItem = ({ icon, text, active, onClick }) => (
    <div
      className={`flex items-center space-x-1 cursor-pointer relative ${active ? 'text-blue-600' : 'text-gray-600'}`}
      onClick={onClick}
    >
      {icon}
      <span className="text-sm">{text}</span>
      {active && <div className="absolute bottom-[-9px] left-0 w-full h-0.5 bg-blue-600"></div>}
    </div>
  );

export default MyAccount;
