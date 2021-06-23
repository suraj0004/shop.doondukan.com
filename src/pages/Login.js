import React, { Component } from "react";
import auth from "../services/AuthService";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import UrlService from "../services/UrlService";
import  { Redirect } from 'react-router-dom'
const Loader = () => {
  return <ClipLoader loading color="#0069d9" />;
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      password: "",
      remember: false,
      error: "",
      isLoader: true,
      showPassword: false,
      mobileForResetPassword: "",
      resetPasswordMessage: "",
      displayClass:"d-none",
      buttonText:"Send Otp",
      disabledButton:false,
      otp:"",
      newpassword:"",
      c_password:"",
      displayInputClass:"d-none pt-1"
    };
  }

  componentDidMount() {
    this.setState({
      isLoader: false,
    });
  }

  handleMobileChange = (event) => {
    this.setState({
      mobile: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleRememberMeChange = (event) => {
    this.setState((prevState) => ({
      remember: !prevState.remember,
    }));
  };

  handleMobile = (event) => {
    this.setState({
      mobileForResetPassword: event.target.value,
    });
  };

  handleOtp = (event) => {
    this.setState({
      otp: event.target.value,
    });
  };

  handleNewPasswordChange = (event) => {
    this.setState({
      newpassword: event.target.value,
    });
  };
  handleConfirmPasswordChange = (event) => {
    this.setState({
      c_password: event.target.value,
    });
  };
  
  sendOtp = (event) => {
    var mobile = document.getElementById("reset_mobile");
    this.setState({
      buttonText:"Sending....",
      disabledButton:true
    });
    var message = "";
    if(mobile.value === ""){
      message = "Please Enter Mobile Number";
    }
    if(isNaN(mobile.value) || mobile.value.length < 10 || mobile.value.length > 10) {
      message = "Please Enter Valid Mobile Number";
      console.log("asdas");
    }
    if(message !=="" ) {
      this.setState({
        resetPasswordMessage: message,
        displayClass:"alert alert-danger",
        buttonText:"Send Otp",
        disabledButton:false
      });
      return false;
    } else {
      this.setState({
        displayClass:"d-none"
      });
    }
    const postData = {
          mobile: this.state.mobileForResetPassword,
          type: "forget_password",
        };
    try {
      axios
        .post(UrlService.sendOtp(), postData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.setState({
              resetPasswordMessage: response.data.message,
              displayClass:"alert alert-success",
              buttonText:"Resend",
              disabledButton:false,
              displayInputClass: ""
            });
            document.getElementById("submitresetform").style.display ="block";
          } else {
            this.setState({
              resetPasswordMessage: response.data.message,
              displayClass:"alert alert-danger",
              buttonText:"Send Otp",
              disabledButton:false
            });
          }
        })
        .catch((error) => {
          this.setState({
              resetPasswordMessage: error.message,
              displayClass:"alert alert-danger",
              buttonText:"Send Otp",
              disabledButton:false
            });
        })
        .finally(() => {
          
        });
    } catch (error) {
      this.setState({
        resetPasswordMessage: error.message,
        displayClass:"alert alert-danger",
        buttonText:"Send Otp",
        disabledButton:false
      });
    }
  };

  handlePasswordReset = (event) => {
    event.preventDefault();
    var mobile = document.getElementById("reset_mobile");
    this.setState({
      disabledButton:true
    });
    var message = "";
    if(mobile.value === ""){
      message = "Please Enter Mobile Number";
    }
    if(isNaN(mobile.value) || mobile.value.length < 10 || mobile.value.length > 10) {
      message = "Please Enter Valid Mobile Number";
    }
    if(this.state.newpassword !== this.state.c_password){
      message = "Confirm Password did not match";
    }
    if(this.state.newpassword === ""){
      message = "Password Is Required";
    }
    if(this.state.c_password === "") {
      message = "Confirm Password Is Required";
    }
    if(this.state.otp === "") {
      message = "OTP Is Required";
    }
    if(message !=="" ) {
      this.setState({
        resetPasswordMessage: message,
        displayClass:"alert alert-danger",
      });
      return false;
    } else {
      this.setState({
        displayClass:"d-none"
      });
    }
    const postData = {
          mobile: this.state.mobileForResetPassword,
          otp: this.state.otp,
          password:this.state.newpassword,
          password_confirmation:this.state.c_password
        };
    try {
      axios
        .post(UrlService.resetPassword(), postData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.setState({
              resetPasswordMessage: response.data.message,
              displayClass:"alert alert-success",
              disabledButton:false,
              displayInputClass: "d-none"
            });
            document.getElementById("otpdiv").style.display ="none";
            document.getElementById("submitresetform").style.display ="none";
            setTimeout(() => {
              window.location.reload();
            }, 250);
          } else {
            this.setState({
              resetPasswordMessage: response.data.message,
              displayClass:"alert alert-danger",
              disabledButton:false
            });
          }
        })
        .catch((error) => {
          this.setState({
              resetPasswordMessage: error.message,
              displayClass:"alert alert-danger",
              disabledButton:false
            });
        })
        .finally(() => {
          
        });
    } catch (error) {
      this.setState({
        resetPasswordMessage: error.message,
        displayClass:"alert alert-danger",
        disabledButton:false
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState(
      {
        isLoader: true,
      },
      () => {
        const postData = {
          phone: this.state.mobile,
          password: this.state.password,
        };

        auth.login(postData, (response) => {
          console.log(response);
          if (response.success) {
            auth.afterLogin(response, this.state.remember);
            this.props.history.push("/");
          } else {
            this.setState({
              error: response.message,
              isLoader: false,
            });
          }
        });
      }
    );
  };

  setShowPassword = () => {
    this.setState((state) => ({
      showPassword: !state.showPassword,
    }));
  };

  render() {
    const { mobile, password, remember,mobileForResetPassword,otp,newpassword,c_password } = this.state;

    return (
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="login-logo">
            <a href="/">
              <b>Doon</b>Dukan
            </a>
          </div>

          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">
                Sign in to start managing your orders
              </p>

              <p className="text-danger text-left"> {this.state.error} </p>

              <form onSubmit={this.handleSubmit} >
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mobile"
                    value={mobile}
                    onChange={this.handleMobileChange}
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
                    type={this.state.showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={this.handlePasswordChange}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text cursor-pointer">
                      <button
                        type="button"
                        className="password-eye-btn"
                        onClick={this.setShowPassword}
                      >
                        {this.state.showPassword ? (
                          <i class="fas fa-eye-slash"></i>
                        ) : (
                          <i className="fas fa-eye"></i>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <div className="icheck-primary">
                      <input
                        type="checkbox"
                        id="remember"
                        checked={remember}
                        onChange={this.handleRememberMeChange}
                      />
                      <label htmlFor="remember" className="pl-1">Remember Me</label>
                    </div>
                  </div>

                  <div className="col-4">
                    {/* <button type="button" className="btn btn-primary btn-block" onClick={ () => {
                auth.login( () => {
                    this.props.history.push('/');
                } );
            } } >Sign In</button> */}
                  </div>
                </div>

                <div className="row mt-3 mb-3">
                  <div className="col-12 text-center">
                    {this.state.isLoader ? (
                      <Loader />
                    ) : (
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Sign In
                      </button>
                    )}
                    <button type="button" className="btn btn-info btn-block" data-toggle="modal" data-target="#myModal">Forgot Password</button>
                  </div>
                </div>
              </form>

              <div className="social-auth-links text-center mb-3">
                <p>- OR -</p>
                {/* <a href="/" className="btn btn-block btn-danger">
          <i className="fa fa-lock mr-2"></i> I forgot my password
        </a> */}
                <Link to="/sign-up" className="btn btn-block btn-success">
                  <i className="fa fa-user mr-2"></i> Register a new membership
                </Link>
                <div id="myModal" className="modal fade" role="dialog">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                      <h5 className="modal-title">Reset Password</h5>
                      </div>
                      <form method ="POST"onSubmit={this.handlePasswordReset} id="resetPasswordForm">
                      <div className="modal-body">
                      <div className={this.state.displayClass}>
                        {this.state.resetPasswordMessage}
                      </div>
                      <div className="row" id="otpdiv">
                        <div className="col-md-8">
                          <input type="text" name="reset_mobile" className="form-control"
                            placeholder="Enter Mobile Number" id="reset_mobile"
                            value={mobileForResetPassword}
                            onChange={this.handleMobile}
                            required/>
                        </div>
                        <div className="col-md-4">
                          <button type="button" className="btn btn-outline-primary" disabled={this.state.disabledButton ? "disabled" : ""} onClick={this.sendOtp}> {this.state.buttonText} </button>
                        </div>
                        </div>
                        <div className={this.state.displayInputClass}>
                          <div className="row pt-1">
                              <div className="col-md-8">
                                <input type="text" name="otp" className="form-control"
                                  placeholder="Enter OTP" id="otp"
                                  value={otp}
                                  onChange={this.handleOtp}
                                  required/>
                              </div>
                          </div>
                          <div className="row pt-1">
                              <div className="col-md-8">
                                <input type="password" name="newpassword" className="form-control"
                                  placeholder="Enter New Password"
                                  value={newpassword}
                                  onChange={this.handleNewPasswordChange}
                                  required/>
                              </div>
                          </div>
                          <div className="row pt-1">
                              <div className="col-md-8">
                                <input type="password" name="password" className="form-control"
                                  placeholder="Confirm Password"
                                  value={c_password}
                                  onChange={this.handleConfirmPasswordChange}
                                  required/>
                              </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                      <button type="submit" className="btn btn-success" id="submitresetform"style={{display: "none"}} disabled={this.state.disabledButton ? "disabled" : ""} >Save</button>
                      <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                      </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
