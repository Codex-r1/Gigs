import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import "../styles/stylez.css";
import axios from "axios";

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
    const [jobs, setJobs] = useState([]);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedApplicationId, setSelectedApplicationId] = useState(null);
    const [rejectionReason, setRejectionReason] = useState("");
     const [showEditModal, setShowEditModal] = useState(false);
    const [jobToEdit, setJobToEdit] = useState(null);

    const [updateMessage, setUpdateMessage] = useState("");

    // API helper function
    const apiCall = async (url, options = {}) => {
        const defaultOptions = {
            headers: { Authorization: `Bearer ${token}` },
            ...options
        };
        return fetch(url, defaultOptions);
    };
     const fetchJobs = async () => {
            try {
                const res = await apiCall("http://localhost:5000/api/jobs");
                const data = await res.json();
                setJobs(data);
            } catch (err) {
                console.error("Error fetching employer jobs:", err);
            }
        };
 // Delete job function - moved outside useEffect
  const handleDeleteJob = async (jobId) => {
    
  const token = localStorage.getItem("token");
  console.log("Deleting job", jobId, "with token", token);

  try {
    await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Job deleted successfully!");
    fetchJobs(); // refresh the job list
  } catch (err) {
    console.error("Delete error:", err);
    alert("Failed to delete job");
  }
};


    // Edit job function - moved outside useEffect
    const handleEditClick = (job) => {
  const normalizedJob = {
    ...job,
    id: job.jobId || job.id // normalize the ID key
  };
  console.log("Job selected for editing:", normalizedJob);
  setJobToEdit(normalizedJob);
  setShowEditModal(true);
};


    // Save edit function - moved outside useEffect
    const handleSaveEdit = async () => {
  try {
    const res = await apiCall(`http://localhost:5000/api/jobs/${jobToEdit.jobId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jobToEdit),
    });

    if (!res.ok) throw new Error("Failed to update job");

    const updatedJob = await res.json();

    setJobs((prev) =>
      prev.map((j) => (j.jobId === updatedJob.jobId ? updatedJob : j)) // Fix ID field if needed
    );

    // ✅ Show confirmation message
    setUpdateMessage("Job updated successfully!");
    setTimeout(() => setUpdateMessage(""), 3000);

    // ✅ Close modal and clear form
    setShowEditModal(false);
    setJobToEdit(null);
  } catch (err) {
    console.error("Error updating job:", err);
    alert("Could not save job updates.");
  }
};
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await apiCall("http://localhost:5000/api/employerStats/employer/stats");
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
                const res = await apiCall("http://localhost:5000/api/employerStats/trends");
                const data = await res.json();
                setTrendData(data);
            } catch (error) {
                console.error("Error fetching trend data:", error);
            }
        };

        const fetchApplicants = async () => {
            try {
                const res = await apiCall("http://localhost:5000/api/employer/applicants");
                const data = await res.json();
                setApplicants(data);
            } catch (error) {
                console.error("Error fetching applicants:", error);
            }
        };

        fetchJobs();
        fetchStats();
        fetchApplicants();
        fetchTrendData();
    }, [token]);

const fetchApplicantProfile = async (app) => {
  const applicantId = app.applicantId;
  const jobId = app.jobId; // Make sure this exists in your applicants data
console.log("Fetching applicant profile for:", applicantId, "Job ID:", jobId);
  if (!applicantId || !jobId) {
    console.error("Missing applicantId or jobId");
    return;
  }

  try {
    const res = await apiCall(`http://localhost:5000/api/applicants/applicant-details/${applicantId}/${jobId}`);
    const data = await res.json();
    setSelectedApplicant(data);
  } catch (err) {
    console.error("Failed to fetch detailed applicant info:", err);
  }
};
const handleStatusUpdate = async (applicationId, status, reviewComment = "") => {
        try {
            const res = await apiCall("http://localhost:5000/api/employer/update-status", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ applicationId, status, reviewComment }),
            });

            if (!res.ok) throw new Error("Failed to update status");

            setApplicants((prev) =>
                prev.map((app) =>
                    app.applicationId === applicationId ? { ...app, status, reviewComment } : app
                )
            );
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const getStatusDisplay = (status) => {
        const statusMap = {
            "pending": { class: "bg-yellow-100 text-yellow-800", text: "Pending" },
            "accepted": { class: "bg-green-100 text-green-800", text: "Hired" },
            "rejected": { class: "bg-red-100 text-red-800", text: "Rejected" },
            "interviewed": { class: "bg-blue-100 text-blue-800", text: "Interviewed" },
            "default": { class: "bg-orange-100 text-orange-800", text: "New" }
        };
        return statusMap[status] || statusMap.default;
    };
        
    const filteredApplicants = applicants.filter(app => {
        const matchesSearch = searchTerm === "" || 
            `${app.firstName} ${app.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === "All Status" || app.status === statusFilter.toLowerCase();
        
        return matchesSearch && matchesStatus;
    });

    const openRejectModal = (applicationId) => {
        setSelectedApplicationId(applicationId);
        setShowRejectModal(true);
    };

    const handleSubmitRejection = async () => {
        if (!rejectionReason.trim()) {
            alert("Rejection reason is required.");
            return;
        }
        
        try {
            await handleStatusUpdate(selectedApplicationId, "rejected", rejectionReason);
            setShowRejectModal(false);
            setRejectionReason("");
            setSelectedApplicationId(null);
        } catch (err) {
            console.error("Error submitting rejection:", err);
        }
    };

    const closeRejectModal = () => {
        setShowRejectModal(false);
        setRejectionReason("");
        setSelectedApplicationId(null);
    };

    // Helper component for stat cards
    const StatCard = ({ icon, bgColor, textColor, title, value, subtitle }) => (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${bgColor} rounded-full`}>
                    <span className={`material-symbols-outlined ${textColor}`}>{icon}</span>
                </div>
                <span className="text-sm text-gray-500">{title}</span>
            </div>
            <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-green-600">{subtitle}</p>
            </div>
        </div>
    );

    // Helper component for action buttons
    const ActionButton = ({ icon, label, onClick, variant = "default" }) => {
        const baseClass = "w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200";
        
        return (
            <button onClick={onClick} className={baseClass}>
                <span className="flex items-center space-x-3">
                    <span className="material-symbols-outlined text-gray-600">{icon}</span>
                    <span className="text-gray-700">{label}</span>
                </span>
                <span className="material-symbols-outlined text-gray-400">arrow_forward</span>
            </button>
        );
    };
    return (
        <div id="webcrumbs">
            <div className="w-full min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Employer Dashboard</h1>
                        <p className="text-gray-600">Manage your job postings and track applications</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            icon="work"
                            bgColor="bg-blue-100"
                            textColor="text-blue-600"
                            title="Total Jobs"
                            value={stats.totalJobs}
                            subtitle="+3 this month"
                        />
                        <StatCard
                            icon="trending_up"
                            bgColor="bg-green-100"
                            textColor="text-green-600"
                            title="Active Jobs"
                            value={stats.activeListings}
                            subtitle="Currently hiring"
                        />
                        <StatCard
                            icon="person"
                            bgColor="bg-purple-100"
                            textColor="text-purple-600"
                            title="Total Applicants"
                            value={stats.totalApplications}
                            subtitle={`+${stats.newApplicationsToday} today`}
                        />
                        <StatCard
                            icon="schedule"
                            bgColor="bg-orange-100"
                            textColor="text-orange-600"
                            title="Pending Reviews"
                            value={stats.pendingApprovals}
                            subtitle="Needs attention"
                        />
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
{updateMessage && (
  <div className="mb-4 p-3 bg-green-100 text-green-800 rounded shadow-sm">
    {updateMessage}
  </div>
)}
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">My Jobs</h3>
                                {jobs.length === 0 ? (
                                    <p className="text-gray-500">No jobs posted yet.</p>
                                ) : (
                                    <ul className="space-y-4">
                                      {jobs.map((job) => (
  <li key={job.id} className="flex justify-between items-center border-b pb-2">
    <div>
      <p className="text-sm font-medium text-gray-800">{job.title}</p>
      <p className="text-xs text-gray-500">Status:
        <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${
          job.status === "closed"
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-600"
        }`}>
          {job.status}
        </span>
      </p>
    </div>
    <div className="flex space-x-2">
      <button
        onClick={() => handleEditClick(job)}
        className="text-blue-600 hover:text-blue-800"
        title="Edit Job"
      >
        <span className="material-symbols-outlined">edit</span>
      </button>
      <button
        onClick={() => handleDeleteJob(job.jobId)}
        className="text-red-600 hover:text-red-800"
        title="Delete Job"
      >
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  </li>
))}

                                    </ul>
                                )}
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <ActionButton
                                        icon="visibility"
                                        label="View All Jobs"
                                        onClick={() => navigate("/jobs")}
                                    />
                                    <ActionButton
                                        icon="edit"
                                        label="Edit Profile"
                                        onClick={() => navigate("/settings")}
                                    />
                                    <ActionButton
                                        icon="settings"
                                        label="Account Settings"
                                        onClick={() => navigate("/settings")}
                                    />
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
                                        <th className="text-left p-4 font-medium text-gray-700">Applied on</th>
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
                                            const applicantId = app.applicantId || app.userId || app.id;
                                            const statusInfo = getStatusDisplay(app.status);
                                            
                                            return (
                                                <tr key={app.applicationId} className="hover:bg-gray-50 transition-colors duration-200">
                                                    <td className="p-4">
                                                        <div 
                                                            className="flex items-center space-x-3 cursor-pointer"
                                                            onClick={() => fetchApplicantProfile(app)}
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
                                                        {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : 'N/A'}
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.class}`}>
                                                            {statusInfo.text}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex items-center space-x-2">
                                                            <button 
                                                                onClick={() => fetchApplicantProfile(app)}
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
                                                                        onClick={() => openRejectModal(app.applicationId)}
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
        <p><strong>Skill Match:</strong> {selectedApplicant.skillMatchPercent || 0}%</p>
        <p><strong>Location:</strong> {selectedApplicant.location || "N/A"}</p>
        <p><strong>Motivation:</strong> {selectedApplicant.motivation || "No message provided"}</p>
        <p><strong>Rating:</strong> {selectedApplicant.rating !== null ? `${selectedApplicant.rating}/5` : "Not rated yet"}</p>

{selectedApplicant.feedback && (
  <p><strong>Feedback:</strong> {selectedApplicant.feedback}</p>
)}

{selectedApplicant.recommended !== null && (
  <p><strong>Recommended:</strong> {selectedApplicant.recommended ? "Yes 👍" : "No 👎"}</p>
)}

      </div>
    </div>
  </div>
)}

                 {/* Rejection Modal - Now with proper z-index and backdrop */}
                {showRejectModal && (
                    <div className="fixed inset-0 z-[50v] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                        <div className="bg-white rounded-xl p-6 shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-80">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">Reject Application</h2>
                                <button
                                    onClick={closeRejectModal}
                                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="rejectionReason" className="block text-sm font-medium text-gray-700 mb-2">
                                    Reason for rejection *
                                </label>
                                <textarea
                                    id="rejectionReason"
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                    rows="4"
                                    placeholder="Please provide a reason for rejecting this application..."
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                                    onClick={closeRejectModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                    onClick={handleSubmitRejection}
                                    disabled={!rejectionReason.trim()}
                                >
                                    Reject Application
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {showEditModal && jobToEdit && (
  <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
    <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-xl relative">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
        onClick={() => setShowEditModal(false)}
      >
        &times;
      </button>
      <h2 className="text-lg font-semibold mb-4">Edit Job Posting</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Job Title"
          className="w-full border rounded-lg p-2"
          value={jobToEdit.title}
          onChange={(e) =>
            setJobToEdit({ ...jobToEdit, title: e.target.value })
          }
        />
        <textarea
          placeholder="Job Description"
          className="w-full border rounded-lg p-2"
          rows="4"
          value={jobToEdit.description}
          onChange={(e) =>
            setJobToEdit({ ...jobToEdit, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full border rounded-lg p-2"
          value={jobToEdit.location}
          onChange={(e) =>
            setJobToEdit({ ...jobToEdit, location: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Skills Required"
          className="w-full border rounded-lg p-2"
          value={jobToEdit.skillsRequired}
          onChange={(e) =>
            setJobToEdit({ ...jobToEdit, skillsRequired: e.target.value })
          }
        />
        <select
          className="w-full border rounded-lg p-2"
          value={jobToEdit.status}
          onChange={(e) =>
            setJobToEdit({ ...jobToEdit, status: e.target.value })
          }
        >
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="flex justify-end mt-6 space-x-3">
        <button
          onClick={() => setShowEditModal(false)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveEdit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}

            </div>
        </div>
        
    );
    
};

export default EmployerDash;