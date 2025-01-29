import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/register', { username, password });
      setSuccessMessage(response.data.message);
      setUsername('');
      setPassword('');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Registration failed. Please try again later.');
      }
    }
    setIsLoading(false);
  };

  return (
    <div className='container'>
      <h2>Register</h2>
      {isLoading && <p>Loading...</p>}
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <button type="submit" disabled={isLoading}>Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;
