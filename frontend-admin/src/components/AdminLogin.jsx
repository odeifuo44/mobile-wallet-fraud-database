import React, { useState } from "react";
import TextInput from "./TextInput";
import { EyeOff, Eye } from "lucide-react";
import axios from 'axios'; 

const AdminLogin = () => {
 
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  // Function to handle password recovery
  const handlePasswordRecovery = async () => {
    setLoading(true); 
    setStatus({ type: '', message: '' }); 

    try {
      // Send POST request to the password recovery API
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/password/recover`, {
        email 
      });

      // Set success status message
      setStatus({
        type: 'success',
        message: response.data.message || 'Password recovery instructions sent to your email.'
      });
    } catch (error) {
      // Set error status message if the request fails
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to send recovery instructions.'
      });
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <form>
        <p className="text-center text-2xl font-bold mb-8">
          <span className="text-blue-500 mr-4">
            {" "}
            Mobile Wallet Fraud Database
          </span>{" "}
          Admin
        </p>

        <div className=" flex border-2 mt-4 ">
          <div className="p-6 mx-4">
            <h3 className="my-1 font-bold">Login</h3>
            <TextInput label="Email address" type="text" name="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextInput label="Password" type="password" name="password" />

            <div className="flex items-center justify-between">
              <div className="flex items-center ">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    name="remember-me"
                    className="mr-2"
                  />
                  <label
                    htmlFor="remember-me"
                    className="text-sm font-medium text-gray-700 mr-40"
                  >
                    Remember me
                  </label>
                  <a
                    href="#"
                    className="text-blue-400 justify-items-end flex"
                    onClick={handlePasswordRecovery} // Link to password recovery
                  >
                    Lost Password?
                  </a>
                </div>
              </div>
            </div>
            <button
              variant="solid"
              type="submit"
              className="mt-4 py-3 px-8 w-96 bg-blue-600 text-white rounded-md "
            >
              Login
            </button>

            {status.message && (
              <div className={`mt-4 p-2 rounded ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {status.message} {/* Display success or error message */}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
