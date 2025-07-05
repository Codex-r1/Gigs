import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const AdminDash = () => {
  const [stats, setStats] = useState({ users: 0, jobs: 0, applications: 0 });
  const [recentApps, setRecentApps] = useState([]);
  const [users, setUsers] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [chartData, setChartData] = useState({
    options: {
      chart: { id: "activity-chart" },
      xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] }
    },
    series: [{ name: "New Users", data: [1, 3, 2, 5, 4, 6, 1] }] // Initialize with default data
  });

  // Get token from localStorage (if available in environment)
  const getToken = () => {
    try {
      return localStorage?.getItem("token") || "";
    } catch {
      return "";
    }
  };

  const token = getToken();

  // DELETE user handler
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      alert(data.message);
      setUsers(users.filter((u) => u.userId !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user.");
    }
  };

  // EDIT user handler
  const handleEditUser = async (user) => {
    const newEmail = prompt("Enter new email:", user.email);
    if (!newEmail) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${user.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...user,
          email: newEmail,
        }),
      });

      const data = await res.json();
      alert(data.message);
      setUsers(users.map((u) => (u.userId === user.userId ? { ...u, email: newEmail } : u)));
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user.");
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/admin/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Job deleted successfully.");
      
      // Optional: refresh job list after delete
      fetchJobs();

    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job. Please try again.");
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      // Ensure data is an array
      setRecentJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
      setRecentJobs([]); // Set empty array on error
    }
  };

  const handleDeleteApplication = async (applicationId) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/admin/applications/${applicationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Application deleted.");
      setRecentApps(recentApps.filter((app) => app.id !== applicationId));
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Failed to delete application.");
    }
  };

  const handleBlockUser = async (userId) => {
    if (!window.confirm("Block this user?")) return;

    try {
      const res = await axios.put(`http://localhost:5000/api/admin/users/block/${userId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(res.data.message || "User blocked.");
      fetchUsers(); // refresh user list if needed
    } catch (error) {
      console.error("Error blocking user:", error);
      alert("Failed to block user.");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      // Ensure data is an array
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch users", err);
      setUsers([]); // Set empty array on error
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setStats(data || { users: 0, jobs: 0, applications: 0 });
      } catch (err) {
        console.error("Failed to fetch stats", err);
        // Use fallback data for demo
        setStats({ users: 1249, jobs: 523, applications: 2876 });
      }
    };

    const fetchApplications = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/applications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        // Ensure data is an array
        setRecentApps(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch applications", err);
        setRecentApps([]); // Set empty array on error
      }
    };

    const fetchActivity = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/activity", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
console.log("Fetched activity data:", data);

        // Check if data exists and is an array
        if (!data || !Array.isArray(data)) {
          console.error("Invalid activity data:", data);
          // Set default chart data
          setChartData({
            options: {
              chart: { id: "activity-chart" },
              xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] }
            },
            series: [{ name: "New Users", data: [0, 0, 0, 0, 0, 0, 0] }]
          });
          return;
        }

        const activityMap = {};
        data.forEach(item => {
          if (item && item.date) {
            activityMap[item.date] = item.count || 0;
          }
        });

        const days = [...Array(7)].map((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));
          const iso = date.toISOString().split("T")[0];
          return iso;
        });

        const seriesData = days.map(date => activityMap[date] || 0);

        setChartData({
          options: {
            chart: { id: "activity-chart" },
            xaxis: { categories: days.map(d => new Date(d).toLocaleDateString('en-US', { weekday: 'short' })) }
          },
          series: [{ name: "New Users", data: seriesData }]
        });

      } catch (err) {
        console.error("Failed to fetch activity data", err);
        // Set default chart data on error
        setChartData({
          options: {
            chart: { id: "activity-chart" },
            xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] }
          },
          series: [{ name: "New Users", data: [0, 0, 0, 0, 0, 0, 0] }]
        });
      }
    };

    fetchJobs();
    fetchStats();
    fetchApplications();
    fetchUsers();
    fetchActivity();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role) => {
    return role === "applicant" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800";
  };

  return (
    <div id="webcrumbs">
      <div className="w-full min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <header className="bg-white rounded-xl shadow-md p-6 mb-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-primary-600 text-white p-3 rounded-full">
                <span className="material-symbols-outlined text-2xl">work</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800"> Admin</h1>
                <p className="text-sm text-gray-500"> Management Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => window.location.href = "/settings"} className="p-2 rounded-full hover:bg-gray-100 transition-all">
                <span className="material-symbols-outlined">settings</span>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold">AD</span>
                </div>
                <span className="font-medium">Admin</span>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 hover:shadow-lg transition-all">
              <div className="bg-blue-100 p-4 rounded-full">
                <span className="material-symbols-outlined text-blue-600 text-2xl">person</span>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <h2 className="text-2xl font-bold">{stats.users}</h2>
                <p className="text-xs text-green-600 flex items-center">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 hover:shadow-lg transition-all">
              <div className="bg-purple-100 p-4 rounded-full">
                <span className="material-symbols-outlined text-purple-600 text-2xl">description</span>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Active Jobs</p>
                <h2 className="text-2xl font-bold">{stats.jobs}</h2>
                <p className="text-xs text-green-600 flex items-center">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 hover:shadow-lg transition-all">
              <div className="bg-amber-100 p-4 rounded-full">
                <span className="material-symbols-outlined text-amber-600 text-2xl">handshake</span>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Applications</p>
                <h2 className="text-2xl font-bold">{stats.applications}</h2>
                <p className="text-xs text-red-600 flex items-center">
                  <span className="material-symbols-outlined text-sm">trending_down</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow-md lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Activity Overview</h2>
                <select className="bg-gray-100 px-3 py-1.5 rounded-lg text-sm border-0 focus:ring-2 focus:ring-primary-500">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="h-80 w-full">
                {chartData.series && chartData.series.length > 0 ? (
                  <Chart options={chartData.options} series={chartData.series} type="area" height={300} />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Loading chart data...
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
                <button className="text-primary-600 text-sm hover:underline">View All</button>
              </div>

              <div className="space-y-4">
                {recentActivity && recentActivity.length > 0 ? (
                  recentActivity.map((activity) => (
                    <div key={activity.id} className={`border-l-4 border-${activity.color || 'blue'}-500 pl-4 py-1`}>
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.description}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    No recent activity
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Recent Job Posts</h2>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <button className="p-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors">
                    <span className="material-symbols-outlined">search</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                    
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentJobs && recentJobs.length > 0 ? (
                      recentJobs.map((job) => (
                        <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <p className="text-sm font-medium">{job.title}</p>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <p className="text-sm text-gray-700">{job.postedAt}</p>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(job.status)}`}>
                              {job.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                            <button 
                              onClick={() => handleDeleteJob(job.jobId)} 
                              className="text-red-600 hover:text-red-800"
                            >
                              <span className="material-symbols-outlined">delete</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                          No jobs found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Recent Applications</h2>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Search applications..."
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <button className="p-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors">
                    <span className="material-symbols-outlined">search</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentApps && recentApps.length > 0 ? (
                      recentApps.map((app) => (
                        <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <span className="text-blue-600 text-sm font-bold">
                                  {app.firstName?.charAt(0) || 'U'}{app.lastName?.charAt(0) || 'U'}
                                </span>
                              </div>
                              <p className="text-sm font-medium">{app.firstName || 'N/A'} {app.lastName || 'N/A'}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <p className="text-sm text-gray-700">{app.jobTitle || 'N/A'}</p>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <p className="text-sm text-gray-700">{app.appliedAt || 'N/A'}</p>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(app.status)}`}>
                              {app.status || 'Unknown'}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                            <button 
                              onClick={() => handleDeleteApplication(app.id)}
                              className="text-gray-500 hover:text-red-600 transition-colors"
                            >
                              <span className="material-symbols-outlined">delete</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                          No applications found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">User Management</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users && users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.userId} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <span className="text-blue-600 font-bold">
                                {user.firstName?.charAt(0) || 'U'}{user.lastName?.charAt(0) || 'U'}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">{user.firstName || 'N/A'} {user.lastName || 'N/A'}</p>
                              <p className="text-xs text-gray-500">{user.role || 'N/A'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <p className="text-sm text-gray-700">{user.email || 'N/A'}</p>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(user.role)}`}>
                            {user.role || 'N/A'}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(user.status)}`}>
                            {user.status || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <p className="text-sm text-gray-700">{user.joinedAt || 'N/A'}</p>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => handleEditUser(user)}
                              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <span className="material-symbols-outlined text-gray-500">edit</span>
                            </button>
                            <button 
                              onClick={() => handleBlockUser(user.userId)}
                              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <span className="material-symbols-outlined text-gray-500">block</span>
                            </button>
                            <button 
                              onClick={() => handleDeleteUser(user.userId)}
                              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <span className="material-symbols-outlined text-red-500">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

             <div className="mt-6 flex justify-between items-center">
              <p className="text-sm text-gray-500">Showing 1-{users.length} of {users.length} users</p>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                  disabled
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="px-3 py-1 bg-primary-100 text-primary-600 rounded-md hover:bg-primary-200 transition-colors">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  3
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminDash;