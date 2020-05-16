import React, { Component } from 'react';
import {withRouter }from 'react-router-dom';
import auth from '../services/AuthService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import PageHeader from '../components/PageHeader';
import PageLoader from '../components/PageLoader';
class RetailLayout extends Component {
  constructor(props) {
    super(props);
     this.state = {
       isLoader : false
     }
  }

  componentDidMount(){
   
   
    // console.log(window);
    // var script = document.createElement("script");
    // script.src = "/asset/dist/js/adminlte.js";
    // script.defer = false;  
    // document.body.appendChild(script);
  
    // script = document.createElement("script");
    // script.src = "/asset/dist/js/demo.js";
    // script.defer = false;  
    // document.body.appendChild(script);
    
    }

  
 

  handleLogout = () => {
    this.setState({
      isLoader:true
    },()=>{
      auth.logout( (success) =>{
        if(success){
            auth.afterLogout();
            this.props.history.push('/login');
        }else{
            alert("Opps! something went wrong.");
            this.setState({
              isLoader:false,
            })
        }
   } );
    })
  }

  render(){
    return (
      <div className="wrapper"> 
      {
        (this.state.isLoader)
        ?     <div className="hold-transition login-page">  <PageLoader error=""/> </div>
        :
          <React.Fragment>
             <Header handleLogout={this.handleLogout} />
          <Sidebar  pathname={this.props.pathname}/>
          <div className="content-wrapper">
              
          <PageHeader page={this.props.page}/>
          <section className="content">
               <div className="row">
                     <div className="col-12">
                       {this.props.children}
                     </div>
               </div>
          </section>
          </div>
          <Footer />
          
          </React.Fragment>
        } 
          
    </div>
  ); 
  }
  
     
}

export default withRouter(RetailLayout);