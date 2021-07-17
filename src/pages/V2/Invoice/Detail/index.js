import React, { Component } from "react";
import Layout from "../../../../layouts/RetailLayout";
import PageLoader from "../../../../components/PageLoader";
import Detail from "./Detail";
import axios from "axios";
import UrlService from "../../../../services/UrlService";
import auth from "../../../../services/AuthService";

class InvoiceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      loading: false,
      data: {
        products: [],
        buyer: null,
        meta: null,
        discount: null,
      },
      error: "",
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      axios
        .get(UrlService.invoiceUrl() + this.state.id, {
          headers: auth.apiHeader(),
        })
        .then((res) => {
          console.log(res);
          this.setState({
            data:{
              products: res.data.data.main_sale_product,
              buyer:{
                name: res.data.data.customer_name,
                name: res.data.data.customer_mobile
              },
              meta:{
                invoice_number: (res.data.data.id).toString().padStart('4', '0'),
                date: res.data.data.created_at,
                type: res.data.data.order_type,
                status: 'Completed',
              },
              discount:{
                type: res.data.data.discount_type,
                amount: res.data.data.discount,
              }
            },
            loading: false
          })
        })
        .catch((err) => {
          let error;
          err = err.response;
          if (err.status === 401 || err.statusText === "Unauthorized") {
            auth.afterLogout();
            this.props.history.push("/login");
          } else if (err.status === 404) {
            error =
              "Opps! Something went wrong, Please call to adminstrator at +91-8954836965";
          } else {
            error = err.data.message;
          }
          this.setState({
            error: error,
          });
        });
    });
  }

  render() {
    return (
      <Layout pathname={this.props.location.pathname} page="Invoice Detail">
        <div className="mb-4">
          <button
            className="btn btn-primary"
            onClick={this.props.history.goBack}
          >
            <i className="fa fa-arrow-left"></i> Back
          </button>
        </div>

        {this.state.loading || !this.state.data.products.length ? (
          <PageLoader error={this.state.error} />
        ) : (
          <Detail data={this.state.data} />
        )}
      </Layout>
    );
  }
}

export default InvoiceDetail;
