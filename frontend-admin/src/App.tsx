// import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from "./components/AdminLogin";
import AdminResetPassword from "./components/AdminResetPassword";
import AdminRecoverPassword from "./components/AdminRecoverPassword";
import AdminNav from './components/adminNav'
import UserDetails from "./pages/userdetails"
import Users from "./components/Users"
import MyAccount from "./pages/adminDashboard/MyAccount"
import AdminList from "../../frontend-admin/src/pages/adminDashboard/AdminList"
import NewAdminModal from "../src/pages/adminDashboard/NewAdminModal"
import ConfigPage from './pages/adminDashboard/ConfigPage' 




function App() {
  return (
    <Router>
      <Routes>

       
        {/* <Route path="/admin-login" element={<AdminLogin />} /> */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin-reset-password" element={<AdminResetPassword />} />
        <Route path="/admin-recover-password" element={<AdminRecoverPassword />} />
        <Route path="/reported" element={<AdminNav />} />
        <Route path="/users" element={<UserDetails />} />
        <Route path="/user" element={<Users />} />
        <Route path='/my-account' element={<MyAccount />} />
        <Route path="/user" element={<Users />} />
        <Route path='/admin-list' element={<AdminList />} />
        <Route path='/new-admin-modal' element={<NewAdminModal />} />
        <Route path='/config' element={<ConfigPage />} />






      </Routes>
    </Router>
  );
}

export default App;