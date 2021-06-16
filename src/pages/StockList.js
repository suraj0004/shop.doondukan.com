import React, { Component } from "react";
import axios from "axios";
import Layout from "../layouts/RetailLayout";
import Table from "./stockList/Table";
import auth from "../services/AuthService";
import UrlService from "../services/UrlService";
import PageLoader from "../components/PageLoader";
import Pagination from "react-js-pagination";
import Filter from './stockList/Filter'

class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoader: true,
      response: "",
      stockFilter:'all-stock',
      sortType:'qty-low-to-high',
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
          .get(UrlService.stockListUrl(), {
            headers: auth.apiHeader(),
            params: {
              page: page,
              stockFilter: this.state.stockFilter,
              sortType: this.state.sortType,
              search: this.state.searchKey,
            },
          })
          .then((res) => {
            if (res.data.success) {
              console.log(res.data);
              this.setState({
                data: res.data,
                isLoader: false,
              });
            } else {
              this.setState({
                response: res.data.message,
              });
            }
          })
          .catch((err) => {});
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

  handleStockFilterChange = (event) => {
    this.setState(
      {
        stockFilter: event.target.value,
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
      <Layout pathname={this.props.location.pathname} page="Stock List">
        {this.state.isLoader ? (
          <PageLoader error={this.state.response} />
        ) : (
          <>
          <Filter
            stockFilter={this.state.stockFilter}
            sortType={this.state.sortType}
            searchKey={this.state.searchKey}
            handleSearchChange={this.handleSearchChange}
            handleSearch={this.getData}
            handleStockFilterChange={this.handleStockFilterChange}
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

export default StockList;
