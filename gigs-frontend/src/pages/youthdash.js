import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

// Card to display individual application data and employer contact if accepted
const ApplicationCard = ({ app }) => {
  const [contact, setContact] = useState(null);
  const [showContact, setShowContact] = useState(false);

  // Fetch employer contact for accepted applications
  const fetchContact = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/applications/${app.applicationId}/employer-contact`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setContact(res.data);
      setShowContact(true);
    } catch (err) {
      console.error("Failed to fetch contact info", err);
    }
  };

  // Format status badge based on status
  const getStatusBadge = (status) => {
    const statusMap = {
      pending: "bg-yellow-100 text-yellow-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      interview: "bg-green-100 text-green-800",
      "in review": "bg-blue-100 text-blue-800",
    };
    return statusMap[status?.toLowerCase()] || "bg-blue-100 text-blue-800";
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div className="flex space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-blue-600">
              business
            </span>
          </div>
          <div>
            <h3 className="font-medium text-lg text-gray-900">
              {app.title}
            </h3>
            <div className="flex items-center space-x-3 mt-2">
              <div className="flex items-center text-gray-500 text-sm">
                <span className="material-symbols-outlined text-xs mr-1">
                  location_on
                </span>
                {app.location}
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <span className="material-symbols-outlined text-xs mr-1">
                  payments
                </span>
                {app.salary || "Salary not specified"}
              </div>
            </div>
          </div>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(app.status)}`}>
          {app.status}
        </span>
        {app.status === "rejected" && app.reviewComment && (
  <div className="mt-2 text-sm text-red-600">
    <strong>Rejection Reason:</strong> {app.reviewComment}
  </div>
)}

      </div>
      
      {/* Show contact details only for accepted applications */}
      {app.status === "accepted" && (
        <div className="mt-4">
          {!showContact ? (
            <button
              onClick={fetchContact}
              className="px-4 py-2 bg-green-600 text-black rounded hover:bg-green-700 transition-colors"
            >
              View Employer Contact Details
            </button>
          ) : contact ? (
            <div className="mt-2 p-4 bg-green-50 border border-green-200 rounded">
              <p className="text-gray-700"><strong>Name:</strong> {contact.firstName}</p>
              <p className="text-gray-700"><strong>Email:</strong> {contact.email}</p>
              <p className="text-gray-700"><strong>Phone:</strong> {contact.phone}</p>
              <p className="text-gray-700"><strong>Location:</strong> {contact.location}</p>
            </div>
          ) : (
            <p className="text-red-600">Unable to load contact info.</p>
          )}
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Applied on {new Date(app.appliedAt).toLocaleDateString()}
        </p>
        <div className="flex space-x-2">
          <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200">
            <span className="material-symbols-outlined">visibility</span>
          </button>
          <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200">
            <span className="material-symbols-outlined">edit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const YouthDash = () => {
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [stats, setStats] = useState({ applications: 0, bookmarks: 0 });
  const [ratings, setRatings] = useState([]);
  const [applicationFilter, setApplicationFilter] = useState("All");

  const navigate = useNavigate();
  const fetchRatings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ratings/applicant", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRatings(res.data);
    } catch (err) {
      console.error("Failed to fetch ratings", err);
    }
  };

  // Unbookmark a job and update state
  const unbookmarkJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/bookmarks/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookmarkedJobs((prev) => prev.filter((job) => job.jobId !== jobId));
    } catch (err) {
      console.error("Failed to unbookmark job", err);
    }
  };

  // Fetch applications submitted by the user
  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/applications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setApplications(res.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  // Fetch user profile details
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  // Fetch all bookmarked jobs
  const fetchBookmarks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/bookmarks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookmarkedJobs(res.data);
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
    }
  };

  // Fetch quick stats (applications and bookmarks count)
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/stats/applicants", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(res.data);
    } catch (err) {
      console.error("Failed to fetch stats", err);
    }
  };

  // Calculate average rating
  const calculateAverageRating = () => {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((sum, rating) => sum + rating.score, 0);
    return (total / ratings.length).toFixed(1);
  };

  // Fetch all required data on initial render
  useEffect(() => {
    fetchStats();
    fetchBookmarks();
    fetchApplications();
    fetchProfile();
    fetchRatings();
  }, []);

  return (
    <div id="webcrumbs">
      <div className="w-full min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Applicant Dashboard</h1>
            <p className="text-gray-600">Manage your applications, bookmarks, and profile</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mb-4 border-4 border-primary-200">
                    <span className="text-primary-600 text-2xl font-bold">
                      {profile ? `${profile.firstName[0]}${profile.lastName[0]}` : "JD"}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {profile ? `${profile.firstName} ${profile.lastName}` : "Loading..."}
                  </h2>
                  <div className="flex items-center text-gray-500 mt-1">
                    <span className="material-symbols-outlined text-sm mr-1">location_on</span>
                    <span className="text-sm">{profile?.location || "Location not set"}</span>
                  </div>
                  <p className="text-gray-600 mt-1">{profile?.email || "Email not available"}</p>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-4">
                  <h3 className="font-medium text-gray-900 mb-2">Bio</h3>
                  <p className="text-gray-600 text-sm">
                    {profile?.bio || "Passionate professional looking for new opportunities."}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-4">
                  <h3 className="font-medium text-gray-900 mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile?.skills ? (
                      profile.skills.split(',').map((skill, index) => (
                        <span key={index} className="bg-primary-50 text-primary-700 text-xs px-3 py-1 rounded-full">
                          {skill.trim()}
                        </span>
                      ))
                    ) : (
                      <>
                        <span className="bg-primary-50 text-primary-700 text-xs px-3 py-1 rounded-full">
                          JavaScript
                        </span>
                        <span className="bg-primary-50 text-primary-700 text-xs px-3 py-1 rounded-full">
                          React
                        </span>
                        <span className="bg-primary-50 text-primary-700 text-xs px-3 py-1 rounded-full">
                          Node.js
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <button  onClick={() => window.location.href = "/settings" } className="w-full mt-6 flex items-center justify-center bg-primary-50 text-primary-600 font-medium py-2 px-4 rounded-lg hover:bg-primary-100 transition-colors duration-200">
                  <span className="material-symbols-outlined mr-2">edit</span>
                  Edit Profile
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-full mr-3">
                        <span className="material-symbols-outlined text-blue-600">
                          description
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Applications</p>
                        <p className="text-lg font-bold text-gray-900">{stats.applications}</p>
                      </div>
                    </div>
                    <span className="text-sm text-blue-600">
                      {applications.filter(app => app.status === 'pending').length} active
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-full mr-3">
                        <span className="material-symbols-outlined text-purple-600">
                          bookmark
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Bookmarks</p>
                        <p className="text-lg font-bold text-gray-900">{stats.bookmarks}</p>
                      </div>
                    </div>
                    <span className="text-sm text-purple-600">
                      {bookmarkedJobs.length} saved
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-full mr-3">
                        <span className="material-symbols-outlined text-green-600">
                          thumb_up
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Rating</p>
                        <p className="text-lg font-bold text-gray-900">{calculateAverageRating()}/5</p>
                      </div>
                    </div>
                    <span className="text-sm text-green-600">
                      {ratings.length > 0 ? "Rated" : "Not rated"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">My Applications</h2>
                  <div className="flex space-x-2">
                    <select
  value={applicationFilter}
  onChange={(e) => setApplicationFilter(e.target.value)}
  className="text-sm border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
>
  <option value="All">All Applications</option>
  <option value="pending">Active</option>
  <option value="rejected">Rejected</option>
  <option value="accepted">Accepted</option>
</select>

                    <button onClick={() => window.location.href = "/jobs"} className="bg-primary-500 text-white rounded-lg px-4 py-2 hover:bg-primary-600 transition-colors duration-200 flex items-center">
                      <span className="material-symbols-outlined mr-1">add</span>
                      New
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {applications.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">You haven't applied for any jobs yet.</p>
                  ) : (
                   applications
  .filter((app) =>
    applicationFilter === "All" ? true : app.status.toLowerCase() === applicationFilter.toLowerCase()
  )
  .map((app) => (
    <ApplicationCard key={app.applicationId} app={app} />
  ))

                  )}
                </div>

                <div className="mt-6 flex justify-center">
                  <button className="text-primary-600 font-medium hover:text-primary-700 transition-colors duration-200 flex items-center">
                    <span>View All Applications</span>
                    <span className="material-symbols-outlined ml-1">arrow_forward</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">My Bookmarks</h2>
                  <div className="flex space-x-2">
                    <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option>All Categories</option>
                      <option>Tech</option>
                      <option>Design</option>
                      <option>Management</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookmarkedJobs.length === 0 ? (
                    <div className="col-span-2 text-center py-8">
                      <p className="text-gray-500">You haven't bookmarked any jobs yet.</p>
                    </div>
                  ) : (
                    bookmarkedJobs.map((job) => (
                      <div key={job.jobId} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                        <div className="flex justify-between mb-3">
                          <h3 className="font-medium text-gray-900">{job.title}</h3>
                          <button 
                            onClick={() => unbookmarkJob(job.jobId)}
                            className="text-purple-600 hover:text-purple-700"
                          >
                            <span className="material-symbols-outlined">bookmark</span>
                          </button>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{job.company || "Company Name"}</p>
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="flex items-center text-gray-500 text-sm">
                            <span className="material-symbols-outlined text-xs mr-1">
                              location_on
                            </span>
                            {job.location}
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <span className="material-symbols-outlined text-xs mr-1">schedule</span>
                            Full-time
                          </div>
                        </div>
                        <button
  onClick={() => navigate(`/apply/${job.jobId}`)}
  className="w-full mt-2 bg-primary-50 text-primary-600 font-medium py-2 px-4 rounded-lg hover:bg-primary-100 transition-colors duration-200"
>
  Apply Now
</button>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-6 flex justify-center">
                  <button className="text-primary-600 font-medium hover:text-primary-700 transition-colors duration-200 flex items-center">
                    <span>View All Bookmarks</span>
                    <span className="material-symbols-outlined ml-1">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Ratings Section */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ratings & Feedback</h3>
                {ratings.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">You have not received any ratings yet.</p>
                ) : (
                  <div className="space-y-4">
                    {ratings.map((rating, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-2">★</span>
                            <span className="font-medium text-gray-900">Score: {rating.score} / 5</span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(rating.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-600">{rating.feedback}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default YouthDash;