import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return alert('No token found. Please login.');
      }

      try {
        const res = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            'x-auth-token': token
          }
        });
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        alert('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User data not available.</p>;

  return (
    <div className="container">
      <h2>User Profile</h2>
      <p><strong>First Name:</strong> {user.FirstName}</p>
      <p><strong>Last Name:</strong> {user.LastName}</p>
      <p><strong>Email:</strong> {user.Email}</p>
    </div>
  );
};

export default Profile;
