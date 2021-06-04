import React, { Component } from 'react';
import OrderCard from './OrderCard';
import axios from 'axios';
import UrlService from '../../services/UrlService';
import auth from '../../services/AuthService';
import Layout from '../../layouts/RetailLayout';
import PageLoader from '../../components/PageLoader';

class orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
          data: null,
          status: "",
          search : "",
          isLoader: true,
          response: ""
        }
        this.getOrders = this.getOrders.bind(this);
      }

  
      componentWillMount() {

        this.getOrders();
        
      }

      updateState(id, status) {
  
        const postData = {
              id  : id,
              status : status
    
          };
        axios.post(UrlService.updateOrderStatus(), postData,  {
            headers: auth.apiHeader()
        }).then(res=>{
             console.log(res, 'success');
             this.getOrders();
             
        }).catch(err=> {
              console.log(err, 'error');
              
        })
    
      
     }; 









      getOrders() {

        this.setState({
          isLoader:true
        })

        axios.get(UrlService.getOrders(),{
          headers: auth.apiHeader()
        }).then(res=> {
          console.log(res.data.data, 'ssss');
          
          if (res.data) {
            this.setState({
              data: res.data.data,
              isLoader: false,
              response : "",
            },()=>{
              window.setDataTable();
            })
            console.log(this.state.data);
            

          } else {
            this.setState({
              isLoader : false,
              response: res.data.message
            });
           
          }
           
          //  console.log(res, 'success');
      }).catch(err=> {
          console.log(err, 'error');
          
      })

    }
      

      render() {
        return (
            <Layout pathname={this.props.location.pathname} page="Order Management" >
                {
                  (this.state.isLoader) ? 
                  <PageLoader error={this.state.response} />
                  : <React.Fragment>
                    <div className="row">
                         <OrderCard data={this.state.data} getOrders={this.getOrders} updateState={this.updateState}/>
                    </div>
                  </React.Fragment>
                }
            </Layout> 
           
        );
      }

   
}

export default orders;