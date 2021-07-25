import React, { Component } from "react";
import Layout from "../../../../layouts/RetailLayout";
import PageLoader from "../../../../components/PageLoader";
import Detail from "./Detail";
import OrderActions from "./OrderActions";
import axios from "axios";
import UrlService from "../../../../services/UrlService";
import auth from "../../../../services/AuthService";

class OrderDetail extends Component {
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
    this.getData = this.getData.bind(this)
    this.orderStatusUpdated = this.orderStatusUpdated.bind(this)
  }

  getData() {
    this.setState({ loading: true }, () => {
      axios
        .get(UrlService.orderDetailUrl() + this.state.id, {
          headers: auth.apiHeader(),
        })
        .then((res) => {
          console.log(res);
          this.setState({
            data:{
              products: res.data.data.orderitem,
              buyer:res.data.data.buyer,
              shipping_address: res.data.data.shipping_address,
              meta:{
                order_number: res.data.data.order_no,
                date: res.data.data.created_at,
                type: "Online",
                status: res.data.data.status,
                delivery_type: res.data.data.delivery_type,
                from_time: res.data.data.from_time,
                to_time: res.data.data.to_time,
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

  componentDidMount() {
  this.getData()
  }

  orderStatusUpdated(){
    this.getData()
  }

  render() {
    return (
      <Layout pathname={this.props.location.pathname} page="Invoice Detail">
        {this.state.loading || !this.state.data.products.length ? (
          <PageLoader error={this.state.error} />
        ) : (
          <>
          <OrderActions 
            status={this.state.data.meta.status} 
            id={this.state.id}
            orderStatusUpdated={this.orderStatusUpdated}
            />
          <Detail data={this.state.data} />
          </>
        )}
      </Layout>
    );
  }
}

export default OrderDetail;
