import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
  lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return alert('Passwords do not match');
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
  firstName: form.firstName,
  lastName: form.lastName,
  email: form.email,
  password: form.password,
  role: form.role,
});
      alert(res.data.message || "Registration successful!");
      navigate('/login'); // 👈 Redirect after success
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <section className="login-wrapper">
        <div className="container">
          <div className="col-md-6 col-sm-8 col-md-offset-3 col-sm-offset-2">
            <form onSubmit={handleSubmit}>
              <img className="img-responsive" alt="logo" src="img/logo.png" />
              <input
       type="text"
  className="form-control input-lg"
  name="firstName"
  placeholder="First Name"
  value={form.firstName}
  onChange={handleChange}
  required
/>
<input
  type="text"
  className="form-control input-lg"
  name="lastName"
  placeholder="Last Name"
  value={form.lastName}
  onChange={handleChange}
  required
/>
              <input
                type="email"
                className="form-control input-lg"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                className="form-control input-lg"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                className="form-control input-lg"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="form-control input-lg"
                name="role"
                placeholder="Role (employer/employee)"
                value={form.role}
                onChange={handleChange}
                required
              />
              <label><a href="/recovery">Forget Password?</a></label>
              <button type="submit" className="btn btn-primary">Create Account</button>
              <p>Already have an account? <a href="/login">Log In</a></p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
// Note: Ensure that the backend API endpoint matches the one used in the axios request.