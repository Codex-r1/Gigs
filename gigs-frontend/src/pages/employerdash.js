import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import "../styles/stylez.css";

const EmployerDash = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        activeListings: "",
        pendingApprovals:"",
        totalApplications: "",
        totalJobs: "",
        newApplicationsToday: "",
        newApplicationsMonth: ""
    });

    const [applicants, setApplicants] = useState([]);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const token = localStorage.getItem("token");
    const [trendData, setTrendData] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/employerStats/employer/stats", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setStats(prevStats => ({
                    ...prevStats,
                    ...data
                }));
            } catch (err) {
                console.error("Error fetching dashboard stats", err);
            }
        };
const fetchTrendData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/employerStats/trends", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTrendData(data);
    } catch (error) {
      console.error("Error fetching trend data:", error);
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
        fetchTrendData();
    }, [token]);

  const fetchApplicantProfile = async (applicant) => {
  try {
    const res = await fetch(`http://localhost:5000/api/applicants/${applicant.applicantId}`, {
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

    const getStatusDisplay = (status) => {
        switch (status) {
            case "pending":
                return { class: "bg-yellow-100 text-yellow-800", text: "Under Review" };
            case "accepted":
                return { class: "bg-green-100 text-green-800", text: "Hired" };
            case "rejected":
                return { class: "bg-red-100 text-red-800", text: "Rejected" };
            case "interviewed":
                return { class: "bg-blue-100 text-blue-800", text: "Interviewed" };
            default:
                return { class: "bg-orange-100 text-orange-800", text: "New" };
        }
    };

    const filteredApplicants = applicants.filter(app => {
        const matchesSearch = searchTerm === "" || 
            `${app.firstName} ${app.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === "All Status" || app.status === statusFilter.toLowerCase();
        
        return matchesSearch && matchesStatus;
    });

    return (
        <div id="webcrumbs">
            <div className="w-full min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Employer Dashboard</h1>
                        <p className="text-gray-600">Manage your job postings and track applications</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <span className="material-symbols-outlined text-blue-600">work</span>
                                </div>
                                <span className="text-sm text-gray-500">Total Jobs</span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-2xl font-bold text-gray-900">{stats.totalJobs}</p>
                                <p className="text-sm text-green-600">+3 this month</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-green-100 rounded-full">
                                    <span className="material-symbols-outlined text-green-600">trending_up</span>
                                </div>
                                <span className="text-sm text-gray-500">Active Jobs</span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-2xl font-bold text-gray-900">{stats.activeListings}</p>
                                <p className="text-sm text-gray-500">Currently hiring</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-purple-100 rounded-full">
                                    <span className="material-symbols-outlined text-purple-600">person</span>
                                </div>
                                <span className="text-sm text-gray-500">Total Applicants</span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
                                <p className="text-sm text-blue-600">+{stats.newApplicationsToday} today</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-orange-100 rounded-full">
                                    <span className="material-symbols-outlined text-orange-600">schedule</span>
                                </div>
                                <span className="text-sm text-gray-500">Pending Reviews</span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</p>
                                <p className="text-sm text-orange-600">Needs attention</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900">Application Analytics</h2>
                                    <div className="flex items-center space-x-2">
                                        <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                                            <option>Last 30 days</option>
                                            <option>Last 7 days</option>
                                            <option>Last 3 months</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="h-64 bg-white rounded-lg">
  <Chart
    type="area"
    height="100%"
    width="100%"
    options={{
      chart: {
        id: "applications-trend",
        toolbar: { show: false },
        zoom: { enabled: false }
      },
      xaxis: {
        categories: trendData.map(item => item.date),
        title: { text: "Date" }
      },
      yaxis: {
        title: { text: "Applications" }
      },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 2 },
      colors: ["#3B82F6"],
      tooltip: {
        x: { format: 'yyyy-MM-dd' }
      }
    }}
    series={[
      {
        name: "Applications",
        data: trendData.map(item => item.count)
      }
    ]}
  />
</div>

                                <div className="grid grid-cols-3 gap-4 mt-6">
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <p className="text-2xl font-bold text-blue-600">{stats.newApplicationsMonth}</p>
                                        <p className="text-sm text-gray-600">New Applications</p>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <p className="text-2xl font-bold text-green-600">{stats.interviewed}</p>
                                        <p className="text-sm text-gray-600">Interviewed</p>
                                    </div>
                                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                                        <p className="text-2xl font-bold text-purple-600">{stats.hired}</p>
                                        <p className="text-sm text-gray-600">Hired</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold">Post New Job</h3>
                                    <span className="material-symbols-outlined">add_circle</span>
                                </div>
                                <p className="text-primary-100 mb-4">
                                    Create a new job posting and start receiving applications
                                </p>
                                <button 
                                    onClick={() => window.location.href = "/jobpost"}
                                    className="w-full bg-white text-primary-600 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                >
                                    Post a Job
                                </button>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                        <span className="flex items-center space-x-3">
                                            <span className="material-symbols-outlined text-gray-600">visibility</span>
                                            <span className="text-gray-700">View All Jobs</span>
                                        </span>
                                        <span className="material-symbols-outlined text-gray-400">arrow_forward</span>
                                    </button>
                                    <button
  onClick={() => navigate("/settings")}
  className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
>
  <span className="flex items-center space-x-3">
    <span className="material-symbols-outlined text-gray-600">edit</span>
    <span className="text-gray-700">Edit Profile</span>
  </span>
  <span className="material-symbols-outlined text-gray-400">arrow_forward</span>
</button>

<button
  onClick={() => navigate("/settings")}
  className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
>
  <span className="flex items-center space-x-3">
    <span className="material-symbols-outlined text-gray-600">settings</span>
    <span className="text-gray-700">Account Settings</span>
  </span>
  <span className="material-symbols-outlined text-gray-400">arrow_forward</span>
</button>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">My Applicants</h2>
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            search
                                        </span>
                                        <input
                                            type="text"
                                            placeholder="Search applicants..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                    <select 
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    >
                                        <option>All Status</option>
                                        <option>New</option>
                                        <option>Pending</option>
                                        <option>Interviewed</option>
                                        <option>Accepted</option>
                                        <option>Rejected</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left p-4 font-medium text-gray-700">Applicant</th>
                                        <th className="text-left p-4 font-medium text-gray-700">Job Position</th>
                                        <th className="text-left p-4 font-medium text-gray-700">Applied Date</th>
                                        <th className="text-left p-4 font-medium text-gray-700">Status</th>
                                        <th className="text-left p-4 font-medium text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredApplicants.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="p-4 text-center text-gray-500">
                                                No applicants found
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredApplicants.map((app) => {
                                            const realApplicantId = app.applicantId || app.userId || app.id;
                                            const statusInfo = getStatusDisplay(app.status);
                                            
                                            return (
                                                <tr key={app.applicationId} className="hover:bg-gray-50 transition-colors duration-200">
                                                    <td className="p-4">
                                                        <div 
                                                            className="flex items-center space-x-3 cursor-pointer"
                                                            onClick={() => fetchApplicantProfile(realApplicantId)}
                                                        >
                                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                                <span className="text-blue-600 font-medium">
                                                                    {app.firstName?.charAt(0).toUpperCase() || 'U'}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-gray-900">
                                                                    {app.firstName} {app.lastName}
                                                                </p>
                                                               <p className="text-sm text-gray-500">{app.email}</p>
<p className="text-xs text-green-600 mt-1">
  Skill Match: {app.skillMatchPercent || 0}%
</p>

                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-gray-700">{app.jobTitle}</td>
                                                    <td className="p-4 text-gray-500">
                                                        {app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : 'N/A'}
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.class}`}>
                                                            {statusInfo.text}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex items-center space-x-2">
                                                            <button 
                                                                onClick={() => fetchApplicantProfile(realApplicantId)}
                                                                className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                                                            >
                                                                <span className="material-symbols-outlined">visibility</span>
                                                            </button>
                                                            
                                                            {app.status === "pending" && (
                                                                <>
                                                                    <button 
                                                                        onClick={() => handleStatusUpdate(app.applicationId, "accepted")}
                                                                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                                                                    >
                                                                        <span className="material-symbols-outlined">check_circle</span>
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => handleStatusUpdate(app.applicationId, "rejected")}
                                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                                                    >
                                                                        <span className="material-symbols-outlined">cancel</span>
                                                                    </button>
                                                                </>
                                                            )}
                                                            
                                                            {app.status === "accepted" && (
                                                                <button 
                                                                    onClick={() => navigate(`/rate/${app.applicantId}`)}
                                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                                                >
                                                                    <span className="material-symbols-outlined">star</span>
                                                                </button>
                                                            )}
                                                            
                                                            {(app.status === "rejected" || app.status === "accepted") && (
                                                                <>
                                                                    <button className="p-2 text-gray-400 cursor-not-allowed rounded-lg">
                                                                        <span className="material-symbols-outlined">check_circle</span>
                                                                    </button>
                                                                    <button className="p-2 text-gray-400 cursor-not-allowed rounded-lg">
                                                                        <span className="material-symbols-outlined">cancel</span>
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-6 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                    Showing 1-{Math.min(filteredApplicants.length, 4)} of {filteredApplicants.length} applicants
                                </p>
                                <div className="flex items-center space-x-2">
                                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200">
                                        Previous
                                    </button>
                                    <button className="px-3 py-1 bg-primary-500 text-white rounded-lg text-sm hover:bg-primary-600 transition-colors duration-200">
                                        1
                                    </button>
                                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200">
                                        2
                                    </button>
                                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200">
                                        3
                                    </button>
                                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Viewer Modal */}
                {selectedApplicant && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
                                onClick={() => setSelectedApplicant(null)}
                            >
                                &times;
                            </button>
                            <h3 className="text-xl font-bold mb-4">
                                {selectedApplicant.firstName} {selectedApplicant.lastName}
                            </h3>
                            <div className="space-y-3">
                                <p><strong>Email:</strong> {selectedApplicant.email}</p>
                                <p><strong>Bio:</strong> {selectedApplicant.bio || "N/A"}</p>
                                 <p><strong>Skills:</strong> {selectedApplicant.skills || "N/A"}</p>
                                <p><strong>Skill Match:</strong> {selectedApplicant.skillMatchPercent || 0}%</p>

                                <p><strong>Location:</strong> {selectedApplicant.location || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployerDash;