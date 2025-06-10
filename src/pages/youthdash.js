import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./style.css";

function Youth() {
  const [profile, setProfile] = useState({});
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [id, setId] = useState(1);
  const navigate = useNavigate();
  const dynamicHref = `http://localhost:3000/jobseeker/get-profile/resume/${id}`;

  useEffect(() => {
    fetchProfile(); 
    fetchJobs();
  }, []);

  const fetchProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      let jobseekerId = user?.jobSeekerId || 1;

      if (user != null) {
        setId(jobseekerId);
      } else {
        alert("Profile not found");
        return;
      }

      const response = await axios.get(`http://localhost:3000/jobseeker/get-profile/${jobseekerId}`);
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile(null);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/jobs');
      setJobs(res.data);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/applications/user/${id}`);
      setApplications(res.data);
    } catch (error) {
      console.error("Failed to fetch applications", error);
    }
  };

  const applyToJob = async (jobId) => {
    try {
      await axios.post('http://localhost:5000/api/applications/apply', {
        jobId,
        applicantId: id,
        coverLetter: 'I am very interested.',
        resumeLink: dynamicHref
      });
      alert('Application submitted!');
      fetchApplications(); // Refresh applications
    } catch (error) {
      console.error('Application failed', error);
    }
  };

  const bookmarkJob = async (jobId) => {
    try {
      await axios.post('http://localhost:5000/api/bookmarks', { jobId, jobSeekerId: id });
      setBookmarkedJobs([...bookmarkedJobs, jobId]);
      alert('Bookmarked!');
    } catch (error) {
      console.error('Bookmark failed', error);
    }
  };

  const removeProfile = async () => {
    try {
      await axios.delete(`http://localhost:3000/jobseeker/remove-profile/${id}`);
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
        <h1>Check the ID of the Applicant</h1>
      </div>
    );
  }

  return (
    <div className='jobseekerProfile'>
      <button className='edit-button' onClick={() => navigate('/jobseekerUpdateProfile')}>Edit</button>

      <h1 className='jobseekerProfile-header'>Applicant Profile</h1>
      <div className='jobseekerProfile-header-img-holder'>
        <img src="../img/client-2.jpg" alt="jobseeker Profile" className="profile-image" />
      </div>

      <div className='jobseekerProfile-profile-information'>
        <h2 className='jobseekerProfile-profile-section-header'>Personal Information</h2>
        <p><strong>Name:</strong> {profile?.firstName} {profile?.lastName}</p>
        <p><strong>Email:</strong> {profile?.email}</p>
        <p><strong>Years of Experience:</strong> {profile?.yearOfExperience}</p>
      </div>

      <div className='jobseekerProfile-profile-information'>
        <h2 className='jobseekerProfile-profile-section-header'>Skills</h2>
        <ul>
          {profile?.skills?.map((skill, index) => (
            <li key={index}>{skill.name}</li>
          ))}
        </ul>
      </div>

      <button className="removeProfile-button" onClick={removeProfile}>Remove Profile</button>

      {/* --- Job Listings Section --- */}
      <div className='job-list-section'>
        <h2>Available Jobs</h2>
        {jobs.length === 0 && <p>No jobs available</p>}
        <ul>
          {jobs.map((job) => (
            <li key={job.jobId} className='job-card'>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <button onClick={() => applyToJob(job.jobId)}>Apply</button>
              <button onClick={() => bookmarkJob(job.jobId)}>
                {bookmarkedJobs.includes(job.jobId) ? 'Bookmarked' : 'Bookmark'}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* --- My Applications Section --- */}
      <div className='applications-section'>
        <h2>My Applications</h2>
        {applications.length === 0 ? (
          <p>You haven't applied for any jobs yet.</p>
        ) : (
          <ul>
            {applications.map((app) => (
              <li key={app.applicationId} className='application-card'>
                <strong>Job:</strong> {app.jobTitle || 'Job ID ' + app.jobId} <br />
                <strong>Status:</strong> {app.status || 'Pending'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Youth;
