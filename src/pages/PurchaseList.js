import React, { Component } from 'react';
import axios from 'axios';

import Layout from '../layouts/RetailLayout';

import auth from '../services/AuthService';
import UrlService from '../services/UrlService';

import PageHeader from '../components/PageHeader';
class PurchaseList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [],
            isLoader : true,
        }
    }
    componentDidMount() {
   
    
        auth.isValidToken( (success) =>{
          if(success){
              auth.afterLogout();
             this.props.history.push("/login"); 
          }
        });

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
      }

    render() {
        return (
          <Layout pathname={this.props.location.pathname} isLoader={this.state.isLoader} >

<PageHeader page="Purchased List"/>
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
                  <th>Purchased Date</th>
                  <th>Product Detail</th>
                  <th>Purchased Quantity</th>
                  <th>Purchased Price (Per Piece)</th>
                  <th>Total Price</th>
                  
                </tr>
                </thead>
                <tbody>
                    {
                        this.state.data.map( (item,index) => {
                          
                         return (
                           
                            <tr key={index.toString() } >
                            <td> {index + 1 } </td>
                            <td> { item.created_at } </td>
                            <td> { item.product.name + " | " + item.product.weight + item.product.weight_type + " | " +  item.product.brand } </td>
                            <td> {item.quantity} </td>
                            <td> {item.price} </td>
                            <td>{item.quantity * item.price } </td>
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

export default PurchaseList;