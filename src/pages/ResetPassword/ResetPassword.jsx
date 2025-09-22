import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/reset-password/${token}`, { password });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Reset Password
        </button>
        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
