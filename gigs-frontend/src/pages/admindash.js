import React, { useEffect, useState } from "react";
import "../styles/admin.css";
import Chart from "react-apexcharts";

const AdminDash = () => {
  const [stats, setStats] = useState({ users: 0, jobs: 0, applications: 0 });
  const [recentApps, setRecentApps] = useState([]);
  const [users, setUsers] = useState([]);
  const [chartData, setChartData] = useState({
    options: {
      chart: { id: "activity-chart" },
      xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] }
    },
    series: [{ name: "Users", data: [30, 45, 20, 60, 35, 50, 25] }]
  });

  const token = localStorage.getItem("token");

  // DELETE user handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      alert(data.message);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user.");
    }
  };

  // EDIT user handler
  const handleEdit = async (user) => {
    const newEmail = prompt("Enter new email:", user.email);
    if (!newEmail) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${user.id}`, {
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
      setUsers(users.map((u) => (u.id === user.id ? { ...u, email: newEmail } : u)));
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user.");
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    const fetchRecentApplications = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/applications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setRecentApps(data);
      } catch (err) {
        console.error("Failed to fetch recent applications", err);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    const fetchActivity = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/activity", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        const activityMap = {};
        data.forEach(item => {
          activityMap[item.date] = item.count;
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
            xaxis: { categories: days }
          },
          series: [{ name: "New Users", data: seriesData }]
        });
      } catch (err) {
        console.error("Failed to fetch activity data", err);
      }
    };

    fetchStats();
    fetchRecentApplications();
    fetchUsers();
    fetchActivity();
  }, [token]);

  return (
    <div id="webcrumbs">
      <div className="w-full max-w-[1440px] bg-gray-50 p-4 sm:p-6 md:p-8">
        <div className="max-w-full mx-auto">
          <header className="mb-6 md:mb-8">
            <div className="flex justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Manage your job marketplace platform</p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatCard label="Total Users" count={stats.users} color="primary" />
            <StatCard label="Job Posts" count={stats.jobs} color="blue" />
            <StatCard label="Applications" count={stats.applications} color="purple" />
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Applications</h2>
            <div className="bg-white rounded-lg shadow-sm">
              {recentApps.length === 0 ? (
                <p className="p-4 text-gray-500">No recent applications.</p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {recentApps.map((app) => (
                    <li key={app.id} className="p-4">
                      <p><strong>{app.firstName} {app.lastName}</strong> applied for <strong>{app.jobTitle}</strong></p>
                      <p className="text-sm text-gray-500">{app.appliedAt}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">User Management</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {users.length === 0 ? (
                <p className="p-4 text-gray-500">No users found.</p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {users.map((user) => (
                    <li key={user.userId} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <span className={`inline-block px-2 py-1 mt-1 rounded-full text-xs ${
                            user.role === "applicant"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}>
                            {user.role}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button
                          className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center hover:bg-yellow-200"
                          title="Block (not implemented)"
                        >
                          <span className="material-symbols-outlined text-sm text-yellow-600">block</span>
                        </button>
                        <button
                          onClick={() => handleDelete(user.userId)}
                          className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200"
                        >
                          <span className="material-symbols-outlined text-sm text-red-600">delete</span>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">User Activity Overview</h2>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <Chart options={chartData.options} series={chartData.series} type="bar" height={300} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, count, color }) => (
  <div className={`bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow`}>
    <h3 className="text-xl font-bold text-gray-900 mb-1">{count}</h3>
    <p className={`text-sm text-${color}-600`}>{label}</p>
  </div>
);

export default AdminDash;
