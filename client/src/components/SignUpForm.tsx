import React from "react";
import NavBar2 from "./NavBar2";
import { Link } from "react-router-dom";
import "./SignUpForm.css";

const SignUpForm: React.FC = () => {
  return (
    <div>
      <div className="header2">
        <h2 className="slide-from-right">
          Registrate Y Disfrutá De Nuestras Ofertas{" "}
        </h2>
      </div>
      <NavBar2 />
      <div className="container-md">
        <div className="row">
          <div className="col-4">
            <form className="form ml-auto">
              <div className="header">Sign In</div>
              <div className="inputs">
                <input placeholder="Email" className="input" type="text" />
                <input
                  placeholder="Password"
                  className="input"
                  type="password"
                />
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
          <div className="col-4">
            <div className="card">
              <div className="image"></div>
              <div className="content">
                <p className="text-1">Run with the pack</p>

                <div className="text-2">
                  <span>Get 35% off</span>
                  <span>On your next order over $100</span>
                </div>

                <a className="action" href="">
                  Get Discount
                </a>

                <p className="date">Offer valid until 29th April, 2023 *</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card2">
              <div className="image2"></div>
              <div className="content2">
                <p className="text-2">Run with the pack</p>

                <div className="text-3">
                  <span>Get 35% off</span>
                  <span>On your next order over $100</span>
                </div>

                <a className="action2" href="">
                  Get Discount
                </a>

                <p className="date2">Offer valid until 29th April, 2023 *</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
