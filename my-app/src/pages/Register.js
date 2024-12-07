import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state to disable button while registering
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset previous errors
    setErrorMessage('');

    // Validate passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Validate that all fields are filled
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage('All fields are required.');
      return;
    }

    // Disable the submit button during the request
    setLoading(true);

    const data = { uname1: username, email: email, upswd1: password, upswd2: confirmPassword };

    try {
      const response = await fetch('http://localhost:8000/accounts/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // If registration is successful, redirect to login page
        navigate('/');
      } else {
        // Display the error message from the server
        setErrorMessage(result.message);
      }
    } catch (error) {
      // Handle network or other errors
      setErrorMessage('Something went wrong. Please try again later.');
    } finally {
      // Re-enable the submit button
      setLoading(false);
    }
  };

  return (
    <div className="box">
      
      <h1>Register Here</h1>
      <form onSubmit={handleSubmit}>
        <p>Username</p>
        <input
          type="text"
          name="uname1"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username"
          required
        />
        
        <p>Email</p>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          required
        />
        
        <p>Password</p>
        <input
          type="password"
          name="upswd1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          required
        />
        
        <p>Retype Password</p>
        <input
          type="password"
          name="upswd2"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-Enter Password"
          required
        />
        
        <input type="submit" value={loading ? 'Registering...' : 'Register'} disabled={loading} />
        <br />
        
        {errorMessage && <div className="error">{errorMessage}</div>}
        <br />
        
        <a href="/">Already have an account? Login</a>
      </form>
    </div>
  );
};

export default Register;
