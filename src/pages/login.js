import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', form);

    // ✅ Store both token and role
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('role', res.data.role); // 👈 Add this line

    // ✅ Redirect based on role
    if (res.data.role === 'applicant') {
      navigate('/youthdash');
    } else if (res.data.role === 'employer') {
      navigate('/employerdash');
    } else if (res.data.role === 'admin') {
      navigate('/admin');
    } else {
      alert('Unknown role');
    }

  } catch (err) {
    alert(err.response?.data?.message || 'Login failed');
  }
};
  return (
    <div>
      <section className="login-wrapper">
        <div className="container">
          <div className="col-md-6 col-sm-8 col-md-offset-3 col-sm-offset-2">
            <form onSubmit={handleSubmit}>
              
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="form-control input-lg"
                placeholder="Email"
                value={form.email}
              />
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="form-control input-lg"
                placeholder="Password"
                value={form.password}
              />
              <label><a href="/recovery">Forget Password?</a></label>
              <button type="submit" className="btn btn-primary">Login</button>
              <p>Don't have an Account? <a href="/register">Create An Account</a></p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
