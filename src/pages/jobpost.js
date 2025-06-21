import React, { useState } from "react";
import "../styles/post.css";

const JobPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    specific_location: "",
    description: "",
    salary: "",
    skill: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          location: `${formData.location}, ${formData.specific_location}`,
          category: formData.category,
          salary: formData.salary,
          skill: formData.skill
        })
      });

      const data = await response.json();
      if (response.ok) {
        alert("Job posted successfully!");
        setFormData({
          title: "",
          category: "",
          location: "",
          specific_location: "",
          description: "",
          salary: "",
          skill: ""
        });
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting job:", error);
      alert("Failed to post job. Please try again later.");
    }
  };

  return (
    <div id="webcrumbs">
      <div className="w-full max-w-4xl mx-auto p-6 bg-white">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Post a New Job</h1>
          <p className="text-gray-600">Fill out the details below to connect with local workers.</p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="material-symbols-outlined mr-2">work</span>
              Job Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Job Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. House Cleaning"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select Job Category</option>
                  <option>Delivery</option>
                  <option>Cleaning</option>
                  <option>Gardening</option>
                  <option>Construction</option>
                  <option>Hair & Beauty</option>
                  <option>Cooking/Catering</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Salary (KES)</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. 800"
                  min={300}
                  max={10000}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Skill Level</label>
                <select
  name="skill"
  value={formData.skill}
  onChange={handleChange}
  required
>
  <option value="">Select Skill Level</option>
  <option value="1">Beginner</option>
  <option value="2">Intermediate</option>
  <option value="3">Experienced</option>
  <option value="4">Expert</option>
</select>

              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="material-symbols-outlined mr-2">location_on</span>
              Location
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">City/Town *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Nairobi"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Specific Location</label>
                <input
                  type="text"
                  name="specific_location"
                  value={formData.specific_location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. CBD"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="material-symbols-outlined mr-2">description</span>
              Description
            </h2>

            <div>
              <label className="block text-sm font-medium mb-2">Job Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
                placeholder="What does the job involve?"
                required
              />
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobPostForm;
