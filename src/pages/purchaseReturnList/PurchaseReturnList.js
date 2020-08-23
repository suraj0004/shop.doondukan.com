import React, { Component } from 'react';
import axios from 'axios';
import ContentLoader from 'react-content-loader';
import Layout from '../../layouts/RetailLayout';
import auth from '../../services/AuthService';
import UrlService from '../../services/UrlService';
import Table from './Table';
import {Link} from 'react-router-dom';


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

class PurchaseReturnList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loader: true,
          data: null,
          error: "",
        }
      }

    componentDidMount(){
        axios.get(UrlService.returnPurchaseListURL(),{
            headers : auth.apiHeader()
        }).then(res => {
console.log(res)
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
        });
    }

    render() {
        return (
            <Layout  pathname={this.props.location.pathname} page="Purchase Return List" >

<div className="card">
          <div className="card-header">
          <Link to="/addPurchaseReturn" className="btn btn-outline-primary" ><i className="fa fa-plus"></i> Add Return  </Link>
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

export default PurchaseReturnList;