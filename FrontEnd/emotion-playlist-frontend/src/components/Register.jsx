import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5198/api/account/register', { username, email, password });
      setMessage('Registration successful! Please log in.');
    } catch (error) {
      setMessage('Registration failed. Please try again.');
      console.error('Registration error', error.response.data);
    }
  };

  return (
    <div className="card p-3 m-2" style={{maxWidth: '400px'}}>
      <h4>Register</h4>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input className="form-control mb-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input className="form-control mb-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button className="btn btn-primary" type="submit">Register</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}