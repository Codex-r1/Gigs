 import React from 'react';
 import { Link } from 'react-router-dom';
function App() {
  return (
  <div>
  <section className="features">
    <div className="container">
      <Link to='/register'>
      <div className="col-md-4 col-sm-4">
        <div className="features-content">
          <span className="box1"><span aria-hidden="true" className="icon-dial" /></span>
          <h3>Create Your Profile</h3>
          <p>Sign up to connect with local employers and showcase your skills, experience, and availability for informal work opportunities.</p>
        </div>
      </div>
      </Link>
      <div className="col-md-4 col-sm-4">
        <div className="features-content">
          <span className="box1"><span aria-hidden="true" className="icon-search" /></span>
          <h3>Find Nearby Gigs</h3>
          <p>Browse informal jobs like cleaning, delivery, construction, and more from people and businesses near you.</p>
        </div>
      </div>
      <div className="col-md-4 col-sm-4">
        <div className="features-content">
          <span className="box1"><span aria-hidden="true" className="icon-printer" /></span>
          <h3>Apply Easily</h3>
          <p>No resume needed—just apply directly to jobs and start working faster using your profile and skill badges.</p>
        </div>
      </div>

      <div className="col-md-4 col-sm-4">
        <div className="features-content">
          <span className="box1"><span aria-hidden="true" className="icon-dial" /></span>
          <h3>Get Verified</h3>
          <p>Earn trust through skill verification, client ratings, and work history to increase your chances of getting hired.</p>
        </div>
      </div>
      <div className="col-md-4 col-sm-4">
        <div className="features-content">
          <span className="box1"><span aria-hidden="true" className="icon-search" /></span>
          <h3>Chat With Employers</h3>
          <p>Message employers directly, ask questions about the work, and arrange job details before accepting.</p>
        </div>
      </div>
      <div className="col-md-4 col-sm-4">
        <div className="features-content">
          <span className="box1"><span aria-hidden="true" className="icon-printer" /></span>
          <h3>Get Paid Quickly</h3>
          <p>Complete gigs and receive your payment securely through the platform or in cash as agreed.</p>
        </div>
      </div>
    </div>
  </section>

  <section className="counter">
    <div className="container">
      <div className="col-md-3 col-sm-3">
        <div className="counter-text">
          <span aria-hidden="true" className="icon-briefcase" />
          <h3>12,000</h3>
          <p>Gigs Available</p>
        </div>
      </div>
      <div className="col-md-3 col-sm-3">
        <div className="counter-text">
          <span className="box1"><span aria-hidden="true" className="icon-expand" /></span>
          <h3>850</h3>
          <p>Local Businesses</p>
        </div>
      </div>
      <div className="col-md-3 col-sm-3">
        <div className="counter-text">
          <span className="box1"><span aria-hidden="true" className="icon-profile-male" /></span>
          <h3>9,000+</h3>
          <p>Registered Workers</p>
        </div>
      </div>
      <div className="col-md-3 col-sm-3">
        <div className="counter-text">
          <span className="box1"><span aria-hidden="true" className="icon-sad" /></span>
          <h3>7,200+</h3>
          <p>Successful Matches</p>
        </div>
      </div>
    </div>
  </section>

  <section className="jobs">
    <div className="container">
      <div className="row heading">
        <h2>Explore Popular Gigs</h2>
        <p>Find quick, flexible informal jobs you can start today</p>
      </div>
      <div className="companies">
        <div className="company-list">
          <div className="row">
            <div className="col-md-2 col-sm-2">
              <div className="company-logo">
                <img src="img/delivery.png" className="img-responsive" alt="" />
              </div>
            </div>
            <div className="col-md-10 col-sm-10">
              <div className="company-content">
                <h3>Motorbike Delivery Rider <span className="full-time">Full Time</span></h3>
                <p><span className="company-name"><i className="fa fa-briefcase" />QuickDrop</span><span className="company-location"><i className="fa fa-map-marker" /> Kibera, Nairobi</span><span className="package"><i className="fa fa-money" />KES 800/day</span></p>
              </div>
            </div>
          </div>
        </div>
        <div className="company-list">
          <div className="row">
            <div className="col-md-2 col-sm-2">
              <div className="company-logo">
                <img src="img/cleaning.png" className="img-responsive" alt="" />
              </div>
            </div>
            <div className="col-md-10 col-sm-10">
              <div className="company-content">
                <h3>House Cleaner <span className="part-time">Part Time</span></h3>
                <p><span className="company-name"><i className="fa fa-briefcase" />Fresh Living</span><span className="company-location"><i className="fa fa-map-marker" /> Lang'ata, Nairobi</span><span className="package"><i className="fa fa-money" />KES 500/visit</span></p>
              </div>
            </div>
          </div>
        </div>
        <div className="company-list">
          <div className="row">
            <div className="col-md-2 col-sm-2">
              <div className="company-logo">
                <img src="img/construction.png" className="img-responsive" alt=""/>
              </div>
            </div>
            <div className="col-md-10 col-sm-10">
              <div className="company-content">
                <h3>Casual Construction Laborer <span className="freelance">Freelance</span></h3>
                <p><span className="company-name"><i className="fa fa-briefcase" />BuildIt Ltd.</span><span className="company-location"><i className="fa fa-map-marker" /> Eastlands, Nairobi</span><span className="package"><i className="fa fa-money" />KES 1000/day</span></p>
              </div>
            </div>
          </div>
        </div>
        <div className="company-list">
          <div className="row">
            <div className="col-md-2 col-sm-2">
              <div className="company-logo">
                <img src="img/babysitting.png" className="img-responsive" alt="" />
              </div>
            </div>
            <div className="col-md-10 col-sm-10">
              <div className="company-content">
                <h3>Babysitter <span className="internship">Weekend</span></h3>
                <p><span className="company-name"><i className="fa fa-briefcase" />Private Family</span><span className="company-location"><i className="fa fa-map-marker" /> South B, Nairobi</span><span className="package"><i className="fa fa-money" />KES 600/evening</span></p>
              </div>
            </div>
          </div>
        </div>
        <div className="company-list">
          <div className="row">
            <div className="col-md-2 col-sm-2">
              <div className="company-logo">
                <img src="img/salon.png" className="img-responsive" alt="" />
              </div>
            </div>
            <div className="col-md-10 col-sm-10">
              <div className="company-content">
                <h3>Mobile Hairdresser <span className="full-time">On Demand</span></h3>
                <p><span className="company-name"><i className="fa fa-briefcase" />GlowUp Stylists</span><span className="company-location"><i className="fa fa-map-marker" /> Roysambu, Nairobi</span><span className="package"><i className="fa fa-money" />KES 300/service</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <input type="button" className="btn brows-btn" defaultValue="Browse All Jobs" />
      </div>
    </div>
  </section>
</div>


  );
}

export default App;
