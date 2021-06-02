import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Layout from '../layouts/RetailLayout';
import auth from '../services/AuthService';
import UrlService from '../services/UrlService';
import PageLoader from '../components/PageLoader';
import {Link } from 'react-router-dom'
class AddPurchase extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      options: [],
      price_type: "lumsum",
      price: "",
      quantity: "",
      total: 0,
      response: "",
      responseClass: "text-danger",
      isLoader: true,
    };


  }
  componentDidMount() {


    axios.get(UrlService.globalProductListUrl(), {
      headers: auth.apiHeader()
    }).then(res => {

      if (res.data.success) {
        const data = res.data.data;
        let options_main = data.main.map(item => {
          let option = {
            value: "",
            label: "",
          };
          option.value = item.id + ',main';
          option.label = item.name + ' | ' + item.weight + ' ' + item.weight_type;
          return option;
        });

        let options_temp = data.temp.map(item => {
          let option = {
            value: "",
            label: "",
          };
          option.value = item.id + ',temp';
          option.label = item.name + ' | ' + item.weight + ' ' + item.weight_type + " ( Custom Product ) ";
          return option;
        });

        this.setState({
          options: options_temp.concat(options_main),
          // options : options_main,
          isLoader: false,
        });
      } else {
        this.setState({
          response: res.data.message,
        });
      }

    }).catch(err => {
      console.log(err);
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
    });



  }

  calculateTotalPrice(price_type, price, quantity) {

    var total = 0;
    if (price_type === "lumsum" && price !== "" && quantity !== "") {
      total = price;
    }
    if (price_type === "per_piece" && price !== "" && quantity !== "") {
      total = price * quantity;
    }

    return total;
  }



  handleChange = selectedOption => {
    console.log(`Option selected:`, selectedOption);

    this.setState({ selectedOption }, () => {
      const { price_type, price, quantity } = this.state;
      const total = this.calculateTotalPrice(price_type, price, quantity);
      this.setState({
        total: total
      });
    });



  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    }, () => {
      const { price_type, price, quantity } = this.state;
      const total = this.calculateTotalPrice(price_type, price, quantity);
      this.setState({
        total: total
      });
    });

  };

  handleSubmit = event => {
    event.preventDefault();
    var { selectedOption, price_type, price, quantity } = this.state;

    if (selectedOption === null) {
      this.setState({
        response: "Please Select Product.",
        responseClass: "text-danger",
      });
    } else if (quantity === null || quantity === 0 || quantity === "") {
      this.setState({
        response: "Please Enter Quantity.",
        responseClass: "text-danger",
      });
    } else if (price === null || price === 0 || price === "") {
      this.setState({
        response: "Please Enter Price.",
        responseClass: "text-danger",
      });
    } else {
      this.setState({
        response: "",
        isLoader: true,
      }, () => {
        const product = (selectedOption.value).split(",");
        const postData = {
          product_id: Number(product[0]),
          product_source: product[1],
          price: Number((price_type === "lumsum") ? (price / quantity).toFixed(8) : price),
          quantity: Number(quantity),
        }

        axios.post(UrlService.addPurchaseUrl(), postData, {
          headers: auth.apiHeader()
        }).then(res => {
          if (res.data.success) {
            this.setState({
              response: "Successfully Added Product, Check your product list for details.",
              responseClass: "text-success",
              selectedOption: null,
              price_type: "lumsum",
              price: "",
              quantity: "",
              total: 0,
              isLoader: false,
            });
          } else {
            this.setState({
              response: res.data.message,
              responseClass: "text-danger",
              selectedOption: null,
              price_type: "lumsum",
              price: "",
              quantity: "",
              total: 0,
              isLoader: false,
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
        });
      });





    }

  };

  handleReset = event => {
    this.setState({
      selectedOption: null,
      price_type: "lumsum",
      price: "",
      quantity: "",
      total: 0,
    })
  }

  render() {

    const { selectedOption, options } = this.state;
    return (
      <Layout pathname={this.props.location.pathname} page="" >


        {
          (this.state.isLoader)
            ? <PageLoader error={this.state.response} />
            : <>
              <div className=" position-relative p-3 bg-success mb-5 " style={{ marginLeft: '5%', marginRight: '5%', padding: '10px' }}>
                <div className="ribbon-wrapper">
                  <div className="ribbon bg-warning">
                  </div>
                </div>
                <p className="font-weight-bold"> Catalogue Builder  </p>
                <div className="row">
                  <p className="col-md-8">Import Products and create your catalogue from our already existing products. </p>
                  <p className="col-md-4 font-weight-bold text-right"><Link to="/catalogue-builder" className="btn btn-warning"> Import Now <i class="fas fa-chevron-circle-right"></i> </Link></p>
                </div>
              </div>
              <div className="card card-info" style={{ marginLeft: '5%', marginRight: '5%', padding: '10px' }}>

                <div className="card-header">
                  <h3 className="card-title"><strong>Add Stock Purchase</strong></h3>
                </div>

                <div className={this.state.responseClass} style={{ paddingTop: '5px' }}>  &nbsp; <strong> {this.state.response} </strong> </div>
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                  <div className="card-body">
                    <div className="form-group row">
                      <label htmlFor="prduct" className="col-sm-3 col-form-label">Select Product</label>
                      <div className="col-sm-9" id="prduct">
                        <Select
                          value={selectedOption}
                          onChange={this.handleChange}
                          options={options}
                        />



                      </div>
                    </div>


                    <div className="form-group row">
                      <label htmlFor="quantity" className="col-sm-3 col-form-label">Quantity</label>
                      <div className="col-sm-9">
                        <input value={this.state.quantity} type="number" className="form-control" name="quantity" placeholder="Enter Quantity" onChange={this.handleInputChange} />
                      </div>

                    </div>


                    <div className="form-group row">
                      <label htmlFor="price_type" className="col-sm-3 col-form-label">Price Type</label>
                      <div className="col-sm-9">
                        <select value={this.state.price_type} name="price_type" className="form-control" onChange={this.handleInputChange} >
                          <option value="lumsum" >Lumsum</option>
                          <option value="per_piece">Per Piece</option>
                        </select>
                      </div>


                    </div>

                    <div className="form-group row">
                      <label htmlFor="price" className="col-sm-3 col-form-label">Price</label>
                      <div className="col-sm-9">
                        <input value={this.state.price} type="number" className="form-control" name="price" placeholder="Enter Price" onChange={this.handleInputChange} />
                      </div>

                    </div>




                    <div className="text-right h3"> <strong> Total: RS. {this.state.total} /-  </strong> </div>

                  </div>

                  <div className="card-footer">
                    <button type="reset" onClick={this.handleReset} className="btn btn-default ">Reset</button>
                    <button type="submit" className="btn btn-info float-right">Add</button>
                  </div>

                </form>
              </div></>
        }

      </Layout>
    );
  }
}

export default AddPurchase;