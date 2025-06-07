import React from "react";

const informalJobs = [
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

function InformalJobsPage() {
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

export default InformalJobsPage;
