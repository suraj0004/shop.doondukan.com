import React, { Component } from "react";
// import Timeline from './Timeline';
import axios from "axios";
import UrlService from "../../services/UrlService";
import auth from "../../services/AuthService";
import PageLoader from "../../components/PageLoader";
import ShopSettingForm from "./ShopSettingForm";
import AccountSettingForm from "./AccountSettingForm";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoader: true,
      shop: {
        name: "",
        open_at: "",
        close_at: "",
        address: "",
        about: "",
        logo: null,
        shop_url: "",
        shopImage: "",
      },
      user: {
        name: "",
        email: "",
        mobile: "",
        c_password: "",
        password: "",
        image: null,
        userImage: "",
      },
      response: "",
      tab: "shopSettings",
    };
  }

  componentDidMount() {
    this.setState(
      {
        isLoader: true,
      },
      () => {
        axios
          .get(UrlService.profilegUrl(), {
            headers: auth.apiHeader(),
          })
          .then((res) => {
            // console.log(data);

            if (res.data.success) {
              this.setState({
                shop: {
                  name:
                    res.data.data.store && res.data.data.store.name
                      ? res.data.data.store.name
                      : "",
                  open_at:
                    res.data.data.store && res.data.data.store.open_at
                      ? res.data.data.store.open_at
                      : "",
                  close_at:
                    res.data.data.store && res.data.data.store.close_at
                      ? res.data.data.store.close_at
                      : "",
                  address:
                    res.data.data.store && res.data.data.store.address
                      ? res.data.data.store.address
                      : "",
                  about:
                    res.data.data.store && res.data.data.store.about
                      ? res.data.data.store.about
                      : "",
                  shopImage:
                    res.data.data.store && res.data.data.store.logo
                      ? res.data.data.store.logo
                      : "",
                  shop_url:
                    res.data.data.shop_url && res.data.data.shop_url
                      ? res.data.data.shop_url
                      : "",
                  logo: null,
                },
                user: {
                  name: res.data.data.name ? res.data.data.name : "",
                  email: res.data.data.email ? res.data.data.email : "",
                  mobile: res.data.data.phone ? res.data.data.phone : "",
                  password: "",
                  c_password: "",
                  userImage: res.data.data.name
                    ? res.data.data.id + "/" + res.data.data.image
                    : "",
                  image: null,
                },
                isLoader: false,
              });
            } else {
              this.setState({
                response: res.data.message,
              });
            }
          })
          .catch((err) => {
            console.log("err");
            err = err.response;
            console.log(err);
            if (err.status === 401 || err.statusText === "Unauthorized") {
              auth.afterLogout();
              this.props.history.push("/login");
            } else if (err.status === 404) {
              this.setState({
                response:
                  "Opps! Something went wrong, Please call to adminstrator at +91-8954836965",
              });
            } else {
              this.setState({
                response: err.data.message,
              });
            }
          });
      }
    );
  }

  handleTabChange = (tab) => {
    this.setState({
      tab: tab,
    });
  };

  render() {
    return this.state.isLoader ? (
      <PageLoader error={this.state.response} />
    ) : (
      <div className="row">
        <div className="col-md-2">
          {/* <Card  data = { this.state.card  } /> */}
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-header p-2">
              <ul className="nav nav-pills">
                {/* <li className="nav-item"><a onClick={() => this.handleTabChange("timeline")} className={(this.state.tab === 'timeline') ? "nav-link active" : "nav-link "} href="#timeline" data-toggle="tab">Timeline</a></li> */}
                <li className="nav-item">
                  <a
                    onClick={() => this.handleTabChange("shopSettings")}
                    className={
                      this.state.tab === "shopSettings"
                        ? "nav-link active"
                        : "nav-link "
                    }
                    href="#shopSettings"
                    data-toggle="tab"
                  >
                    Shop Settings
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    onClick={() => this.handleTabChange("accountSettings")}
                    className={
                      this.state.tab === "accountSettings"
                        ? "nav-link active"
                        : "nav-link "
                    }
                    href="#accountSettings"
                    data-toggle="tab"
                  >
                    Account Settings
                  </a>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <div className="tab-content">
                {/* <div className={(this.state.tab === 'timeline') ? "tab-pane active" : "tab-pane "} id="timeline">
                                        <Timeline />
                                    </div> */}
                <div
                  className={
                    this.state.tab === "shopSettings"
                      ? "tab-pane active"
                      : "tab-pane "
                  }
                  id="shopSettings"
                >
                  <ShopSettingForm data={this.state.shop} />
                </div>
                <div
                  className={
                    this.state.tab === "accountSettings"
                      ? "tab-pane active"
                      : "tab-pane "
                  }
                  id="accountSettings"
                >
                  <AccountSettingForm data={this.state.user} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
