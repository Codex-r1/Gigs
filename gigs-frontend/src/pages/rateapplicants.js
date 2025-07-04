import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/rate.css";

const RateApplicant = () => {
  const { applicantId } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [recommended, setRecommended] = useState(null);

    useEffect(() => {
  const fetchApplicant = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`http://localhost:5000/api/ratings/applicant/${applicantId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplicant(res.data);
    } catch (err) {
      console.error("Error fetching applicant:", err);
      console.log("Fetched applicantId:", applicantId);
    }
  };

  fetchApplicant();
}, [applicantId]);


  const handleSubmit = async () => {
  if (score === 0 || recommended === null) {
    alert("Please complete score and recommendation.");
    return;
  }

  const token = localStorage.getItem("token"); // Get JWT from localStorage

  if (!token) {
    alert("You're not logged in. Please log in again.");
    return;
  }
console.log("Submitting rating:", {
  applicantId,
  feedback,
  score,
  recommended
});

  try {
    await axios.post(
      "http://localhost:5000/api/ratings",
      {
        applicantId: applicantId,
        feedback: feedback,
        score: score,
        recommended: recommended,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Rating submitted successfully");
    setFeedback("");
    setScore(0);
    setRecommended(null);
  } catch (err) {
    console.error("Error submitting rating:", err);
    alert(err.response?.data?.error || "Failed to submit rating.");
  }
};

  if (!applicant) return <div className="text-center py-10 text-gray-600">Loading applicant data...</div>;

  return (
    <div id="webcrumbs">
      <div className="w-[800px] bg-white p-8 mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Rate Applicant</h1>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-lg">
              {applicant.firstName[0]}{applicant.lastName[0]}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{applicant.firstName} {applicant.lastName}</h2>
            <p className="text-gray-600">{applicant.email}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommendation</h3>

          <div className="flex gap-4 mb-4">
            <button 
              className={`flex items-center gap-2 px-6 py-3 border-2 rounded-lg transition-all duration-200 group ${
                recommended === true
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
              }`}
              onClick={() => setRecommended(true)}
            >
              <span className="text-2xl">👍</span>
              <span className={`font-medium ${
                recommended === true ? 'text-green-600' : 'text-gray-700 group-hover:text-green-600'
              }`}>Recommend</span>
            </button>

            <button 
              className={`flex items-center gap-2 px-6 py-3 border-2 rounded-lg transition-all duration-200 group ${
                recommended === false
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 hover:border-red-500 hover:bg-red-50'
              }`}
              onClick={() => setRecommended(false)}
            >
              <span className="text-2xl">👎</span>
              <span className={`font-medium ${
                recommended === false ? 'text-red-600' : 'text-gray-700 group-hover:text-red-600'
              }`}>Do Not Recommend</span>
            </button>
          </div>

          <p className="text-gray-600 text-sm">Select whether you recommend this applicant</p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Score</h3>

          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star}
                className="w-8 h-8 transition-all duration-200 hover:scale-110"
                onClick={() => setScore(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
              >
                <span className={`material-symbols-outlined text-3xl ${
                  star <= (hoveredStar || score) ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'
                }`}>
                  star
                </span>
              </button>
            ))}
            <span className="text-gray-600 ml-2">
              {score > 0 ? `${score}/5` : "Select a score"}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Feedback</h3>

          <textarea
            className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg resize-none focus:border-primary-500 focus:outline-none transition-colors duration-200"
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button 
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            onClick={handleSubmit}
          >
            Submit Rating
          </button>
        </div>

        {/* Next: "Add confirmation modal after submission" */}
        {/* Next: "Add rating history section" */}
        {/* Next: "Add applicant details expandable section" */}
      </div>
    </div>
  );
};

export default RateApplicant;