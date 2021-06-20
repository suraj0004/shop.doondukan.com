import React, { Component } from "react";
import axios from "axios";

import UrlService from "../../services/UrlService";
import auth from "../../services/AuthService";

import Layout from "../../layouts/RetailLayout";
import AddProduct from "./AddProductModal";
import EditProduct from "./EditProductModal";
import Table from "./Table";
import Pagination from "react-js-pagination";
import PageLoader from "../../components/PageLoader";

class MyProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      data: null,
      error: "",
      edit: {
        show: false,
        data: null,
      },
      categories : [],
      categories_fetch_error: ''
    };
  }

  handleAddProduct = (row) => {
    var data = this.state.data;
    data.unshift(row);
    this.setState({
      data: data,
    });
  };

  handleEditProduct = (row) => {
    let data = this.state.data.map((product) => {
      return product.id === row.id ? row : product;
    });
    this.setState({
      data,
    });
  };

  showEditModal = (row) => {
    this.setState({
      edit: {
        show: true,
        data: row,
      },
    });
  };

  hideEditModal = () => {
    this.setState({
      edit: {
        show: false,
        data: null,
      },
    });
  };

  getData = (page = 1) => {
    this.setState(
      {
        loader: true,
      },
      () => {
        axios
          .get(UrlService.GetCustomeProductListUrl(), {
            headers: auth.apiHeader(),
            params: {
              page: page,
            },
          })
          .then((res) => {
            console.log(res);
            if (res.data.success) {
              this.setState(
                {
                  loader: false,
                  data: res.data,
                  error: "",
                },
                () => {
                  window.setDataTable();
                }
              );
            } else {
              this.setState({
                loader: false,
                data: null,
                error: res.data.message,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            this.setState({
              loader: false,
              data: null,
              error:
                "Opps! Something went wrong. Please try again or contact to Adminstrator",
            });
          });
      }
    );
  };

  componentDidMount() {
    this.getData();
    axios
      .get(UrlService.GetCategoriestUrl(), {
        headers: auth.apiHeader(),
      })
      .then((response) => {
        if (response.data.success) {
          this.setState({
            categories:response.data.data
          })
        } else {
          this.setState({
            categories_fetch_error: response.data.message
          })
        }
      })
      .catch((err) => {
        this.setState({
          categories_fetch_error: "Opps! Unable to load categories"
        })
        
      });
  }

  render() {
    return (
      <Layout
        pathname={this.props.location.pathname}
        page="My Custom Product Builder"
      >
        <AddProduct 
          onSuccess={this.getData} 
          categories={this.state.categories} 
          categories_fetch_error={this.state.categories_fetch_error}
        />
        <EditProduct
          edit={this.state.edit}
          hideEditModal={this.hideEditModal}
          onSuccess={this.getData}
          categories={this.state.categories} 
          categories_fetch_error={this.state.categories_fetch_error} 
        />

        <div className="">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <button
                type="button"
                className="btn btn-primary btn-block"
                data-toggle="modal"
                data-target="#add_product"
              >
                <i className="fa fa-plus"></i> Build Product{" "}
              </button>
            </div>
          </div>

          <div className="">
            {this.state.loader ? (
              <PageLoader error={this.state.error} />
            ) : (
              <>
                <Table
                  data={this.state.data.data}
                  currentPage={this.state.data.meta.current_page}
                  perPage={this.state.data.meta.per_page}
                  showEditModal={this.showEditModal}
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
          </div>
        </div>
      </Layout>
    );
  }
}

export default MyProductList;
