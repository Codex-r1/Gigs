import React from "react";

 
 function Header() {
   return (
  <div>
 <section
  className="main-banner"
  style={{
    background: '#242c36 url(img/pex.jpg) no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="container">
    <div className="caption text-white text-center">
      <h2> Build Your Future</h2>
      <form>
        <fieldset className="row">
          <div className="col-md-4 col-sm-4 no-pad">
            <input
              type="text"
              className="form-control border-right"
              placeholder="e.g. Plumber, Hairdresser, Tutor"
            />
          </div>
          <div className="col-md-3 col-sm-3 no-pad">
            <select className="form-control border-right">
              <option>Experience Level</option>
              <option>Beginner</option>
              <option>1-2 Years</option>
              <option>3-5 Years</option>
              <option>6+ Years</option>
            </select>
          </div>
          <div className="col-md-3 col-sm-3 no-pad">
            <select className="form-control">
              <option>Select Skill Category</option>
              <option>Handyman Services</option>
              <option>Beauty & Hair</option>
              <option>Tutoring</option>
              <option>Delivery & Errands</option>
              <option>Event Help</option>
            </select>
          </div>
          <div className="col-md-2 col-sm-2 no-pad">
            <input
              type="submit"
              className="btn seub-btn btn-block"
              value="Search"
            />
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</section>

</div>
   );
 }
 
 export default Header;
 