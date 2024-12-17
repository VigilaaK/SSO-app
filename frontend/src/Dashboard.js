import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleResetPassword = () => {
    navigate('/reset-password'); 
  };
  const handleLogoutButton=()=>{
    navigate('/')
  }
  return (
    <div className='dashboard'>
      <h2>Dashboard</h2>
      <button onClick={handleResetPassword}>Reset Password</button>
      <button onClick={handleLogoutButton}>Log Out</button>
    </div>
  );
};

export default Dashboard;
