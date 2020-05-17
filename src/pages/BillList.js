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
        console.log(res.data);
        this.setState({
          data: res.data,
          isLoader: false
        })
      }).catch(err => {
        console.log(err);
        this.setState({
          response: err.statusText
        })
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