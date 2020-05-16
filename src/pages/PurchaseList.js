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
            console.log(res);
           this.setState({
               data: res.data.data,
           }, ()=>{
            var script = document.createElement("script");
            script.src = "/asset/dist/js/pages/data_table.js";
            script.defer = true;  
            document.body.appendChild(script);
            this.setState({
              isLoader : false,
            });
           })
        } ).catch( err =>{
            console.log(err);
            this.setState({
              isLoader : false,
            });
        }); 
        
        // setTimeout(() => {
        //   auth.isValidToken( (success) =>{
        //     if(success){
        //         auth.afterLogout();
        //        this.props.history.push("/login"); 
        //     }
        //   });
        // }, 5000);
      }

    render() {
 
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