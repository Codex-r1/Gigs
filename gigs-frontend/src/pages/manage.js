import React, { useState } from 'react';

const Rate = ({ applicantId }) => {
  const [score, setScore] = useState('');
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // To disable button during submission
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleRatingSubmit = async () => {
    if (!score) {
      setMessage("Please select a score before submitting.");
      setMessageType('error');
      return;
    }

    setIsSubmitting(true); // Disable button
    setMessageType(''); // Clear previous message type
    setMessage(''); // Clear previous message

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ applicantId, score, feedback })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Rating submitted successfully!');
        setMessageType('success');
        setScore('');
        setFeedback('');
      } else {
        setMessage(data.error || 'Failed to submit rating. Please try again.');
        setMessageType('error');
      }
    } catch (err) {
      console.error("Error submitting rating:", err);
      setMessage('Server error. Please check your connection and try again.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  // Determine message text color based on messageType
  const messageColorClass = messageType === 'success' ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-sm mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Rate Applicant Performance</h2>

      <div className="mb-4">
        <label htmlFor="score" className="block text-gray-700 text-sm font-medium mb-2">
          Select Rating:
        </label>
        <select
          id="score"
          className="block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-gray-800"
          value={score}
          onChange={(e) => setScore(parseInt(e.target.value))}
        >
          <option value="">-- Choose a score --</option>
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="feedback" className="block text-gray-700 text-sm font-medium mb-2">
          Optional Feedback:
        </label>
        <textarea
          id="feedback"
          className="block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-gray-800 resize-y"
          rows="4" // Increased rows for more space
          placeholder="e.g., 'Completed the task quickly and efficiently.'"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>
      </div>

      <button
        onClick={handleRatingSubmit}
        className={`w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out
          ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isSubmitting} // Disable when submitting
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </>
        ) : (
          'Submit Rating'
        )}
      </button>

      {message && (
        <p className={`mt-4 text-center text-sm ${messageColorClass}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Rate;