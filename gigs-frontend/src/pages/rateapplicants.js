import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RateApplicant = () => {
  const { applicantId } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/applicants/${applicantId}`);
        setApplicant(res.data);
      } catch (err) {
        console.error("Failed to fetch applicant:", err);
      }
    };

    fetchApplicant();
  }, [applicantId]);

  const submitRating = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/ratings", {
        applicantId,
        feedback,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Feedback submitted!");
    } catch (err) {
      console.error("Rating submission failed:", err);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Rate Applicant</h2>
      {applicant ? (
        <>
          <p><strong>Name:</strong> {applicant.firstName} {applicant.lastName}</p>
          <p><strong>Email:</strong> {applicant.email}</p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write feedback..."
            className="w-full border p-3 mt-4 rounded"
            rows={5}
          />
          <button
            onClick={submitRating}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Submit Rating
          </button>
        </>
      ) : (
        <p>Loading applicant...</p>
      )}
    </div>
  );
};

export default RateApplicant;
