import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    name: '', username: '', email: '', password: '', role: 'Customer'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/signup`,
        form,
        { withCredentials: true }
      );
      if (res.data.status) navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-8 rounded w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

        {['name', 'username', 'email', 'password'].map(field => (
          <div key={field} className="mb-4">
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              placeholder={field[0].toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
        ))}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Sign Up
        </button>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
