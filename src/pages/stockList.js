import React, { Component } from 'react';
import axion from 'axios';
import Layout from '../layouts/RetailLayout';

import auth from '../services/AuthService';
import UrlService from '../services/UrlService';

import PageHeader from '../components/PageHeader';
class stockList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
        }
    }



    componentDidMount() {
   
    
        auth.isValidToken( (success) =>{
          if(success){
              auth.afterLogout();
             this.props.history.push("/login"); 
          }
        });

        axion.get( UrlService.stockListUrl() ,{
          headers : auth.apiHeader(),
        } ).then( (res) => {
          this.setState({
            data: res.data.data,
        }, ()=>{
         var script = document.createElement("script");
         script.src = "/asset/dist/js/pages/data_table.js";
         script.defer = true;  
         document.body.appendChild(script);
        } )
        } ).catch( (err) => {
            console.log(err);
        } );


     }

    render() {

        return (
            <Layout pathname={this.props.location.pathname} >

            <PageHeader page="Stock List"/>
                          <br/>
            <section className="content">
                  <div className="row">
                    <div className="col-12">
            <div className="card">
                       
                        
                        <div className="card-body">
                          <table id="my_table" className="table table-bordered table-striped">
                            <thead>
                                
                            <tr>
                              <th>Sno.</th>
                              <th>Last purchased date</th>
                              <th>Product Detail</th>
                              <th>Total Quantity</th> 
                              <th>Selling Price</th>  
                                                      
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data.map( (item,index) => {
                                      
                                     return (
                                       
                                        <tr key={index.toString() } >
                                        <td> {index + 1 } </td>
                                        <td> { item.last_purchased_at } </td>
                                        <td> { item.product.name + " | " + item.product.weight + item.product.weight_type + " | " +  item.product.brand } </td>
                                        <td> {item.quantity} </td>
                                        <td> {item.price.price} </td>
                                        
                                      </tr>
                                     );
                                    } )
                                }
                           
                            </tbody>
                           
                          </table>
                        </div>
                        
                      </div>
            </div></div></section>
                        </Layout>
        );
    }
}

export default stockList;