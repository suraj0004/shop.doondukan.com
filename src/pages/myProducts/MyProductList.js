import React, { Component } from 'react';
import ContentLoader from 'react-content-loader';
import axios from 'axios';

import UrlService from '../../services/UrlService';
import auth from '../../services/AuthService';

import Layout from '../../layouts/RetailLayout';
import AddProduct from './AddProductModal';
import Table from './Table';


const MyLoader = () => {
  return (
    <ContentLoader
      speed={2}
      // width={474}
      // height={160}
      viewBox="0 0 474 160"
      backgroundColor="#e1dada"
      foregroundColor="#b3adad"
    >
      <rect x="0" y="2" rx="0" ry="0" width="600" height="20" />
      <rect x="0" y="30" rx="0" ry="0" width="600" height="300" />
    </ContentLoader>
  )
}

class MyProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      data: null,
      error: "",
    }
  }

  handleAddProduct = (row) => {
     var data = this.state.data;
     data.unshift(row);
     this.setState({
       data : data,
     });
  }

  componentDidMount() {
     axios.get(UrlService.GetCustomeProductListUrl(),{
       headers : auth.apiHeader()
     }).then(res =>{
           console.log(res);
           if(res.data.success){
            this.setState({
              loader:false,
              data : res.data.data,
              error: ""
            });
           }else{
            this.setState({
              loader:false,
              data : null,
              error: res.data.message
            });
           }
     }).catch(err => {
      console.log(err);
      this.setState({
        loader:false,
        data : null,
        error:  "Opps! Something went wrong. Please try again or contact to Adminstrator"
      });

     })
  }

  render() {
    return (
      <Layout pathname={this.props.location.pathname} page="My Custom Product List">

        <AddProduct handleAddProduct={this.handleAddProduct} />

        <div className="card">
          <div className="card-header">
            <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#add_product"><i className="fa fa-plus"></i> Add Product  </button>
          </div>

          <div className="card-body">
            {
              this.state.loader
                ? <MyLoader />
                : <Table data={this.state.data}/>
            }

          </div>
        </div>



      </Layout>
    );
  }
}

export default MyProductList;