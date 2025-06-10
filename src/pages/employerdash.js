import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./style.css";

function EmployerDash() {
  const [profile, setProfile] = useState({});
  const [jobs, setJobs] = useState([]);
  const [id, setId] = useState(null);
  const navigate = useNavigate();


  const fetchProfile = async (employerId) => {
    try {
      const res = await axios.get(`http://localhost:3000/employer/get-profile/${employerId}`);
      setProfile(res.data);
    } catch (error) {
      console.error('Error fetching employer profile:', error);
      setProfile(null);
    }
  };

  const fetchJobs = async (employerId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/employer/${employerId}/jobs`);
      setJobs(res.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const viewApplications = (jobId) => {
    navigate(`/employer/job/${jobId}/applications`);
  };

  const removeProfile = async () => {
    try {
      await axios.delete(`http://localhost:3000/employer/remove-profile/${id}`);
      alert('Profile removed successfully');
      navigate('/signup');
    } catch (error) {
      console.error('Error removing profile:', error);
    }
  };

  if (profile == null) {
    return (
      <div>
        <h1>Please try reloading</h1>
        <h1>Check the ID of the Employer</h1>
      </div>
    );
  }

  return (
    <div className='employerProfile'>
      <button className='edit-button' onClick={() => navigate('/employerUpdateProfile')}>Edit</button>

      <h1 className='employerProfile-header'>Employer Profile</h1>
      <div className='employerProfile-header-img-holder'>
        <img src="../img/client-3.jpg" alt="Employer Profile" className="profile-image" />
      </div>

      <div className='employerProfile-profile-information'>
        <h2 className='employerProfile-profile-section-header'>Company Information</h2>
        <p><strong>Name:</strong> {profile?.companyName}</p>
        <p><strong>Email:</strong> {profile?.email}</p>
        <p><strong>Industry:</strong> {profile?.industry}</p>
      </div>

      <button className="removeProfile-button" onClick={removeProfile}>Remove Profile</button>

      {/* --- Posted Jobs Section --- */}
      <div className='job-list-section'>
        <h2>Jobs You Posted</h2>
        {jobs.length === 0 && <p>No jobs posted yet.</p>}
        <ul>
          {jobs.map((job) => (
            <li key={job.jobId} className='job-card'>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Posted:</strong> {new Date(job.created_at).toLocaleDateString()}</p>
              <button onClick={() => viewApplications(job.jobId)}>View Applications
                </button>
            </li>
          ))}
        </ul>
        </div>
    </div>
  );
}
export default EmployerDash;