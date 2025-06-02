import React from "react";
 
 function Companies() {
   return (
    <div>
  <section className="inner-banner" style={{backend: '#242c36 url(https://via.placeholder.com/1920x600)no-repeat'}}>
    <div className="container">
      <div className="caption">
        <h2>Get your jobs</h2>
        <p>Get your Popular jobs <span>202 New job</span></p>
      </div>
    </div>
  </section>
  <section className="jobs">
    <div className="container">
      <div className="row heading">
        <h2>Find Popular Jobs</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
      </div>
      <div className="companies">
        <div className="company-list">
          <div className="row">
            <div className="col-md-2 col-sm-2">
              <div className="company-logo">
                <img src="img/google.png" className="img-responsive" alt="" />
              </div>
            </div>
            <div className="col-md-10 col-sm-10">
              <div className="company-content">
                <h3>IOS Developer<span className="full-time">Full Time</span></h3>
                <p><span className="company-name"><i className="fa fa-briefcase" />Google</span><span className="company-location"><i className="fa fa-map-marker" /> 07th Avenue, New York, NY, United States</span><span className="package"><i className="fa fa-money" />$22,000-$50,000</span></p>
              </div>
            </div>
          </div>
        </div>
        <div className="company-list">
          <div className="row">
            <div className="col-md-2 col-sm-2">
              <div className="company-logo">
                <img src="img/microsoft.png" className="img-responsive" alt="" />
              </div>
            </div>
            <div className="col-md-10 col-sm-10">
              <div className="company-content">
                <h3>Back-End developer<span className="part-time">Part Time</span></h3>
                <p><span className="company-name"><i className="fa fa-briefcase" />Microsoft</span><span className="company-location"><i className="fa fa-map-marker" /> 7th Avenue, New York, NY, United States</span><span className="package"><i className="fa fa-money" />$20,000-$52,000</span></p>
              </div>
            </div>
          </div>
        </div>
        <div className="company-list">
          <div className="row">
            <div className="col-md-2 col-sm-2">
              <div className="company-logo">
                <img src="img/apple.png" className="img-responsive" alt="" />
              </div>
            </div>
            <div className="col-md-10 col-sm-10">
              <div className="company-content">
                <h3>UI/UX Designer<span className="freelance">Freelance</span></h3>
                <p><span className="company-name"><i className="fa fa-briefcase" />Apple</span><span className="company-location"><i className="fa fa-map-marker" /> 7th Avenue, New York, NY, United States</span><span className="package"><i className="fa fa-money" />$22,000-$50,000</span></p>
              </div>
            </div>
          </div>
        </div>
        <div className="company-list">
          <div className="row">
            <div className="col-md-2 col-sm-2">
              <div className="company-logo">
                <img src="img/wipro.png" className="img-responsive" alt="" />
              </div>
            </div>
            <div className="col-md-10 col-sm-10">
              <div className="company-content">
                <h3>IOS developer<span className="internship">Intership</span></h3>
                <p><span className="company-name"><i className="fa fa-briefcase" />Wipro</span><span className="company-location"><i className="fa fa-map-marker" /> 8th Avenue, New York, NY, United States</span><span className="package"><i className="fa fa-money" />$24,000-$52,000</span></p>
              </div>
            </div>
          </div>
        </div>
        <div className="company-list">
          <div className="row">
            <div className="col-md-2 col-sm-2">
              <div className="company-logo">
                <img src="img/twitter.png" className="img-responsive" alt="" />
              </div>
            </div>
            <div className="col-md-10 col-sm-10">
              <div className="company-content">
                <h3>Marketing Holder<span className="full-time">Full Time</span></h3>
                <p><span className="company-name"><i className="fa fa-briefcase" />Twitter</span><span className="company-location"><i className="fa fa-map-marker" /> 4th Avenue, New York, NY, United States</span><span className="package"><i className="fa fa-money" />$24,000-$48,000</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <input type="button" className="btn brows-btn" defaultValue="Brows All Jobs" />
      </div>
    </div>
  </section>
</div>

   );
 }
 
 export default Companies;
 