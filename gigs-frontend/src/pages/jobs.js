import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/style.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    payRanges: [],
    categories: [],
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationMessage, setApplicationMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, filters]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to fetch jobs. Please try again later.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const applyToJob = async () => {
    try {
      const token = localStorage.getItem("token");
      setSubmitting(true);
      await axios.post(
        "http://localhost:5000/api/applications",
        {
          jobId: selectedJob.jobId,
          message: applicationMessage,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Application submitted successfully!");
      setSelectedJob(null);
      setApplicationMessage("");
    } catch (err) {
      console.error("Failed to apply:", err);
      alert("Failed to apply");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBookmark = async (jobId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/bookmarks",
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Job bookmarked!");
    } catch (err) {
      console.error("Bookmark error:", err);
      alert("Bookmarking failed");
    }
  };

  const filterJobs = () => {
    let filtered = [...jobs];

    if (filters.location.trim()) {
      filtered = filtered.filter((job) =>
        job.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.payRanges.length > 0) {
      filtered = filtered.filter((job) => {
        const pay = job.salary;
        return filters.payRanges.some((range) => {
          if (range === "below_500") return pay < 500;
          if (range === "500_to_1000") return pay >= 500 && pay <= 1000;
          if (range === "above_1000") return pay > 1000;
          return false;
        });
      });
    }

    if (filters.categories.length > 0) {
      filtered = filtered.filter((job) =>
        filters.categories.includes(job.category)
      );
    }

    setFilteredJobs(filtered);
  };

  const getUniqueCategories = () => {
    const categories = jobs.map((job) => job.category).filter(Boolean);
    return [...new Set(categories)];
  };

  const clearAllFilters = () => {
    setFilters({
      location: "",
      payRanges: [],
      categories: [],
    });
  };

  const handleLocationChange = (e) => {
    setFilters({ ...filters, location: e.target.value });
  };

  const handlePayRangeChange = (range) => {
    setFilters({
      ...filters,
      payRanges: filters.payRanges.includes(range)
        ? filters.payRanges.filter((r) => r !== range)
        : [...filters.payRanges, range],
    });
  };

  const handleCategoryChange = (category) => {
    setFilters({
      ...filters,
      categories: filters.categories.includes(category)
        ? filters.categories.filter((c) => c !== category)
        : [...filters.categories, category],
    });
  };

  if (loading) {
    return (
      <div id="webcrumbs">
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">Loading jobs...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="webcrumbs">
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <p className="text-red-500 text-lg mb-2">{error}</p>
              <button
                onClick={fetchJobs}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-800">Filters</h2>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {/* Location Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    value={filters.location}
                    onChange={handleLocationChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Pay Range Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Pay Range (KES/hr)
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: "below_500", label: "Below 500" },
                      { value: "500_to_1000", label: "500 - 1000" },
                      { value: "above_1000", label: "Above 1000" },
                    ].map((range) => (
                      <label key={range.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.payRanges.includes(range.value)}
                          onChange={() => handlePayRangeChange(range.value)}
                          className="mr-2"
                        />
                        <span className="text-sm text-slate-600">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Categories
                  </label>
                  <div className="space-y-2">
                    {getUniqueCategories().map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                          className="mr-2"
                        />
                        <span className="text-sm text-slate-600">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <main className="lg:col-span-3">
              <div className="mb-4">
                <p className="text-slate-600 text-sm">
                  Showing {filteredJobs.length} of {jobs.length} jobs
                </p>
              </div>

              {filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-500 text-lg mb-2">
                    {jobs.length === 0
                      ? "No jobs available at the moment."
                      : "No jobs found matching your criteria."}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {jobs.length === 0
                      ? "Check back later for new opportunities."
                      : "Try adjusting your filters or search terms."}
                  </p>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <div
                    key={job.jobId}
                    className="bg-white border border-slate-200 rounded-xl p-6 mb-6 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-slate-800 mb-1">
                          {job.title}
                        </h2>
                        <p className="text-slate-600 text-sm mb-2">{job.location}</p>
                        <p className="text-slate-700 mb-3">{job.description}</p>

                        {/* Skill badges */}
                            {job.skillsRequired && (
  <div className="mb-3">
    <p className="text-sm font-medium text-slate-700 mb-1">Skills Required:</p>
    <div className="flex flex-wrap gap-2">
      {job.skillsRequired.split(',').map((skill, idx) => (
        <span
          key={idx}
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
        >
          {skill.trim()}
        </span>
      ))}
    </div>
  </div>
)}


                        <div className="flex items-center gap-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {job.category}
                          </span>
                          <p className="text-green-600 text-sm font-medium">
                            KES {job.salary}/hr
                          </p>
                        </div>
                      </div>

                      {role === "applicant" && (
                        <div className="flex flex-col gap-2 sm:items-end">
                          <Link to={`/apply/${job.jobId}`}>
                            <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                              Apply
                            </button>
                          </Link>
                          <button
                            onClick={() => handleBookmark(job.jobId)}
                            className="text-sm text-blue-500 hover:text-blue-700 transition-colors"
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

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
              onClick={() => setSelectedJob(null)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-slate-800">
              Apply to: {selectedJob.title}
            </h2>
            <textarea
              rows={5}
              placeholder="Why are you a good fit for this job?"
              value={applicationMessage}
              onChange={(e) => setApplicationMessage(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={applyToJob}
              disabled={submitting || applicationMessage.trim() === ""}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;