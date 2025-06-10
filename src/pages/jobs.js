import React, { useState, useEffect } from 'react';
import axios from "axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null);   // State to manage errors

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs');
        setJobs(res.data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again later.'); // Set a user-friendly error message
        // Optionally, you could set jobs to the informalJobs array as a fallback
        // setJobs(informalJobs);
      } finally {
        setLoading(false); // Set loading to false once fetching is complete (or errors out)
      }
    };

    fetchJobs();
  }, []); // The empty dependency array ensures this runs only once on mount

  // You can also use the hardcoded informalJobs array as a fallback or initial data
  // For now, let's assume you want to use the fetched data.
  // const informalJobs = [ /* ... your informalJobs array ... */ ];

  if (loading) {
    return (
      <section className="section jobs-section" style={{ backgroundColor: "#f9f9f9", padding: "60px 0" }}>
        <div className="container text-center">
          <h2>Loading Jobs...</h2>
          <p>Please wait while we fetch the latest job listings.</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section jobs-section" style={{ backgroundColor: "#f9f9f9", padding: "60px 0" }}>
        <div className="container text-center">
          <h2 className="text-danger">Error</h2>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section jobs-section" style={{ backgroundColor: "#f9f9f9", padding: "60px 0" }}>
      <div className="container">
        <div className="section-title text-center mb-5">
          <h2>Informal Job Listings</h2>
          <p>Find local gigs and short-term jobs that match your skills.</p>
        </div>
        <div className="row">
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <div className="col-md-4 mb-4" key={job._id || index}> {/* Use a unique ID if available, otherwise index */}
                <div className="card h-100 shadow-sm rounded">
                  <div className="card-body">
                    <h5 className="card-title">{job.title}</h5>
                    <h6 className="text-muted">{job.category}</h6>
                    <p className="card-text">{job.description}</p>
                    <p className="text-muted">
                      <i className="fa fa-map-marker" aria-hidden="true"></i> {job.location}
                    </p>
                    <button className="btn btn-primary btn-sm">Apply Now</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No jobs found. Check back later!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Jobs;

// If you want to use the informalJobs array as a static list instead of fetching:
/*
import React from 'react';

const informalJobs = [
  // ... your informalJobs array ...
  {
    title: "House Cleaning Help",
    category: "Domestic Work",
    description: "Looking for a trustworthy person to clean a home twice weekly.",
    location: "Kibera, Nairobi",
  },
  {
    title: "Boda Boda Delivery",
    category: "Delivery",
    description: "Deliver packages within town. Must have valid license.",
    location: "Kampala, Uganda",
  },
  {
    title: "Salon Assistant",
    category: "Beauty",
    description: "Assist with braiding and cleaning salon equipment.",
    location: "Thika Road, Nairobi",
  },
  {
    title: "Car Wash Attendant",
    category: "Automotive",
    description: "Help clean vehicles at a busy roadside station.",
    location: "Mombasa Town",
  },
  {
    title: "Gardener",
    category: "Landscaping",
    description: "Weekly gardening for small residential compounds.",
    location: "Nakuru",
  },
  {
    title: "Juice Vendor Assistant",
    category: "Food & Beverage",
    description: "Prepare and sell juice in a busy market area.",
    location: "Kariobangi, Nairobi",
  },
  {
    title: "DJ Assistant",
    category: "Entertainment",
    description: "Set up equipment and support DJ during events.",
    location: "Eldoret",
  },
  {
    title: "M-Pesa Attendant",
    category: "Retail",
    description: "Manage M-Pesa kiosk, handle customer transactions.",
    location: "Kitengela",
  },
  {
    title: "Garbage Collection Helper",
    category: "Environmental",
    description: "Assist local cleanup project on weekends.",
    location: "Githurai 45",
  },
  {
    title: "Welding Apprentice",
    category: "Skilled Labor",
    description: "Learn welding and fabrication at Juakali workshop.",
    location: "Kariobangi",
  },
  {
    title: "Phone Repair Assistant",
    category: "Technical",
    description: "Train on replacing screens and small electronics repair.",
    location: "Eastleigh",
  },
  {
    title: "Street Vendor Helper",
    category: "Sales",
    description: "Help sell fruits and drinks on the roadside.",
    location: "Machakos",
  },
  {
    title: "Construction Laborer",
    category: "Construction",
    description: "Carry materials and clean site daily.",
    location: "Kisumu",
  },
  {
    title: "Event Usher",
    category: "Event Support",
    description: "Guide guests at weddings and events, uniform provided.",
    location: "Naivasha",
  },
  {
    title: "Laundry Pickup Rider",
    category: "Delivery",
    description: "Pick and deliver laundry orders by motorbike.",
    location: "Kawangware",
  },
  {
    title: "Fruit Stall Assistant",
    category: "Retail",
    description: "Sort and serve fruits in a local stall.",
    location: "Ruaka",
  },
  {
    title: "Painter Helper",
    category: "Skilled Labor",
    description: "Mix paint and prep surfaces for painting.",
    location: "Syokimau",
  },
  {
    title: "Tailoring Apprentice",
    category: "Fashion",
    description: "Help with sewing and measuring clients.",
    location: "Kayole",
  },
  {
    title: "Butchery Assistant",
    category: "Food Processing",
    description: "Assist in cutting meat and packaging.",
    location: "Ngong",
  },
  {
    title: "Street Performer Assistant",
    category: "Entertainment",
    description: "Support with gear and collect audience donations.",
    location: "CBD Nairobi",
  },
];

function Jobs() {
  return (
    <section className="section jobs-section" style={{ backgroundColor: "#f9f9f9", padding: "60px 0" }}>
      <div className="container">
        <div className="section-title text-center mb-5">
          <h2>Informal Job Listings</h2>
          <p>Find local gigs and short-term jobs that match your skills.</p>
        </div>
        <div className="row">
          {informalJobs.map((job, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100 shadow-sm rounded">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <h6 className="text-muted">{job.category}</h6>
                  <p className="card-text">{job.description}</p>
                  <p className="text-muted">
                    <i className="fa fa-map-marker" aria-hidden="true"></i> {job.location}
                  </p>
                  <button className="btn btn-primary btn-sm">Apply Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Jobs;
*/