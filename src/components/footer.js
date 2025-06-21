import React from 'react';

function Footer() {
  return (
    <div>
      <footer>
        <div className="container">
          <div className="col-md-3 col-sm-6">
            <h4>For Task Seekers</h4>
            <ul>
              <li><a href="/jobs">View Available Jobs</a></li>
              <li><a href="/register">Set Up Your Profile</a></li>
              <li><a href="/gig-types">Types of Gigs</a></li>
              <li><a href="/FAQs">Seeker FAQs</a></li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6">
            <h4>For Task Posters</h4>
            <ul>
              <li><a href="/post">Post a New Job</a></li>
              <li><a href="/browse-providers">Browse Service Providers</a></li>
              <li><a href="/faqs-posters">Poster FAQs</a></li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6">
            <h4>Connect With Us</h4>
            <address>
              <ul>
                <li>Unit 5, Local Hub Plaza<br />Nairobi, Kenya</li>
                <li>Email: help@jijenge.com</li>
                <li>Phone: +254 11X XXX XXX</li>
                <li>Social: @JijengeKE</li>
              </ul>
            </address>
          </div>
          <div className="col-md-3 col-sm-6">
            <h4>Quick Message</h4>
            <form>
              <input type="text" className="form-control input-lg" placeholder="Your Name" />
              <input type="email" className="form-control input-lg" placeholder="Your Best Email..." />
              <textarea className="form-control" placeholder="What can we help with?" defaultValue={""} />
              <button type="submit" className="btn btn-primary">Submit Query</button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;