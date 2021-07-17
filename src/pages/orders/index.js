import React, { Component } from "react";
import OrderCard from "./OrderCard";
import axios from "axios";
import UrlService from "../../services/UrlService";
import auth from "../../services/AuthService";
import Layout from "../../layouts/RetailLayout";
import PageLoader from "../../components/PageLoader";
import Pagination from 'react-js-pagination';


class orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      meta: null,
      status: "0",
      search: "",
      isLoader: true,
      response: "",
    };
    this.getOrders = this.getOrders.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentWillMount() {
    this.getOrders();
  }

  updateState(id, status) {
    const postData = {
      id: id,
      status: status,
    };
    axios
      .post(UrlService.updateOrderStatus(), postData, {
        headers: auth.apiHeader(),
      })
      .then((res) => {
        console.log(res);
        if (status === 2 && res.data.success) {
          this.props.history.push("/invoice/" + res.data.data);
        } else if (res.data.success) {
          this.getOrders();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  handleStatusChange = (event) => {
    this.setState(
      {
        status: event.target.value,
      },
      () => {
        this.getOrders();
      }
    );
  };

  handleSearchChange = (event) => {
    this.setState(
      {
        search: event.target.value,
        response: "",
      },
      () => {
        if (this.state.search === "") {
          this.getOrders();
        }
      }
    );
  };

  handleSearch = () => {
    this.getOrders();
  };

  getOrders(page = 1) {
    this.setState({
      isLoader: true,
    });

    axios
      .get(UrlService.getOrders(), {
        headers: auth.apiHeader(),
        params: {
          page : page,
          status: this.state.status,
          search: this.state.search,
        },
      })
      .then((res) => {
        console.log(res.data.data, "ssss");

        if (res.data) {
          this.setState(
            {
              data: res.data.data,
              meta: res.data.meta,
              isLoader: false,
              response: "",
            },
            () => {
              window.setDataTable();
            }
          );
          console.log(this.state.data);
        } else {
          this.setState({
            isLoader: false,
            response: res.data.message,
          });
        }

        //  console.log(res, 'success');
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  render() {
    return (
      <Layout pathname={this.props.location.pathname} page="Online Order Management">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group" style={{ width: "125px" }}>
              <select
                className="custom-select"
                value={this.state.status}
                onChange={this.handleStatusChange}
              >
                <option value="0">Pending</option>
                <option value="1">Accepted</option>
                <option value="2">Completed</option>
                <option value="3">Rejected</option>
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group float-right" style={{ width: "200px" }}>
              <div className="input-group input-group-sm">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Order No."
                  value={this.state.search}
                  onChange={this.handleSearchChange}
                />
                <span className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-info btn-flat"
                    onClick={this.handleSearch}
                  >
                    Go!
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>

        {this.state.isLoader ? (
          <PageLoader error={this.state.response} />
        ) : (
          <React.Fragment>
            <div className="row">
              <OrderCard
                data={this.state.data}
                updateState={this.updateState}
              />
                 
            </div>
            <div className="card-footer">
                <nav aria-label="Contacts Page Navigation">
                    <Pagination
                        activePage={this.state.meta.current_page}
                        itemsCountPerPage={this.state.meta.per_page}
                        totalItemsCount={this.state.meta.total}
                        onChange={(pageNumber) => this.getOrders(pageNumber)}
                        innerClass="pagination justify-content-center m-0"
                        itemClass="page-item"
                        linkClass="page-link"
                        firstPageText="First"
                        lastPageText="Last"
                    />
                </nav>
            </div>
          </React.Fragment>
        )}
      </Layout>
    );
  }
}

export default orders;
