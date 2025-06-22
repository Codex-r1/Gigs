import { Link } from "react-router-dom";
import "../styles/about.css";

const About = () => {
  return (
    <div className="about-us">
      <div className="container">
        <div className="row">
          <div className="flex">
            <h2>About Jijenge</h2>
            <h3>
              Simplify how you find work or get tasks done, locally and flexibly.
            </h3>
            <p>
              Jijenge is designed to be your informal marketplace for connecting
              with local opportunities and skilled individuals. If you're looking
              for flexible work, or if you need quick assistance with anything from
              home repairs to creative projects, our platform helps you find the
              right match efficiently and without the typical hiring complexities.
            </p>

            <Link to="/jobs" className="btn">
              Find Gigs or Talent
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;