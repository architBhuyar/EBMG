import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import our custom hook

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useAuth(); // Get the login function from our context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5198/api/account/login', { email, password });
      // On success, call the login function from context with the response data
      login(response.data); // response.data is { token, email }
      setMessage('Login successful!');
    } catch (error) {
      setMessage('Login failed. Check your credentials.');
      console.error('Login error', error);
    }
  };

  return (
    <div className="card p-3 m-2" style={{maxWidth: '400px'}}>
      <h4>Login</h4>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input className="form-control mb-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button className="btn btn-success" type="submit">Login</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}