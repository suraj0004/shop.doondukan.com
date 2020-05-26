import React, { Component } from 'react';
import Layout from '../layouts/RetailLayout';
import PageLoader from '../components/PageLoader';

import Info from './invoice/Info';
import Table from './invoice/Table';

import axios from 'axios';
import UrlService from '../services/UrlService';
import auth from '../services/AuthService';

class Invoice extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoader : true,
            response : "",
            id : props.match.params.id,
            from : null,
            to : null,
            store : null,
            sales : null,
        }
        
    }

    printInvoice = () =>{
        window.print();
    }

    componentDidMount(){
      axios.get(UrlService.invoiceUrl() + this.state.id,{
        headers : auth.apiHeader()
      }).then(res =>{
        if(res.data.success){

          console.log(res);
          const total = res.data.data.sales.reduce((a,b) => {
            return (a.price * a.quantity) + (b.price * b.quantity);
          })
          this.setState({
            isLoader : false,
            to : {
              name : res.data.data.customer_name,
              email : res.data.data.customer_email,
              mobile : res.data.data.customer_mobile,
              discount_type : res.data.data.discount_type,
              discount : res.data.data.discount,
              date : res.data.data.created_at,
              bill_id : (res.data.data.id).toString(),
            },
            from : {
              name : res.data.data.store.name,
              email : res.data.data.store.email,
              mobile : res.data.data.store.mobile,
              address : res.data.data.store.address,
              logo : UrlService.shopImageUrl()+ res.data.data.store.user_id + '/' + res.data.data.store.logo,
            },
            sales : res.data.data.sales,
            total : total,
            
          })

        }else{
          this.setState({
            response : res.data.message,
        });
        }
        
      }).catch(err=>{
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
      })
    }


    render() {
        return (
            <Layout 
               pathname={this.props.location.pathname}  
               page="Invoice">
                  {
                   (this.state.isLoader)
                   ?<PageLoader error={this.state.response}/>
                  :  <div className="invoice p-3 mb-3">
                  
                  <div className="row">
                    <div className="col-12">
                      <h4>
                        <i className="fas fa-building"></i> {this.state.from.name}
                  <small className="float-right">Date: {this.state.to.date}</small>
                      </h4>
                    </div>
                    
                  </div>
                  <hr/>
                  <div className="row invoice-info">
                    
                  <div className="col-sm-2 invoice-col text-left img-responsive">
                    
                    <img src={this.state.from.logo} className="profile-user-img img-fluid img-circle"
               alt="Shop picture"
                 style={{height:"150px",width:"150px"}} />
                  
                    </div>

                    <Info label="From" data={ this.state.from } />
                    <Info label="To" data={ this.state.to } />
                 
                    
                    <div className="col-sm-4 invoice-col text-right">
                      <b>Invoice #{  (this.state.to.bill_id).padStart('4','0') }</b><br/>
                  
                    </div>
                    
                  </div>
                  
    
                  <Table data = {this.state.sales} />
           
                  
    
                  <div className="row">
                    
                    <div className="col-6">
                      {/* <p className="lead">Payment Methods:</p>
                      <img src="/asset/dist/img/credit/visa.png" alt="Visa"/>
                      <img src="/asset/dist/img/credit/mastercard.png" alt="Mastercard"/>
                      <img src="/asset/dist/img/credit/american-express.png" alt="American Express"/>
                      <img src="/asset/dist/img/credit/paypal2.png" alt="Paypal"/>
    
                      <p className="text-muted well well-sm shadow-none" style={{marginTop: '10px'}}>
                        Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles, weebly ning heekya handango imeem
                        plugg
                        dopplr jibjab, movity jajah plickers sifteo edmodo ifttt zimbra.
                      </p> */}
                    </div>
                    
                    <div className="col-6">
                     
    
                      <div className="table-responsive">
                        <table className="table">
                         <tbody>
                         {/* <tr>
                            <th style={{width:'50%'}}>Subtotal:</th>
                            <td>$250.30</td>
                          </tr>
                          <tr>
                            <th>Tax (9.3%)</th>
                            <td>$10.34</td>
                          </tr>
                          <tr>
                            <th>Shipping:</th>
                            <td>$5.80</td>
                          </tr> */}
                          <tr>
                            <th>Total:</th>
                            <td> Rs. {this.state.total} /- </td>
                          </tr>
                         </tbody>
                        </table>
                      </div>
                    </div>
                    
                  </div>
                  
    
                  
                  <div className="row no-print">
                    <div className="col-12">
                      <button  className="btn btn-default" onClick={this.printInvoice}><i className="fas fa-print"></i> Print</button>
                      <button type="button" className="btn btn-success float-right"><i className="far fa-credit-card"></i> Submit
                        Payment
                      </button>
                      <button type="button" className="btn btn-primary float-right" style={{marginRight: '5px'}}>
                        <i className="fas fa-download"></i> Generate PDF
                      </button>
                    </div>
                  </div>
                </div>
                  }                
             </Layout>
          );
    }
}

export default Invoice;