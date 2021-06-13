import React, { Component } from "react";
import auth from "../services/AuthService";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

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
    const { mobile, password, remember } = this.state;

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

              <form onSubmit={this.handleSubmit}>
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
                      <label htmlFor="remember">Remember Me</label>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
