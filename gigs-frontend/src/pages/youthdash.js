import React, { useState, useEffect } from "react";
import axios from "axios";
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

  return (
    <div className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow w-full">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-slate-800">{app.title}</h3>
          <p className="text-slate-600 text-sm">{app.location}</p>
          <p className="text-slate-600 text-sm">{app.category}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm 
            ${
              app.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : app.status === "accepted"
                ? "bg-green-100 text-green-700"
                : app.status === "rejected"
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
            }`}
        >
          {app.status}
        </span>
      </div>
      <p className="text-slate-600 text-sm mt-2">
        Applied on: {new Date(app.appliedAt).toLocaleDateString()}
      </p>

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
              <p className="text-slate-700"><strong>Name:</strong> {contact.firstName}</p>
              <p className="text-slate-700"><strong>Email:</strong> {contact.email}</p>
              <p className="text-slate-700"><strong>Phone:</strong> {contact.phone}</p>
              <p className="text-slate-700"><strong>Location:</strong> {contact.location}</p>
            </div>
          ) : (
            <p className="text-red-600">Unable to load contact info.</p>
          )}
        </div>
      )}
    </div>
  );
};

const Youthdash = () => {
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [stats, setStats] = useState({ applications: 0, bookmarks: 0 });

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

  // Add job to bookmarks
  const handleBookmark = async (jobId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:5000/api/bookmarks", { jobId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Job bookmarked!");
      fetchBookmarks();
    } catch (err) {
      console.error("Bookmark error:", err);
      alert("Bookmarking failed");
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

  // Fetch all required data on initial render
  useEffect(() => {
    fetchStats();
    fetchBookmarks();
    fetchApplications();
    fetchProfile();
  }, []);

  return (
    <div id="webcrumbs">
      <div className="w-full px-4 py-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-full">
          {/* Left column for profile and stats */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <div className="text-center">
                <div className="relative mb-4">
                  <img
                    src=" "
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto border-4 border-primary-100 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
                </div>
              </div>
              {profile ? (
                <>
                  <h2 className="text-xl font-bold text-slate-800">{profile.firstName}</h2>
                  <h2 className="text-xl font-bold text-slate-800">{profile.lastName}</h2>
                  <h2 className="text-slate-600 mb-2">{profile.location}</h2>
                  <p className="text-slate-600 mb-2">{profile.bio || "No bio available"}</p>
                  <p className="text-slate-600 mb-2">{profile.skills || "No skills listed"}</p>

                  <p className="text-slate-600 mb-2">Applicant</p>
                  <div className="flex items-center gap-3 text-slate-600">
                    <span className="material-symbols-outlined text-lg">email</span>
                    <span>{profile.email}</span>
                  </div>
                </>
              ) : (
                <p>Loading profile...</p>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Applications</span>
                  <span className="font-semibold text-slate-800">{stats.applications}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Bookmarks</span>
                  <span className="font-semibold text-slate-800">{stats.bookmarks}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column for applications and bookmarks */}
          <div className="lg:col-span-3 space-y-6">
            {/* Applications Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <div className="flex flex-wrap gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                    <span className="material-symbols-outlined">work</span>
                    Applications
                  </button>
                </div>
              </div>
              <div className="p-6">
                {applications.length === 0 ? (
                  <p className="text-slate-500">You haven't applied for any jobs yet.</p>
                ) : (
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <ApplicationCard key={app.applicationId} app={app} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bookmarked Jobs Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 w-full">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Bookmarked Jobs</h3>
                <div className="space-y-3">
                  {bookmarkedJobs.length === 0 ? (
                    <p className="text-slate-500">You haven't bookmarked any jobs yet.</p>
                  ) : (
                    bookmarkedJobs.map((job) => (
                      <div
                        key={job.jobId}
                        className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <span className="material-symbols-outlined text-yellow-500">bookmark</span>
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">{job.title}</p>
                          <p className="text-sm text-slate-600">{job.location}</p>
                        </div>
                        <button
                          onClick={() => unbookmarkJob(job.jobId)}
                          className="text-sm text-red-500 hover:text-red-700"
                        >
                          Unbookmark
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Youthdash;
