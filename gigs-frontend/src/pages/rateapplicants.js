import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/rate.css";

const RateApplicant = () => {
  const { applicantId } = useParams();
  console.log("applicantId from URL:", applicantId);
  console.log("Pathname:", window.location.pathname);

  const [applicant, setApplicant] = useState(null);
  const [feedback, setFeedback] = useState("");

  // Fetch applicant details
  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/applicants/${applicantId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setApplicant(res.data);
      } catch (error) {
        console.error("Error fetching applicant:", error);
      }
    };

    if (applicantId) fetchApplicant();
  }, [applicantId]);

  // Submit rating
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/ratings",
        {
          applicantId,
          feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Rating submitted successfully");
    } catch (err) {
      console.error("Failed to submit rating:", err);
      alert("Error submitting rating");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow border border-slate-200">
        <h1 className="text-2xl font-bold mb-4 text-slate-800">Rate Applicant</h1>

        {!applicant ? (
          <p>Loading applicant details...</p>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img
                src="https://via.placeholder.com/64"
                alt="Applicant"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  {applicant.firstName} {applicant.lastName}
                </h2>
                <p className="text-sm text-slate-600">{applicant.email}</p>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-slate-700 font-medium">
                Feedback
              </label>
              <textarea
                className="w-full border rounded p-3"
                rows={5}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write your feedback here..."
              />
            </div>

            <div className="text-right">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Submit Rating
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RateApplicant;
