import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import "../styles/style.css"

const Jobs = () => {
  const [Jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };
  const applyToJob = async (jobId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post("http://localhost:5000/api/applications", { job_id: jobId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Applied successfully!");
  } catch (err) {
    console.error("Failed to apply:", err.response?.data || err.message);
    alert(err.response?.data?.error || "Failed to apply.");
  }
};

    return (
        <div id="webcrumbs">
            <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <header className="mb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-4xl font-bold text-slate-800 mb-2">Browse Informal Job Listings</h1>
                                <p className="text-slate-600">View opportunities posted by local employers for casual and short-term work</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="e.g. Mason, Tailor, Driver..."
                                        className="w-full sm:w-80 pl-10 pr-4 py-3 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                                    />
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                                        search
                                    </span>
                                </div>
                                <button className="px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2">
                                    <span className="material-symbols-outlined">filter_list</span>
                                    Filters
                                </button>
                            </div>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <aside className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-6">
                                <h3 className="text-lg font-semibold text-slate-800 mb-4">Filter Listings</h3>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-medium text-slate-700 mb-3">Job Type</h4>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500"
                                                />
                                                <span className="text-slate-600">One-Time</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500"
                                                />
                                                <span className="text-slate-600">Full-time</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500"
                                                />
                                                <span className="text-slate-600">Remote</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500"
                                                />
                                                <span className="text-slate-600">On-call</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500"
                                                />
                                                <span className="text-slate-600">Temporary</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-medium text-slate-700 mb-3">Location</h4>
                                        <input
                                            type="text"
                                            placeholder="e.g. Kibera, Mathare, Githurai"
                                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <h4 className="font-medium text-slate-700 mb-3">Pay Range (KES/h)</h4>
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500"
                                                />
                                                <span className="text-slate-600">Below 500</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500"
                                                />
                                                <span className="text-slate-600">500 - 1000</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500"
                                                />
                                                <span className="text-slate-600">Above 1000</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        <main className="lg:col-span-3">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                                <p className="text-slate-600">Showing latest informal jobs in your area</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-600 text-sm">Sort by:</span>
                                    <select className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                                        <option>Most Recent</option>
                                        <option>Highest Pay</option>
                                        <option>Nearest Location</option>
                                    </select>
                                </div>
                            </div>

                           <div className="grid gap-6">
  {Jobs.length === 0 ? (
    <p className="text-slate-500 text-center">No jobs found.</p>
  ) : (
    Jobs.map((job) => (
      <div
        key={job.job_id}
        className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-1">{job.title}</h2>
            <p className="text-slate-600 text-sm mb-1">{job.location}</p>
            <p className="text-slate-700">{job.description}</p>
            <p className="text-indigo-600 text-sm mt-2">{job.category}</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <button
  className="mt-4 px-4 py-2 bg-indigo-600 text-black rounded hover:bg-indigo-700"
  onClick={() => applyToJob(job.job_id)}
>
  Apply
</button>

            <button
              className="text-sm text-slate-500 hover:text-slate-700"
              onClick={() => alert(`Bookmarking job ID ${job.job_id}`)}
            >
              Bookmark
            </button>
          </div>
        </div>
      </div>
    ))
  )}
</div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-12 gap-4">
                                <p className="text-slate-600">Showing 1-10 results</p>
                                <div className="flex items-center gap-2">
                                    <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                                        Previous
                                    </button>
                                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                                        1
                                    </button>
                                    <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                                        2
                                    </button>
                                    <span className="px-2 text-slate-400">...</span>
                                    <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
