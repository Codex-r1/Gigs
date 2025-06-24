import React, { useState, useEffect } from "react";
import "../styles/stylez.css";

const EmployerDash = () => {
  const [stats, setStats] = useState({
    active: 0,
    pending: 0,
    totalApplications: 0,
  });

  const [applicants, setApplicants] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/employerStats/employer/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  return (
    <div id="webcrumbs">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <main className="container mx-auto px-4 py-8">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Job Postings Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-6">
              <div className="lg:col-span-4 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg text-gray-700">Active Listings</h3>
                <p className="text-3xl font-bold text-primary-600 mt-2">{stats.active}</p>
              </div>

              <div className="lg:col-span-4 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg text-gray-700">Pending Approvals</h3>
                <p className="text-3xl font-bold text-amber-600 mt-2">{stats.pending}</p>
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
                <span className="material-symbols-outlined mr-2">add_circle</span>
                Post New Job
              </button>

              <button
                className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 border border-gray-200 rounded-lg shadow"
                onClick={() => window.location.href = "/manage"}
              >
                <span className="material-symbols-outlined mr-2">manage_accounts</span>
                Manage Applicants
              </button>
            </div>
          </section>

          {/* Applicants */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Applicants</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              {applicants.length === 0 ? (
                <p className="p-4 text-gray-500">No one has applied yet.</p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {applicants.map((app) => (
                    <li key={app.applicationId} className="p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                            <span className="text-blue-700 font-medium">
                              {app.username?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{app.username}</p>
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
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default EmployerDash;
