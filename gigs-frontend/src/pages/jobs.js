import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/style.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    payRanges: [],
  });

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchJobs();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  filterJobs();
}, [jobs, filters]);


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
      await axios.post(
        "http://localhost:5000/api/applications",
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Applied successfully!");
    } catch (err) {
      console.error("Failed to apply:", err);
      alert("Failed to apply");
    }
  };

  const filterJobs = () => {
    let filtered = [...jobs];

    if (filters.location.trim()) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.payRanges.length > 0) {
      filtered = filtered.filter((job) => {
        const pay = job.pay;
        return filters.payRanges.some((range) => {
          if (range === "below_500") return pay < 500;
          if (range === "500_to_1000") return pay >= 500 && pay <= 1000;
          if (range === "above_1000") return pay > 1000;
          return false;
        });
      });
    }

    setFilteredJobs(filtered);
  };

  const handlePayRangeChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prev) => {
      let newPayRanges = [...prev.payRanges];
      if (checked) {
        newPayRanges.push(value);
      } else {
        newPayRanges = newPayRanges.filter((range) => range !== value);
      }
      return { ...prev, payRanges: newPayRanges };
    });
  };

  const handleLocationChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      location: e.target.value,
    }));
  };
// Add job to bookmarks
  const handleBookmark = async (jobId) => {
    const token = localStorage.getItem("token");
    try {
      console.log("Bookmarking jobId:", jobId);

      await axios.post("http://localhost:5000/api/bookmarks", { jobId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Job bookmarked!");
    } catch (err) {
      console.error("Bookmark error:", err);
      alert("Bookmarking failed");
    }
  };
  return (
    <div id="webcrumbs">
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              Browse Informal Job Listings
            </h1>
            <p className="text-slate-600">
              View opportunities posted by local employers
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Filters</h3>

                <div className="mb-6">
                  <h4 className="font-medium text-slate-700 mb-2">Location</h4>
                  <input
                    type="text"
                    placeholder="e.g. Kibera"
                    value={filters.location}
                    onChange={handleLocationChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-primary-500"
                  />
                </div>

                <div>
                  <h4 className="font-medium text-slate-700 mb-2">Pay Range (KES/h)</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value="below_500"
                        onChange={handlePayRangeChange}
                        checked={filters.payRanges.includes("below_500")}
                        className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500"
                      />
                      Below 500
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value="500_to_1000"
                        onChange={handlePayRangeChange}
                        checked={filters.payRanges.includes("500_to_1000")}
                        className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500"
                      />
                      500 - 1000
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value="above_1000"
                        onChange={handlePayRangeChange}
                        checked={filters.payRanges.includes("above_1000")}
                        className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500"
                      />
                      Above 1000
                    </label>
                  </div>
                </div>
              </div>
            </aside>

            <main className="lg:col-span-3">
              {filteredJobs.length === 0 ? (
                <p className="text-slate-500 text-center">No jobs found.</p>
              ) : (
                filteredJobs.map((job) => (
                  <div
                    key={job.jobId}
                    className="bg-white border border-slate-200 rounded-xl p-6 mb-6 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <div>
                        <h2 className="text-xl font-semibold text-slate-800 mb-1">{job.title}</h2>
                        <p className="text-slate-600 text-sm mb-1">{job.location}</p>
                        <p className="text-slate-700">{job.description}</p>
                        <p className="text-indigo-600 text-sm mt-2">{job.category}</p>
                        <p className="text-green-600 text-sm mt-1">KES {job.pay}/hr</p>
                      </div>
                      {role === "applicant" && (
                        <div className="flex flex-col items-end gap-2">
                          <button
                            className="mt-4 px-4 py-2 bg-indigo-600 text-black rounded hover:bg-indigo-700"
                            onClick={() => applyToJob(job.jobId)}
                          >
                            Apply
                          </button>
                          <button
  onClick={() => handleBookmark(job.jobId)} // ✅ Pass jobId properly
  className="text-sm text-blue-500 hover:text-blue-700"
>
  Bookmark
</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
