import React, { Component } from 'react';
import axios from 'axios';
import Layout from '../layouts/RetailLayout';

import auth from '../services/AuthService';
import UrlService from '../services/UrlService';
import PageLoader from '../components/PageLoader';
import Table from '../pages/saleList/Table';
class SaleList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
            isLoader : true,
            response : ""
        }
    }
    componentDidMount() {

        axios.get( UrlService.saleListUrl() ,{
            headers : auth.apiHeader(),
          } ).then( (res) => {
              if(res.data.success){
                this.setState({
                    data: res.data.data,
                    isLoader : false,
                   
                }, ()=>{
                    var script = document.createElement("script");
                    script.src = "/asset/dist/js/pages/data_table.js";
                    script.defer = true;  
                    document.body.appendChild(script);
                });
              }else{
                this.setState({
                   
                    response : res.data.message
                  }); 
              }
          } ).catch( (err) => {
              console.log(err.response);
              this.setState({
                
                response : err.response.statusText
              }); 
          } );


       
      }

    render() {
 
        return (
          <Layout 
             pathname={this.props.location.pathname}  
             page="Sale List">
                {
                 (this.state.isLoader)
                 ?<PageLoader error={this.state.response}/>
                 :<Table data={this.state.data}/>
                }                
           </Layout>
        );
    }
}

export default SaleList;