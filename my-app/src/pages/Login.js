import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Track if user is on Forgot Password form
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Login
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const data = { uname: username, upswd: password };

    try {
      const response = await fetch('http://localhost:8000/accounts/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const result = await response.json();

      if (result.token) {
        localStorage.setItem('token', result.token);
        navigate('/home'); // Navigate after successful login
      } else {
        setErrorMessage(result.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred while trying to log in');
    } finally {
      setLoading(false);
    }
  };

  // Handle Forgot Password
  const handleForgotPasswordSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:8000/accounts/forgot-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Password reset instructions sent to your email.');
        setIsForgotPassword(false); // Switch back to Login form
      } else {
        setErrorMessage(result.message || 'Failed to send reset instructions');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setErrorMessage('An error occurred while trying to reset your password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="box">
      <h1>{isForgotPassword ? 'Forgot Password' : 'Login Here'}</h1>

      {/* Forgot Password Form */}
      {isForgotPassword ? (
        <form onSubmit={handleForgotPasswordSubmit}>
          <p>Email</p>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Instructions'}
          </button>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </form>
      ) : (
        // Login Form
        <form onSubmit={handleLoginSubmit}>
          <p>Username</p>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
            required
          />
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
          />
          
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {errorMessage && <p className="error">{errorMessage}</p>}
                    <a href="/register">Register for a new account?</a>

        </form>
      )}

      {/* Link to toggle between login and forgot password */}
      {!isForgotPassword ? (
        <p onClick={() => setIsForgotPassword(true)} style={{ cursor: 'pointer', color: 'blue' }}>
          Forgot Password?
        </p>
      ) : (
        <p onClick={() => setIsForgotPassword(false)} style={{ cursor: 'pointer', color: 'blue' }}>
          Back to Login
        </p>
      )}
    </div>
  );
};

export default Login;
