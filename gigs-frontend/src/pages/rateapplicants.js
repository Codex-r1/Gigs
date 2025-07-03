import React, { useState } from "react";
import "../styles/rate.css"; // Assuming you have a CSS file for styles
const RateApplicant = () => {
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [recommended, setRecommended] = useState(null); // true for thumbs up, false for thumbs down, null for unselected

  // Mock applicant data for demo
  const applicant = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com"
  };

  // Submit rating
  const handleSubmit = async () => {
    if (score === 0) {
      alert("Please select a score before submitting");
      return;
    }
    
    if (recommended === null) {
      alert("Please select whether you recommend this applicant");
      return;
    }
    
    console.log("Submitting rating:", {
      applicantId: "11",
      feedback,
      score,
      recommended,
    });
    
    alert("Rating submitted successfully");
    // Reset form
    setFeedback("");
    setScore(0);
    setRecommended(null);
  };

  // Recommendation component
  const RecommendationButtons = () => {
    return (
      <div className="flex items-center space-x-4">
        <button
          type="button"
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
            recommended === true
              ? 'bg-green-50 border-green-500 text-green-700'
              : 'bg-white border-gray-300 text-gray-600 hover:border-green-300 hover:bg-green-50'
          }`}
          onClick={() => setRecommended(true)}
        >
          <span className="text-2xl">👍</span>
          <span className="font-medium">Recommend</span>
        </button>
        
        <button
          type="button"
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
            recommended === false
              ? 'bg-red-50 border-red-500 text-red-700'
              : 'bg-white border-gray-300 text-gray-600 hover:border-red-300 hover:bg-red-50'
          }`}
          onClick={() => setRecommended(false)}
        >
          <span className="text-2xl">👎</span>
          <span className="font-medium">Not Recommend</span>
        </button>
      </div>
    );
  };
  const StarRating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          className={`text-3xl transition-colors duration-200 ${
            i <= (hoveredStar || score) 
              ? 'text-yellow-400 hover:text-yellow-500' 
              : 'text-gray-300 hover:text-gray-400'
          }`}
          onClick={() => setScore(i)}
          onMouseEnter={() => setHoveredStar(i)}
          onMouseLeave={() => setHoveredStar(0)}
        >
          ★
        </button>
      );
    }
    return (
      <div className="flex items-center space-x-1">
        {stars}
        <span className="ml-3 text-sm text-gray-600">
          {score > 0 ? `${score}/5` : "Select a score"}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Rate Applicant</h1>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-semibold text-indigo-600">
                  {applicant.firstName[0]}{applicant.lastName[0]}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {applicant.firstName} {applicant.lastName}
                </h2>
                <p className="text-gray-600">{applicant.email}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Recommendation
              </label>
              <RecommendationButtons />
              <p className="text-xs text-gray-500 mt-2">
                {recommended === true ? "You recommend this applicant" : 
                 recommended === false ? "You do not recommend this applicant" : 
                 "Select whether you recommend this applicant"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Score
              </label>
              <StarRating />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feedback
              </label>
              <textarea
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write your feedback here..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              />
            </div>

            <div className="text-right">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateApplicant;