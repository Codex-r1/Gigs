import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/style.css";

const ApplicationCard = ({ app }) => {
  const [contact, setContact] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const fetchContact = async () => {
    console.log("App status:", app.status);

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
    <div className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
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

      {app.status === "accepted" && (
        <div className="mt-4">
          {!showContact ? (
            <button
              onClick={fetchContact}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              View Employer Contact
            </button>
          ) : contact ? (
            <div className="mt-2 p-4 bg-green-50 border border-green-200 rounded">
              <p className="text-slate-700"><strong>Name:</strong> {contact.name}</p>
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
  const [stats, setStats] = useState({
    applications: 0,
    bookmarks: 0
  });
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

  useEffect(() => {
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

    fetchStats();
    fetchBookmarks();
    fetchApplications();
    fetchProfile();
  }, []);

  return (
    <div id="webcrumbs">
      <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
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

          <div className="lg:col-span-3 space-y-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
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
                        <button className="p-1 text-slate-400 hover:text-primary-500 transition-colors">
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
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
