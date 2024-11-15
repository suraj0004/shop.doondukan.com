import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import Layout from "../layouts/RetailLayout";
import auth from "../services/AuthService";
import UrlService from "../services/UrlService";
import PageLoader from "../components/PageLoader";
import BuyerDetailForm from "./generateBill/BuyerDetailForm";

class GenerateBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      responseClass: "text-danger",
      rows: [],
      options: [],
      model_show: false,
      model_response: "",
      buyer: {
        name: "",
        email: "",
        mobile: "",
        discount: 0,
        selectedOption: { value: "rupees", label: "In Rs." },
      },

      isLoader: true,
      total: 0,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get(UrlService.globalAvailableStockListUrl(), {
        headers: auth.apiHeader(),
      })
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          let options_main = data.main.map((item) => {
            console.log(item.product);
            let option = {
              value: "",
              label: "",
            };
            option.value = item.id + "," + item.price + "," + item.quantity;
            let brand = item.product?.brand?.brand_name
              ? " | " + item.product.brand.brand_name
              : "";
            option.label =
              item.product.name +
              " | " +
              item.product.weight +
              " " +
              item.product.weight_type +
              brand;
            return option;
          });

          let options_temp = data.temp.map((item) => {
            let option = {
              value: "",
              label: "",
            };
            option.value = item.id + "," + item.price + "," + item.quantity;
            let brand = item.temp_product?.brand?.brand_name
              ? " | " + item.temp_product.brand.brand_name
              : "";
            option.label =
              item.temp_product.name +
              " | " +
              item.temp_product.weight +
              " " +
              item.temp_product.weight_type +
              brand +
              " ( Custom Product) ";
            return option;
          });

          var row = {
            options: options_temp.concat(options_main),
            selectedOption: null,
            stock_id: "",
            avaliable_quantity: "",
            price: "",
            sell_quantity: "",
          };
          this.setState({
            rows: [row],
            options: options_temp.concat(options_main),
            isLoader: false,
          });
        } else {
          this.setState({
            response: res.data.message,
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

  handleChange = (index, selectedOption) => {
    const stock = selectedOption.value.split(",");
    var rows = this.state.rows;
    rows[index].selectedOption = selectedOption;
    rows[index].stock_id = Number(stock[0]);
    rows[index].price = Number(stock[1]);
    rows[index].avaliable_quantity = Number(stock[2]);
    this.setState({
      rows: rows,
      response: "",
    });
  };

  handleDiscountTypeChange = (selectedOption) => {
    var buyer = this.state.buyer;
    buyer.selectedOption = selectedOption;
    this.setState({
      buyer: buyer,
    });
  };

  handleInputChange = (index, event) => {
    var rows = this.state.rows;
    rows[index].sell_quantity = Number(event.target.value);
    if (rows[index].sell_quantity > rows[index].avaliable_quantity) {
      this.setState({
        response: `Only '${rows[index].avaliable_quantity}' Pcs of '${rows[index].selectedOption.label}' is Available `,
        responseClass: "text-danger",
        rows: rows,
      });

      return;
    }
    // console.log(rows);
    var total = 0;
    for (var i = 0; i < rows.length; i++) {
      //  console.log(rows[i]);
      total += rows[i].price * rows[i].sell_quantity;
    }
    // console.log(total);
    this.setState({
      rows: rows,
      response: "",
      total: total,
    });
  };

  handleNewRow = () => {
    var rows = this.state.rows;
    var options;
    var all_selected_options = rows.map((item) => {
      return item.selectedOption;
    });

    if (all_selected_options.length === this.state.options.length) {
      this.setState({
        response: "No More Stock is Available",
        responseClass: "text-danger",
      });
      window.scrollTo(0, 0);
      return;
    }
    if (rows.length === 0) {
      options = this.state.options;
      rows.push({
        options: options,
        selectedOption: null,
        stock_id: "",
        avaliable_quantity: "",
        price: "",
        sell_quantity: "",
      });

      this.setState({
        rows: rows,
        response: "",
      });
    } else {
      const last_row = rows[rows.length - 1];
      const last_row_selected_option = last_row.selectedOption;
      if (last_row_selected_option === null) {
        this.setState({
          response: "Please fill exisiting row before adding new row",
          responseClass: "text-danger",
        });
        window.scrollTo(0, 0);
      } else {
        options = this.state.options.filter((option) => {
          return !all_selected_options.includes(option);
        });

        rows.push({
          options: options,
          selectedOption: null,
          stock_id: "",
          avaliable_quantity: "",
          price: "",
          sell_quantity: "",
        });

        this.setState({
          rows: rows,
          response: "",
        });
      }
    }
  };

  handleDeleteRow = (index) => {
    var rows = this.state.rows;

    rows = rows.filter((item, i) => {
      return i !== index;
    });

    var total = 0;
    for (var i = 0; i < rows.length; i++) {
      //  console.log(rows[i]);
      total += rows[i].price * rows[i].sell_quantity;
    }

    this.setState({
      rows: rows,
      response: "",
      total: total,
    });
  };

  handleGenerateBill = () => {
    var rows = this.state.rows;
    if (rows.length === 0) {
      this.setState({
        response: "Please Add some products",
        responseClass: "text-danger",
      });
      window.scrollTo(0,0);
      return;
    }
    for (let row of rows) {
      if (row.selectedOption === null) {
        this.setState({
          response: "Please Select Product",
          responseClass: "text-danger",
        });
        window.scrollTo(0,0);
        return;
      }
      if (
        row.sell_quantity === "" ||
        row.sell_quantity === 0 ||
        row.sell_quantity === null
      ) {
        this.setState({
          response:
            "Please Enter Quantity for '" + row.selectedOption.label + "'",
          responseClass: "text-danger",
        });
        window.scrollTo(0,0);
        return;
      }
      if (row.sell_quantity > row.avaliable_quantity) {
        this.setState({
          response: `Only '${row.avaliable_quantity}' Pcs of '${row.selectedOption.label}' is Available `,
          responseClass: "text-danger",
        });
        window.scrollTo(0,0);
        return;
      }
    }

    this.setState({
      response: "",
      model_show: true,
    });
  };

  handleSubmit() {
    this.setState(
      {
        isLoader: true,
        model_show: false,
      },
      () => {
        var postData = [];
        postData = this.state.rows.map((item) => {
          return {
            stock_id: item.stock_id,
            quantity: item.sell_quantity,
          };
        });
        postData = {
          sale: postData,
          buyer: {
            name: this.state.buyer.name,
            email: this.state.buyer.email,
            mobile: this.state.buyer.mobile,
            discount: this.state.buyer.discount,
            discount_type: this.state.buyer.selectedOption.value,
          },
        };
        axios
          .post(UrlService.generateBillUrl(), postData, {
            headers: auth.apiHeader(),
          })
          .then((res) => {
            if (res.data.success) {
              this.props.history.push("/invoice/detail/" + res.data.data);
            } else {
              this.setState({
                response: res.data.message,
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

  hideModal = () => {
    this.setState({
      model_show: false,
    });
  };

  handleSaveSubmit = () => {
    if (this.state.buyer.name === "") {
      this.setState({
        model_response: "Buyer Name is required",
      });
      return;
    }

    this.handleSubmit();
  };

  handleSkipSubmit = () => {
    this.setState(
      {
        buyer: {
          name: "",
          email: "",
          mobile: "",
          discount: 0,
          selectedOption: { value: "rupees", label: "In Rs." },
        },
      },
      () => {
        this.handleSubmit();
      }
    );
  };

  handleBuyerDetails = (event) => {
    var buyer = this.state.buyer;

    switch (event.target.name) {
      case "buyer_name":
        buyer.name = event.target.value;
        break;
      case "buyer_email":
        buyer.email = event.target.value;
        break;
      case "buyer_mobile":
        buyer.mobile = event.target.value;
        break;
      case "discount":
        buyer.discount = event.target.value;
        break;
      default:
        break;
    }

    this.setState({
      buyer: buyer,
    });
  };

  render() {
    const rows = this.state.rows.map((item, index) => {
      let deleteRow = (
        <button
          style={{ marginTop: "7px" }}
          onClick={() => this.handleDeleteRow(index)}
          className="btn btn-outline-danger btn-xs"
          type="button"
        >
          {" "}
          X Remove{" "}
        </button>
      );

      return (
        <div key={(index + 1).toString()} className="row mt-4 ml-2">
          <div className="col-md-3"></div>
          <div className="col-md-6 rounded shadow row border-top">
            <div className="col-12 p-1 text-right">{deleteRow}</div>
            <div className="col-12 p-2">
              <div className="">
                <Select
                  value={item.selectedOption}
                  onChange={(e) => this.handleChange(index, e)}
                  options={item.options}
                  isDisabled={item.selectedOption === null ? false : true}
                />
              </div>
            </div>
            <div className="col-md-6 col-12 p-2">
              {" "}
              <strong>Available Quantity: </strong>{" "}
              {item.avaliable_quantity === ""
                ? "----"
                : item.avaliable_quantity + "Pcs."}{" "}
            </div>
            <div className="col-md-6 col-12 p-2">
              <strong>Selling Price: </strong>{" "}
              {item.price === "" ? "----" : "Rs. " + item.price + " /-"}{" "}
            </div>
            <div className="col-12 p-2">
              {" "}
              <input
                value={item.sell_quantity}
                type="number"
                className="form-control"
                name="quantity"
                placeholder="Enter Quantity"
                onChange={(e) => this.handleInputChange(index, e)}
                disabled={item.selectedOption === null ? true : false}
              />
            </div>
          </div>
        </div>
      );
    });

    return (
      <Layout pathname={this.props.location.pathname} page="">
        {this.state.isLoader ? (
          <PageLoader error={this.state.response} />
        ) : (
          <div
            className="card card-info m-0"
            style={{ marginLeft: "5%", marginRight: "5%", padding: "10px" }}
          >
            <div className="card-header">
              <h3 className="card-title">
                <strong>Generate Offline Order</strong>
              </h3>
            </div>

            <div className="row">
              <div
                className={`text-center col-12 ${this.state.responseClass}`}
                style={{ paddingTop: "5px" }}
              >
                {" "}
                &nbsp; <strong> {this.state.response} </strong>{" "}
              </div>

              <div className="col-12 p-4" style={{ paddingBottom: "115px" }}>
                {rows}
              </div>
            </div>

            <div className="text-right">
              {" "}
              <h5> Total Amount: Rs. {this.state.total} /- </h5>{" "}
            </div>
            <div className="text-center row">
              <div className="col-md-4 mt-2">
                <button
                  onClick={this.handleNewRow}
                  className="btn btn-primary btn-block"
                  type="button"
                >
                  <i className="fa fa-plus"></i> Add More
                </button>
              </div>
              <div className="col-md-8 mt-2">
                <button
                  className="btn btn-block btn-success"
                  type="button"
                  onClick={this.handleGenerateBill}
                >
                  Generate
                </button>
              </div>
            </div>
            <br />
          </div>
        )}
        <BuyerDetailForm
          show={this.state.model_show}
          hideModal={this.hideModal}
          handleSaveSubmit={this.handleSaveSubmit}
          handleSkipSubmit={this.handleSkipSubmit}
          buyer={this.state.buyer}
          model_response={this.state.model_response}
          handleBuyerDetails={this.handleBuyerDetails}
          handleDiscountTypeChange={this.handleDiscountTypeChange}
        />
      </Layout>
    );
  }
}

export default GenerateBill;
