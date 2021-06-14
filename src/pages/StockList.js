import React, { Component } from "react";
import axios from "axios";
import Layout from "../layouts/RetailLayout";
import Table from "./stockList/Table";
import auth from "../services/AuthService";
import UrlService from "../services/UrlService";
import PageLoader from "../components/PageLoader";
import Pagination from "react-js-pagination";

class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoader: true,
      response: "",
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
            },
          })
          .then((res) => {
            if (res.data.success) {
              console.log(res);
              this.setState({
                data: res.data.data,
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

  render() {
    return (
      <Layout pathname={this.props.location.pathname} page="Stock List">
        {this.state.isLoader ? (
          <PageLoader error={this.state.response} />
        ) : (
          <>
            <Table
              data={this.state.data.data}
              currentPage={this.state.data.current_page}
              perPage={this.state.data.per_page}
            />
            <div className="card-footer">
              <nav aria-label="Contacts Page Navigation">
                <Pagination
                  activePage={this.state.data.current_page}
                  itemsCountPerPage={this.state.data.per_page}
                  totalItemsCount={this.state.data.total}
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
