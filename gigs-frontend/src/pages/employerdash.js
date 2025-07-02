import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom";
import "../styles/stylez.css";

const EmployerDash = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    active: 0,
    pending: 0,
    totalApplications: 0,
  });

  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/employerStats/employer/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching dashboard stats", err);
      }
    };

    const fetchApplicants = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/employer/applicants", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setApplicants(data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchStats();
    fetchApplicants();
  }, [token]);

  const fetchApplicantProfile = async (applicantId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/applicants/${applicantId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSelectedApplicant(data);
    } catch (err) {
      console.error("Failed to fetch applicant profile:", err);
    }
  };

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      const res = await fetch("http://localhost:5000/api/employer/update-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ applicationId, status }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setApplicants((prev) =>
        prev.map((app) =>
          app.applicationId === applicationId ? { ...app, status } : app
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleRemoveApplicant = async (applicationId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/applications/${applicationId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to remove applicant");

      setApplicants((prev) =>
        prev.filter((app) => app.applicationId !== applicationId)
      );
    } catch (error) {
      console.error("Error removing applicant:", error);
    }
  };

  return (
    <div id="webcrumbs">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <main className="container mx-auto px-4 py-8">
          {/* Stats Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Job Postings Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-6">
              <div className="lg:col-span-4 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg text-gray-700">Active Listings</h3>
                <p className="text-3xl font-bold text-primary-600 mt-2">{stats.activeListings}</p>
              </div>
              <div className="lg:col-span-4 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg text-gray-700">Pending Approvals</h3>
                <p className="text-3xl font-bold text-amber-600 mt-2">{stats.pendingApprovals}</p>
              </div>
              <div className="lg:col-span-4 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg text-gray-700">Total Applications</h3>
                <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.totalApplications}</p>
              </div>
            </div>
            <div className="flex gap-4 justify-end">
              <button
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg shadow"
                onClick={() => window.location.href = "/jobpost"}
              >
                Post New Job
              </button>
            </div>
          </section>

          {/* Applicants Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Applicants</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              {applicants.length === 0 ? (
                <p className="p-4 text-gray-500">No one has applied yet.</p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {applicants.map((app) => {
                    console.log("applicant entry:", app); // 👈 Debug log here
                    const realApplicantId = app.applicantId || app.userId || app.id;

                    return (
                      <li key={app.applicationId} className="p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          {/* Clicking the name/avatar shows modal */}
                          <div
                            className="flex items-center cursor-pointer"
                            onClick={() => fetchApplicantProfile(realApplicantId)}
                          >
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                              <span className="text-blue-700 font-medium">
                                {app.firstName?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">
                                {app.firstName} {app.lastName}
                              </p>
                              <p className="text-sm text-gray-500">
                                Applied for <strong>{app.jobTitle}</strong>
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2 items-center">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium
                              ${app.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                                app.status === "accepted" ? "bg-green-100 text-green-700" :
                                  app.status === "rejected" ? "bg-red-100 text-red-700" : ""}`}>
                              {app.status}
                            </span>

                            {app.status === "pending" && (
                              <>
                                <button
                                  onClick={() => handleStatusUpdate(app.applicationId, "accepted")}
                                  className="text-green-600 hover:underline text-sm"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleStatusUpdate(app.applicationId, "rejected")}
                                  className="text-red-600 hover:underline text-sm"
                                >
                                  Reject
                                </button>
                              </>
                            )}

                            {app.status === "accepted" && (
                              <button onClick={() => navigate(`/rate/${app.applicantId}`)}>
  Rate
</button>
                            )}

                            <button
                              onClick={() => handleRemoveApplicant(app.applicationId)}
                              className="text-gray-400 hover:text-red-500 text-sm ml-2"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </section>

          {/* Profile Viewer Modal */}
          {selectedApplicant && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                  onClick={() => setSelectedApplicant(null)}
                >
                  &times;
                </button>
                <h3 className="text-xl font-bold mb-2">
                  {selectedApplicant.firstName} {selectedApplicant.lastName}
                </h3>
                <p><strong>Email:</strong> {selectedApplicant.email}</p>
                <p><strong>Bio:</strong> {selectedApplicant.bio || "N/A"}</p>
                <p><strong>Skills:</strong> {selectedApplicant.skills || "N/A"}</p>
                <p><strong>Location:</strong> {selectedApplicant.location || "N/A"}</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EmployerDash;
