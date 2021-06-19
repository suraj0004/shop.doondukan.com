import React, { useState } from "react";
import axios from "axios";
import auth from "../services/AuthService";
import UrlService from "../services/UrlService";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Modal } from "react-bootstrap";

const Loader = () => {
  return <ClipLoader loading color="#0069d9" />;
};

const Signup = (props) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    c_password: "",
    otp: "",
  });
  const [error, setError] = useState("");
  const [lat, setlat] = useState("");
  const [lng, setlng] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpModal, setOtpModal] = useState(false);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  const handleLocation = (e) => {
    if (navigator.geolocation) {
      if (e.target.checked) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      }
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };
  const showPosition = (position) => {
    setError("");
    setlat(position.coords.latitude);
    setlng(position.coords.longitude);
  };
  const showError = (error) => {
    document.getElementById("locationId").checked = false;
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError("Please Allow Location Permission");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setError("The request to get user location timed out.Try again.");
        break;
      case error.UNKNOWN_ERROR:
        setError("An unknown error occurred.Please try again.");
        break;
      default:
        console.log("default");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      var location;
      var userPostData;
      location = {
        lat: lat,
        lng: lng,
      };
      userPostData = {
        ...userData,
        ...location,
      };
      axios
        .post(UrlService.signUpUrl(), userPostData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("response");
          console.log(response);
          if (response.data.success) {
            auth.afterLogin(response.data, false);
            setTimeout(() => {
              props.history.push("/profile");
            }, 250);
          } else {
            setError(response.data.message);
            console.log(response);

            if(!response.data.otp_error){
              setOtpModal(false);
            }
          }
        })
        .catch((error) => {
          setError(error.message);
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      setError(error.message);
      console.log(error);
      setLoading(false);
    }
  };

  const sendOTP = () => {
    setError("")
    if(!userData.name){
      setError("Name is required");
      return;
    }
    if(!userData.email){
      setError("Email is required");
      return;
    }
    if(!userData.phone){
      setError("Phone is required");
      return;
    }  
    if(!userData.password){
      setError("Password is required");
      return;
    } 
     if(!userData.c_password){
      setError("Confirm Password is required");
      return;
    } 
    if(userData.password !== userData.c_password){
      setError("Confirm Password not match");
      return;
    }  
    if(!lat || !lng){
      setError("Please Allow Location");
      return;
    }
    setLoading(true);
    const payload = {
      mobile : userData.phone,
      type:"sign_up_otp"
    } 
    axios
    .post(UrlService.sendOtp(), payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if(response.data.success){
        setUserData({ ...userData, otp: '' });
        setOtpModal(true)
      }else{
        setError(response.data.message);
      }
    })
    .catch((error) => {
      setError(error.message);
      console.log(error);
    })
    .finally(() => {
      setLoading(false);
    });
  }
  return (
    <div className="register-page">
      <div className="register-box">
        <div className="register-logo">
          <a href="/">
            <b>Doon</b>Dukan
          </a>
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Welcome to DoonDukan</p>
            <p className="text-danger text-left"> {error} </p>
            <form method="POST" onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full name"
                  name="name"
                  value={userData.name}
                  onChange={handleInput}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user"></span>
                  </div>
                </div>
              </div>
              <small className="i">
                *Email required for order notification
              </small>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={userData.email}
                  onChange={handleInput}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>

              <small className="i">
                *Mobile required for order notification
              </small>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mobile Number"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInput}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={userData.password}
                  onChange={handleInput}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text cursor-pointer">
                    <button
                      type="button"
                      className="password-eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <i class="fas fa-eye-slash"></i>
                      ) : (
                        <i className="fas fa-eye"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  value={userData.c_password}
                  className="form-control"
                  placeholder="Retype password"
                  name="c_password"
                  onChange={handleInput}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <input
                  type="checkbox"
                  name="location"
                  onClick={handleLocation}
                  id="locationId"
                  required
                />
                <input type="hidden" value={lat} name="lat" id="lat" />
                <input type="hidden" value={lng} name="lng" id="lng" />
                <label className="pl-1 cursor-pointer" htmlFor="locationId">
                  Allow Location Permission
                </label>
              </div>
              <div className="row">
                <div className="col-12 text-center">
                  {loading ? (
                    <Loader />
                  ) : (
                    <button
                      type="button"
                      onClick={sendOTP}
                      className="btn btn-primary btn-block"
                    >
                      Sign Up
                    </button>
                  )}
                </div>
              </div>
              <Modal
                show={otpModal}
                onHide={() => setOtpModal(false)}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>OTP Verification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p className="text-danger text-left"> {error} </p>
                  <div>
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Enter OTP"
                      name="otp"
                      value={userData.otp}
                      onChange={handleInput}
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button type="button" onClick={handleSubmit} className="btn btn-primary btn-block">
                    Confirm OTP
                  </button>
                </Modal.Footer>
              </Modal>
            </form>
            <div className="social-auth-links text-center">
              <p>- OR -</p>
              <Link to="/login" className="btn btn-block btn-success">
                <i className="mr-2"></i>
                Already have an account? Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
