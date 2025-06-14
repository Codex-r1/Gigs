import React from "react"
import Chart from "react-apexcharts"
import { useState, useEffect } from "react"
import "./stylez.css"

const EmployerDash = () => {
const [stats, setStats] = useState({
    active: 0,
    pending: 0,
    totalApplications: 0
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch employer stats from backend
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/employer/dashboard', {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Error fetching dashboard stats', err);
      }
    };

    fetchStats();
  }, [token]);
  

    return (
        <div id="webcrumbs">
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Header */}
                <header className="bg-white shadow-md py-4 px-6">
                    <div className="container mx-auto flex justify-between items-center">
                        <div className="flex items-center">
                            <span className="material-symbols-outlined text-primary-600 text-2xl mr-2">work</span>
                            <h1 className="text-xl font-semibold text-gray-800">Jijenge</h1>
                        </div>
                        <nav className="hidden md:flex space-x-6 text-sm">
                            <a href="/" className="text-gray-700 hover:text-primary-600 transition duration-200">
                                Home
                            </a>
                            <a href="/jobs" className="text-gray-700 hover:text-primary-600 transition duration-200">
                                Find Jobs
                            </a>
                            <a href="jobpost" className="text-gray-700 hover:text-primary-600 transition duration-200">
                                Post Jobs
                            </a>
                            <a
                                href="/logout"
                                className="text-gray-700 hover:text-primary-600 transition duration-200 flex items-center"
                            >
                                <span className="material-symbols-outlined text-sm mr-1">logout</span>
                                Logout
                            </a>
                        </nav>
                        <button className="md:hidden text-gray-700">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-4 py-8">
                    {/* Job Postings Overview */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Job Postings Overview</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-6">
                            {/* Active Listings */}
                            <div className="lg:col-span-4 bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition duration-300">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-700">Active Listings</h3>
                                        <p className="text-3xl font-bold text-primary-600 mt-2">{stats.active}</p>

                                    </div>
                                    <span className="material-symbols-outlined text-primary-500 text-4xl bg-primary-50 p-3 rounded-full">
                                        description
                                    </span>
                                </div>
                                <div className="mt-4 text-sm text-gray-500">
                                    <span className="flex items-center">
                                        <span className="material-symbols-outlined text-green-500 text-sm mr-1">
                                            trending_up
                                        </span>
                                        12% increase from last month
                                    </span>
                                </div>
                            </div>

                            {/* Pending Approvals */}
                            <div className="lg:col-span-4 bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition duration-300">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-700">Pending Approvals</h3>
                                        <p className="text-3xl font-bold text-primary-600 mt-2">{stats.active}</p>

                                    </div>
                                    <span className="material-symbols-outlined text-amber-500 text-4xl bg-amber-50 p-3 rounded-full">
                                        pending
                                    </span>
                                </div>
                                <div className="mt-4 text-sm text-gray-500">
                                    <span className="flex items-center">
                                        <span className="material-symbols-outlined text-amber-500 text-sm mr-1">
                                            priority_high
                                        </span>
                                        8 require immediate attention
                                    </span>
                                </div>
                            </div>

                            {/* Total Applications */}
                            <div className="lg:col-span-4 bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition duration-300">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-700">Total Applications</h3>
                                       <p className="text-3xl font-bold text-primary-600 mt-2">{stats.active}</p>

                                    </div>
                                    <span className="material-symbols-outlined text-indigo-500 text-4xl bg-indigo-50 p-3 rounded-full">
                                        groups
                                    </span>
                                </div>
                                <div className="mt-4 text-sm text-gray-500">
                                    <span className="flex items-center">
                                        <span className="material-symbols-outlined text-green-500 text-sm mr-1">
                                            trending_up
                                        </span>
                                        24% increase from last month
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                            <div className="lg:col-span-8 lg:col-start-9 lg:col-end-13 flex flex-col space-y-4">
                        
                                <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg shadow-sm transition duration-200 flex items-center justify-center"  onClick={() => window.location.href='/jobpost'}>
  <span className="material-symbols-outlined mr-2">add_circle</span>
  Post New Job Listing
</button>

                                <button className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-4 rounded-lg border border-gray-200 shadow-sm transition duration-200 flex items-center justify-center">
                                    <span className="material-symbols-outlined mr-2">manage_accounts</span>
                                    Manage Applicants
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* User Management */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">User Management</h2>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                            <ul className="divide-y divide-gray-100">
                                <li className="p-4 hover:bg-gray-50 transition duration-150">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                                                <span className="text-primary-700 font-medium">JS</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">John Smith</p>
                                                <p className="text-sm text-gray-500 flex items-center">
                                                    <span className="material-symbols-outlined text-xs mr-1">work</span>
                                                    Recruiter
                                                </p>
                                            </div>
                                        </div>
                                        <button className="text-sm bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg px-4 py-2 transition duration-200">
                                            Manage
                                        </button>
                                    </div>
                                </li>
                                <li className="p-4 hover:bg-gray-50 transition duration-150">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                                                <span className="text-indigo-700 font-medium">EJ</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">Emily Johnson</p>
                                                <p className="text-sm text-gray-500 flex items-center">
                                                    <span className="material-symbols-outlined text-xs mr-1">
                                                        corporate_fare
                                                    </span>
                                                    Admin
                                                </p>
                                            </div>
                                        </div>
                                        <button className="text-sm bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg px-4 py-2 transition duration-200">
                                            Manage
                                        </button>
                                    </div>
                                </li>
                                <li className="p-4 hover:bg-gray-50 transition duration-150">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                                                <span className="text-amber-700 font-medium">MB</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">Michael Brown</p>
                                                <p className="text-sm text-gray-500 flex items-center">
                                                    <span className="material-symbols-outlined text-xs mr-1">
                                                        person
                                                    </span>
                                                    Applicant
                                                </p>
                                            </div>
                                        </div>
                                        <button className="text-sm bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg px-4 py-2 transition duration-200">
                                            Manage
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Analytics */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                            <div className="lg:col-span-6 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-medium text-gray-700 mb-4">Application Trends</h3>
                                <div className="h-64 w-full">
                                    <Chart
                                        options={{
                                            chart: {
                                                type: 'line',
                                                zoom: { enabled: false },
                                            },
                                            xaxis: {
                                                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                                            },
                                            yaxis: {
                                                title: { text: 'Number of Applications' },
                                            },
                                            colors: ['#4F46E5'],
                                        }}
                                        series={[{ name: 'Applications', data: [30, 40, 35, 50, 49, 60] }]}
                                        type="line"
                                        height="100%"
                                    />
                                </div>
                            </div>
                            <div className="lg:col-span-6 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-medium text-gray-700 mb-4">Job Categories</h3>
                                <div className="h-64 w-full">
                                    
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-200 py-6">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
                            <a
                                href="/policy"
                                className="text-sm text-gray-600 hover:text-primary-600 transition duration-200"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="/service"
                                className="text-sm text-gray-600 hover:text-primary-600 transition duration-200"
                            >
                                Terms of Service
                            </a>
                            <a
                                href="/contacts"
                                className="text-sm text-gray-600 hover:text-primary-600 transition duration-200"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}
export default EmployerDash