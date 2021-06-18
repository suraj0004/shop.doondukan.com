import React, { Component } from "react";
import axios from "axios";
import Layout from "../layouts/RetailLayout";
import auth from "../services/AuthService";
import UrlService from "../services/UrlService";
import PageLoader from "../components/PageLoader";
import Table from "../pages/saleList/Table";
import Pagination from "react-js-pagination";
import Filter from "./saleList/Filter";

class SaleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      status: "",
      isLoader: true,
      response: "",
      saleDate: "",
      sortType: "sale-date-latest",
      searchKey: "",
    };
    this.getList = this.getList.bind(this);
  }

  getList(page = 1) {
    this.setState(
      {
        isLoader: true,
      },
      () => {
        axios
          .get(UrlService.saleListUrl(), {
            headers: auth.apiHeader(),
            params: {
              status: this.state.status,
              page: page,
              saleDate: this.state.saleDate,
              sortType: this.state.sortType,
              search: this.state.searchKey,
            },
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.success) {
              this.setState(
                {
                  data: res.data,
                  isLoader: false,
                },
                () => {
                  window.setDataTable();
                }
              );
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
  componentDidMount() {
    this.getList();
  }

  handleStatusChange = (event) => {
    this.setState(
      {
        status: event.target.value,
        isLoader: true,
      },
      () => {
        this.getList();
      }
    );
  };

  handleSearchChange = (event) => {
    this.setState(
      {
        searchKey: event.target.value,
        response: "",
      },
      () => {
        if (this.state.searchKey === "") {
          this.getList();
        }
      }
    );
  };

  handleSaleDateChange = (event) => {
    this.setState(
      {
        saleDate: event.target.value,
      },
      () => {
        this.getList();
      }
    );
  };

  handleSortTypeChange = (event) => {
    this.setState(
      {
        sortType: event.target.value,
      },
      () => {
        this.getList();
      }
    );
  };

  render() {
    return (
      <Layout pathname={this.props.location.pathname} page="Sale List">
        {this.state.isLoader ? (
          <PageLoader error={this.state.response} />
        ) : (
          <React.Fragment>
            <Filter
              saleDate={this.state.saleDate}
              sortType={this.state.sortType}
              searchKey={this.state.searchKey}
              handleSearchChange={this.handleSearchChange}
              handleSearch={this.getList}
              handleSaleDateChange={this.handleSaleDateChange}
              handleSortTypeChange={this.handleSortTypeChange}
              status={this.state.status}
              handleStatusChange={this.handleStatusChange}
            />
            <Table
              data={this.state.data.data}
              currentPage={this.state.data.meta.current_page}
              perPage={this.state.data.meta.per_page}
            />
            <div className="card-footer">
              <nav aria-label="Contacts Page Navigation">
                <Pagination
                  activePage={this.state.data.meta.current_page}
                  itemsCountPerPage={this.state.data.meta.per_page}
                  totalItemsCount={this.state.data.meta.total}
                  onChange={(pageNumber) => this.getList(pageNumber)}
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

export default SaleList;
