import React from "react";
 function Register() {
   return (
   <div>
  <section className="login-wrapper">
    <div className="container">
      <div className="col-md-6 col-sm-8 col-md-offset-3 col-sm-offset-2">
        <form>
          <img className="img-responsive" alt="logo" src="img/logo.png" />
          <input type="text" className="form-control input-lg" id="name" name="name" placeholder="Full Name" />
          <input type="email" className="form-control input-lg" placeholder="Email" />
          <input type="password" className="form-control input-lg" placeholder="Password" />
          <input type="password" className="form-control input-lg" placeholder="Confirm Password" />
          <label><a href>Forget Password?</a></label>
          <button type="submit" className="btn btn-primary">Create Account</button>
          <p>Already have an account? <a href="/login">Log In</a></p>
        </form>
      </div>
    </div>
  </section>
</div>
   );
 }
 export default Register;
 