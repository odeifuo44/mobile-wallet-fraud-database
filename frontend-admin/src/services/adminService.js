import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL;

console.log('API URL:', API_URL);

export const changeAdminPassword = async (currentPassword, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/admin/password/change`, {
      currentPassword,
      newPassword
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response || error);
    throw error.response?.data || error.message;
  }
};

// You can add other admin-related API calls here
// For example:
// export const updateAdminProfile = async (data) => { ... }
// export const getAdminDetails = async () => { ... }