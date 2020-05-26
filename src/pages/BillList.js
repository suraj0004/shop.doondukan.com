import React, { Component } from 'react';
import axios from 'axios';

import Layout from '../layouts/RetailLayout';

import auth from '../services/AuthService';
import UrlService from '../services/UrlService';
import PageLoader from '../components/PageLoader';
import PaginatedData from './billList/PaginatedData';


class BillList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoader: true,
      response: ""
    }

    this.getBills = this.getBills.bind(this);
  }

  getBills(page = 1) {
    this.setState({
      isLoader: true,
    }, () => {
      axios.get(UrlService.billListUrl() + `?page=${page}`, {
        headers: auth.apiHeader()
      }).then(res => {
        if (res.data.success) {
          this.setState({
            data: res.data.data,
            isLoader: false
          })
        } else {
          this.setState({
            response: res.data.message
          });
        }
      }).catch(err => {

        err = err.response;
        console.log(err);
        if(err.status === 401 || err.statusText === "Unauthorized" )
         {
               auth.afterLogout();
               this.props.history.push("/login");
         }else if(err.status === 404){
          this.setState({
            response : "Opps! Something went wrong, Please call to adminstrator at +91-8954836965",
        });
         }
         else{
          this.setState({
            response : err.data.message,
        });
         }

      });
    })


  }



  componentDidMount() {

    this.getBills(1);


  }


  render() {

    return (
      <Layout
        pathname={this.props.location.pathname}
        page="Bills">
        {
          (this.state.isLoader)
            ? <PageLoader error={this.state.response} />
            : <PaginatedData data={this.state.data} getBills={this.getBills} />
        }
      </Layout>
    );
  }
}

export default BillList;