import React from "react";
import NavBar2 from "./NavBar2";
import { Link } from "react-router-dom";
import "./SignUpForm.css";

const SignUpForm: React.FC = () => {
  return (
    <div>
      <NavBar2 />
      <form className="form">
        <div className="header">Sign In</div>
        <div className="inputs">
          <input placeholder="Email" className="input" type="text" />
          <input placeholder="Password" className="input" type="password" />
          <div className="checkbox-container">
            <label className="checkbox">
              <input type="checkbox" id="checkbox" />
            </label>
            <label htmlFor="checkbox" className="checkbox-text">
              Remember me
            </label>
          </div>
          <button className="sigin-btn">Submit</button>
          <Link to="/" aria-current="page" className="forget">
            Forget password?
          </Link>
          <p className="signup-link">
            Don't have an account? <Link to="">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
