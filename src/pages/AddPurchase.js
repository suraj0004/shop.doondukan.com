import React, { Component } from "react";
import axios from "axios";
import Layout from "../layouts/RetailLayout";
import auth from "../services/AuthService";
import UrlService from "../services/UrlService";
import PageLoader from "../components/PageLoader";
import { Link } from "react-router-dom";
import { AsyncPaginate } from "react-select-async-paginate";

class AddPurchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      price_type: "",
      price: "",
      selling_price: "",
      quantity: "",
      total: 0,
      response: "",
      responseClass: "text-danger",
      isLoader: false,
    };
  }

  loadProductOptions = async (search, loadedOptions, { page }) => {
    const endpoint = UrlService.globalProductListUrl() + `?page=${page}`;
    const response = await axios
      .post(
        endpoint,
        {
          search,
        },
        {
          headers: auth.apiHeader(),
        }
      )
      .then((res) => res.data);

    if (response.success) {
      return {
        options: response.data.data.map((item) => {
          return {
            value: `${item.id},main,${item.price}`,
            label: `${item.name} | ${item.weight} | ${item.weight_type}`,
          };
        }),
        hasMore: response.data.last_page !== response.data.current_page,
        additional: {
          page: page + 1,
        },
      };
    } else {
      return {
        options: [],
        hasMore: false,
        additional: {
          page: 1,
        },
      };
    }
  };

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

  handleChange = (selectedOption) => {
    const product = selectedOption.value.split(",");
    this.setState({ selectedOption }, () => {
      const { price_type, price, quantity } = this.state;
      const total = this.calculateTotalPrice(price_type, price, quantity);
      if (Number(product[2])) {
        this.setState({
          total: total,
          price: product[2],
          price_type: "per_piece",
        });
      } else {
        this.setState({
          total: total,
          price: "",
          price_type: "",
        });
      }
    });
  };

  handleInputChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        const { price_type, price, quantity } = this.state;
        const total = this.calculateTotalPrice(price_type, price, quantity);
        this.setState({
          total: total,
        });
      }
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let { selectedOption, price_type, price, quantity, selling_price } =
      this.state;

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
    } else if (
      selling_price === null ||
      selling_price === 0 ||
      selling_price === ""
    ) {
      this.setState({
        response: "Please Enter Selling Price.",
        responseClass: "text-danger",
      });
    } else if ((price && !price_type) || (!price && price_type)) {
      this.setState({
        response: "Please Enter Buying Price and Price Type.",
        responseClass: "text-danger",
      });
    } else {
      this.setState(
        {
          response: "",
          isLoader: true,
        },
        () => {
          if (!price || !price_type) {
            price_type = "";
            price = 0;
          } else if (price_type === "lumsum") {
            price = Number((price / quantity).toFixed(8));
          } else {
            price = Number(price);
          }
          const product = selectedOption.value.split(",");
          const postData = {
            product_id: Number(product[0]),
            product_source: product[1],
            price: price,
            quantity: Number(quantity),
            selling_price: Number(selling_price),
          };

          axios
            .post(UrlService.addPurchaseUrl(), postData, {
              headers: auth.apiHeader(),
            })
            .then((res) => {
              if (res.data.success) {
                this.setState({
                  response:
                    "Successfully Added Product, Check your product list for details.",
                  responseClass: "text-success",
                  selectedOption: null,
                  price_type: "",
                  price: "",
                  selling_price: "",
                  quantity: "",
                  total: 0,
                  isLoader: false,
                });
              } else {
                this.setState({
                  response: res.data.message,
                  responseClass: "text-danger",
                  selectedOption: null,
                  price_type: "",
                  price: "",
                  selling_price: "",
                  quantity: "",
                  total: 0,
                  isLoader: false,
                });
              }
            })
            .catch((err) => {
              err = err.response;
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
  };

  handleReset = (event) => {
    this.setState({
      selectedOption: null,
      price_type: "",
      price: "",
      selling_price: "",
      quantity: "",
      total: 0,
    });
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <Layout pathname={this.props.location.pathname} page="">
        {this.state.isLoader ? (
          <PageLoader error={this.state.response} />
        ) : (
          <>
            <div
              className=" position-relative p-3 bg-success mb-5 "
              style={{ marginLeft: "5%", marginRight: "5%", padding: "10px" }}
            >
              <div className="ribbon-wrapper">
                <div className="ribbon bg-warning"></div>
              </div>
              <p className="font-weight-bold"> Catalogue Builder </p>
              <div className="row">
                <p className="col-md-8">
                  Purchase Product in Bulk and create your catalogue from our
                  already existing products.{" "}
                </p>
                <p className="col-md-4 font-weight-bold text-right">
                  <Link to="/catalogue-builder" className="btn btn-warning">
                    {" "}
                    Bulk Purchase Now{" "}
                    <i className="fas fa-chevron-circle-right"></i>{" "}
                  </Link>
                </p>
              </div>
            </div>
            <div
              className="card card-info"
              style={{ marginLeft: "5%", marginRight: "5%", padding: "10px" }}
            >
              <div className="card-header">
                <h3 className="card-title">
                  <strong>Purchase Product</strong>
                </h3>
              </div>

              <div
                className={this.state.responseClass}
                style={{ paddingTop: "5px" }}
              >
                {" "}
                &nbsp; <strong> {this.state.response} </strong>{" "}
              </div>
              <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="card-body">
                  <div className="form-group row">
                    <label htmlFor="prduct" className="col-sm-3 col-form-label">
                      {" "}
                      <span className="text-danger">*</span> Purchased Product
                    </label>
                    <div className="col-sm-9" id="prduct">
                      <AsyncPaginate
                        value={selectedOption}
                        loadOptions={this.loadProductOptions}
                        debounceTimeout={500}
                        onChange={this.handleChange}
                        additional={{
                          page: 1,
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="quantity"
                      className="col-sm-3 col-form-label"
                    >
                      {" "}
                      <span className="text-danger">*</span> Purchased Quantity
                    </label>
                    <div className="col-sm-9">
                      <input
                        value={this.state.quantity}
                        type="number"
                        className="form-control"
                        name="quantity"
                        placeholder="Enter Quantity"
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="selling_price"
                      className="col-sm-3 col-form-label"
                    >
                      {" "}
                      <span className="text-danger">*</span> Product Selling
                      Price (Per Piece)
                    </label>
                    <div className="col-sm-9">
                      <input
                        value={this.state.selling_price}
                        type="number"
                        className="form-control"
                        name="selling_price"
                        placeholder="Enter Selling Price"
                        onChange={this.handleInputChange}
                      />
                      <small>
                        *This price will show on your e-commerce app
                      </small>
                    </div>
                  </div>
                  <hr />
                  <small>
                    Note: Leave this part blank in case of privacy.{" "}
                  </small>
                  <div className="form-group row">
                    <label htmlFor="price" className="col-sm-3 col-form-label">
                      Purchased Price
                    </label>
                    <div className="col-sm-9">
                      <input
                        value={this.state.price}
                        type="number"
                        className="form-control"
                        name="price"
                        placeholder="Enter price you paid on purchasing"
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="price_type"
                      className="col-sm-3 col-form-label"
                    >
                      Purchased Price Type
                    </label>
                    <div className="col-sm-9">
                      <select
                        value={this.state.price_type}
                        name="price_type"
                        className="form-control"
                        onChange={this.handleInputChange}
                      >
                        <option value="">
                          -- Select Purchased Price Type --
                        </option>
                        <option value="lumsum">Total Amount</option>
                        <option value="per_piece">Per Piece</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-right h3">
                    {" "}
                    <strong> Total: RS. {this.state.total} /- </strong>{" "}
                  </div>
                </div>

                <div className="card-footer">
                  <button
                    type="reset"
                    onClick={this.handleReset}
                    className="btn btn-default "
                  >
                    Reset
                  </button>
                  <button type="submit" className="btn btn-info float-right">
                    Add to Purchase
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </Layout>
    );
  }
}

export default AddPurchase;
