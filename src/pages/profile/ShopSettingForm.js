import React, { Component } from 'react';
import axios from 'axios';
import UrlService from '../../services/UrlService';
import auth from '../../services/AuthService';
import PageLoader from '../../components/PageLoader';
class ShopSettingForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      response : "",
      responseClass : "text-danger",
      isLoader : false,
    };
    console.log(props.data, 'shopsett');
    
  }

  handleInputChange = (event) => {
    var shop = this.state.data;

    switch (event.target.name) {
      case 'name':
        shop.name = event.target.value;
        break;
      case 'email':
        shop.email = event.target.value;
        break;
      case 'mobile':
        shop.mobile = event.target.value;
        break;
      case 'address':
        shop.address = event.target.value;
        break;
      case 'about':
        shop.about = event.target.value;
        break;
      case 'open_at':
        shop.open_at = event.target.value;
        break;
      case 'close_at':
        shop.close_at = event.target.value;  
        break;  
      case 'logo':
        shop.logo = event.target.files[0];
        break;
      default:
        break;
    }

    this.setState({
      data: shop
    });
  }



  handleSubmit = (event) => {
    event.preventDefault();
    var shop = this.state.data;
    if (shop.name === "" || shop.name === null) {
      this.setState({
        response : "Name Can't be empty.",
        responseClass : "text-danger",
      });
      return;
    }
    if(shop.close_at === "" || shop.close_at === null  ) {
      this.setState({
        response : "shop closing time Can't be empty.",
        responseClass : "text-danger",
      });
      return;
    }
    if (shop.email === "" || shop.email === null) {
      this.setState({
        response : "Email Can't be empty.",
        responseClass : "text-danger",
      });
      return;
    }

    if (shop.mobile === "" || shop.mobile === null) {
      this.setState({
        response : "Mobile Can't be empty.",
        responseClass : "text-danger",
      });
      return;
    }
    if (shop.address === "" || shop.address === null) {
      this.setState({
        response : "Address Can't be empty.",
        responseClass : "text-danger",
      });
      return;
    }
    if (shop.about === "" || shop.about === null) {
      this.setState({
        response : "About Can't be empty.",
        responseClass : "text-danger",
      });
      return;
    }
    this.setState({
      isLoader: true,
      response : "",
    }, () => {

      var shop = this.state.data;
      var data = new FormData();
      data.append("name", shop.name);
      data.append("email", shop.email);
      data.append("mobile", shop.mobile);
      data.append("address", shop.address);
      data.append("about", shop.about);
      data.append("open_at", shop.open_at);
      data.append("close_at", shop.close_at);
      if (shop.logo) {
        data.append("logo", shop.logo, shop.logo.name);
      }

      axios.post(UrlService.profileShopSettingUrl(), data, {
        headers: auth.apiHeader()
      }).then(res => {
        if (res.data.success) {
          var shop = this.state.data;
          shop.logo = null;
          this.setState({
            isLoader: false,
            response : "Data Saved Successfully",
            responseClass : "text-success",
            data : shop,
          });
        } else {
          this.setState({
            isLoader: false,
            response : res.data.message,
            responseClass : "text-danger",
          });
        }
      }).catch(err => {
        err = err.response;
        if (err.status === 401 || err.statusText === "Unauthorized") {
          auth.afterLogout();
          this.props.history.push("/login");
        } else if (err.status === 404) {
          this.setState({
            response: "Opps! Something went wrong, Please call to adminstrator at +91-8954836965",
          });
        } else {
          this.setState({
            response: err.data.message,
          });
        }
      })
    });
  }

 render() {
    const {response,responseClass,data} = this.state;
    const { name, email, mobile, address, about, logo , open_at, close_at, shop_url } = data;
    return (
        this.state.isLoader
        ?<PageLoader error={response}/>
        :  <form className="form-horizontal" onSubmit={this.handleSubmit} >
        <div className={responseClass}> {response} </div>

        <div className="form-group row">   
           <label className="col-sm-2 col-form-label"> Shop Url</label>
                <div className="col-sm-10">
                    <input disabled={true} type="text" className="form-control" value={shop_url}/>
                    
                </div>
        </div>
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-2 col-form-label">Shop Name</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Name"
              value={name}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-2 col-form-label">Shop Opening Time</label>
          <div className="col-sm-10">
            <input
              type="time"
              className="form-control"
              id="name"
              name="open_at"
              placeholder="Opening Time"
              value={open_at}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="name" className="col-sm-2 col-form-label">Shop Closing Time</label>
          <div className="col-sm-10">
            <input
              type="time"
              className="form-control"
              id="name"
              name="close_at"
              placeholder="Closing Time"
              value={close_at}
              onChange={this.handleInputChange}
            />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="email" className="col-sm-2 col-form-label">Shop Email</label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="mobile" className="col-sm-2 col-form-label">Shop Mobile</label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="mobile"
              name="mobile"
              placeholder="Mobile Number"
              value={mobile}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="address" className="col-sm-2 col-form-label">Shop Address</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="address"
              name='address'
              placeholder="Address"
              value={address}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="about" className="col-sm-2 col-form-label">About Shop</label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              id="about"
              name="about"
              placeholder="About"
              value={about}
              onChange={this.handleInputChange}
            ></textarea>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="logo" className="col-sm-2 col-form-label">Shop Logo</label>
          <div className="col-sm-10">
            <div className="custom-file">
              <input type="file" className="custom-file-input" id="logo" name="logo" onChange={this.handleInputChange} />
              <label className="custom-file-label" htmlFor="logo"> {(logo === null) ? "Choose file" : logo.name} </label>
            </div>
          </div>
        </div>


        {/* <div className="form-group row">
          <div className="offset-sm-2 col-sm-10">
            <div className="checkbox">
              <label>
                <input type="checkbox"/> I agree to the <a href="#">terms and conditions</a>
              </label>
            </div>
          </div>
        </div> */}
        <div className="form-group text-center">

          <button type="submit" className="btn btn-primary btn-lg">Submit</button>

        </div>
      </form>
    );
  }
}

export default ShopSettingForm;