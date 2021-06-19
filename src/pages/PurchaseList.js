import React, { Component } from "react";
import axios from "axios";
import Layout from "../layouts/RetailLayout";
import auth from "../services/AuthService";
import UrlService from "../services/UrlService";
import PageLoader from "../components/PageLoader";
import Table from "../pages/purchaseList/Table";
import Pagination from "react-js-pagination";
import Filter from "./purchaseList/Filter";

class PurchaseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoader: true,
      response: "",
      purchaseDate:'',
      sortType:'purchase-date-latest',
      searchKey:'',
    };
  }

  getData = (page = 1) => {
    this.setState(
      {
        isLoader: true,
      },
      () => {
        axios
          .get(UrlService.purchasedListUrl(), {
            headers: auth.apiHeader(),
            params: {
              page: page,
              purchaseDate: this.state.purchaseDate,
              sortType: this.state.sortType,
              search: this.state.searchKey,
            },
          })
          .then((res) => {
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
  };
  componentDidMount() {
    this.getData();
  }

  handleSearchChange = (event) => {
    this.setState(
      {
        searchKey: event.target.value,
        response: "",
      },
      () => {
        if (this.state.searchKey === "") {
          this.getData();
        }
      }
    );
  };

  handlePurchaseDateChange = (event) => {
    this.setState(
      {
        purchaseDate: event.target.value,
      },
      () => {
        this.getData();
      }
    );
  };

  handleSortTypeChange = (event) => {
    this.setState(
      {
        sortType: event.target.value,
      },
      () => {
        this.getData();
      }
    );
  };

  render() {

    return (
      <Layout pathname={this.props.location.pathname} page="Purchase History">
        {this.state.isLoader ? (
          <PageLoader error={this.state.response} />
        ) : (
          <>
          <Filter
            purchaseDate={this.state.purchaseDate}
            sortType={this.state.sortType}
            searchKey={this.state.searchKey}
            handleSearchChange={this.handleSearchChange}
            handleSearch={this.getData}
            handlePurchaseDateChange={this.handlePurchaseDateChange}
            handleSortTypeChange={this.handleSortTypeChange}

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
                  onChange={(pageNumber) => this.getData(pageNumber)}
                  innerClass="pagination justify-content-center m-0"
                  itemClass="page-item"
                  linkClass="page-link"
                  firstPageText="First"
                  lastPageText="Last"
                />
              </nav>
            </div>
          </>
        )}
      </Layout>
    );
  }
}

export default PurchaseList;
