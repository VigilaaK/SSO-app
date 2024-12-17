import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false); 
  const navigate = useNavigate();

  const handleRequestOtp = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/reset-password-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }), 
    });

    const data = await response.json();
    if (response.ok) {
      alert('OTP sent to your email!');
      setIsOtpSent(true);
    } else {
      alert(data.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword }), 
    });

    const data = await response.json();
    if (response.ok) {
      alert('Password reset successful!');
      navigate('/login');
    } else {
      alert(data.message);  
    }
  };
// const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!email || !otp || !newPassword) {
//       alert('All fields are required!');
//       return;
//     }
  
//     try {
//       const response = await fetch('http://localhost:5000/api/reset-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, otp, newPassword }),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         alert('Password reset successful!');
//         navigate('/login');
//       } else {
//         console.error('Server Error:', data); 
//         alert(data.message || 'Failed to reset password. Please try again.');
//       }
//     } catch (error) {
//       console.error('Request Error:', error);
//       alert('An unexpected error occurred.');
//     }
//   };
  

  return (
    <div className='reset-password-page'>
      <h2>Reset Password</h2>
      {!isOtpSent && (
        <form onSubmit={handleRequestOtp}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Send OTP</button>
        </form>
      )}

      {isOtpSent && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
