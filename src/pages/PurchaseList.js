import React, { Component } from 'react';
import axios from 'axios';

import Layout from '../layouts/RetailLayout';

import auth from '../services/AuthService';
import UrlService from '../services/UrlService';
import PageLoader from '../components/PageLoader';
import Table from '../pages/purchaseList/Table';
class PurchaseList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
            isLoader : true,
            response : ""
        }
    }
    componentDidMount() {
        axios.get( UrlService.purchasedListUrl(),{
            headers : auth.apiHeader(),
        }).then( res => {
             if(res.data.success){
                
                this.setState({
                    data: res.data.data,
                    isLoader : false,
                },()=>{
                    window.setDataTable();
                });
             }else{
                this.setState({
                    response : res.data.message,
                });
             }
        } ).catch( err =>{
            err = err.response;
          if(err.status === 401 || err.statusText === "Unauthorized" )
           {
                 auth.afterLogout();
                 this.props.history.push("/login");
           }else if(err.status === 404){
            this.setState({
              response : "Opps! Something went wrong, Please call to adminstrator at +91-8954836965",
          });
           }else{
            this.setState({
              response : err.data.message,
          });
           }
        }); 
        

      }

    render() {

        console.log("purchase  render");
 
        return (
          <Layout 
             pathname={this.props.location.pathname}  
             page="Purchased List">
                {
                 (this.state.isLoader)
                 ?<PageLoader error={this.state.response}/>
                 :<Table data={this.state.data}/>
                }                
           </Layout>
        );
    }
}

export default PurchaseList;