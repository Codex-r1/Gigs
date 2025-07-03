import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ApplyForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({});
  const [motivation, setMotivation] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/jobs/${jobId}`)
      .then(res => setJob(res.data))
      .catch(err => console.error("Error fetching job:", err));
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/applications", {
        jobId,
        motivation,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert(`Application submitted! Skill Match: ${res.data.matchPercent}%`);
      navigate("/youthdash");
    } catch (err) {
      console.error("Apply error:", err);
      alert("Application failed.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Apply to: {job.title}</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-3">
          <span className="text-gray-700">Why are you a good fit?</span>
          <textarea
            className="mt-1 block w-full border rounded p-2"
            rows={5}
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyForm;
