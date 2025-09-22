import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/forgot-password', { email });
      setMessage(res.data.message || 'Check your inbox for the reset link.');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>

        {message && <p className="mt-4 text-green-600 text-sm">{message}</p>}
        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
