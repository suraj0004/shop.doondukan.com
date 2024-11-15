import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import auth from "../services/AuthService";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import PageHeader from "../components/PageHeader";
import PageLoader from "../components/PageLoader";
import { ToastContainer } from "react-toastify";
import { handleSession } from "../helpers/Helpers";

class RetailLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoader: false,
      intervalId: null,
    };
  }

  handleLogout = () => {
    this.setState(
      {
        isLoader: true,
      },
      () => {
        auth.logout((success) => {
          if (success) {
            auth.afterLogout();
            this.props.history.push("/login");
          } else {
            alert("Opps! something went wrong.");
            this.setState({
              isLoader: false,
            });
          }
        });
      }
    );
  };

  componentDidMount() {
    var intervalId = setInterval(handleSession, 1800000); // every 30 min
    // store intervalId in the state so it can be accessed later:
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }

  render() {
    return (
      <div className="wrapper">
        {this.state.isLoader ? (
          <div className="hold-transition login-page">
            {" "}
            <PageLoader error="" />{" "}
          </div>
        ) : (
          <React.Fragment>
            <Header handleLogout={this.handleLogout} />
            <Sidebar pathname={this.props.pathname} />
            <div className="content-wrapper">
              <PageHeader page={this.props.page} history={this.props.history} />
              <section className="content">
                <div className="row">
                  <div className="col-12">{this.props.children}</div>
                </div>
              </section>
            </div>
            <Footer />
            <ToastContainer />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(RetailLayout);
