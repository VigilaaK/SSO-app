import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
        const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'
       },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok && data.token) {
        localStorage.setItem('jwtToken', data.token);
        console.log(data.token)
        console.log('Token stored in localStorage');
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const getToken=()=>{
    let token=localStorage.getItem("jwttoken")
    console.log(token)
  }
  
  return (
    <div className='login-page'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
