
import React from 'react';

function Login() {
  return (
   <div>
 
  {/* login section start */}
  <section className="login-wrapper">
    <div className="container">
      <div className="col-md-6 col-sm-8 col-md-offset-3 col-sm-offset-2">
        <form>
          <img className="img-responsive" alt="logo" src="img/logo.png" />
          <input type="email" className="form-control input-lg" placeholder="Email" />
          <input type="password" className="form-control input-lg" placeholder="Password" />
          <label><a href>Forget Password?</a></label>
          <button type="submit" className="btn btn-primary">Login</button>
          <p>Don't have an Account? <a href="/register">Create An Account</a></p>
        </form>
      </div>
    </div>
  </section>
  {/* login section End */}	
  
</div>

  );
}

export default Login;
