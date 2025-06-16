import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/login`,
        form,
        { withCredentials: true }
      );
      if (res.data.success) navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-8 rounded w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        {['email', 'password'].map(field => (
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

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Login
        </button>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
