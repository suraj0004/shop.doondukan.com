import React, { Component } from 'react';
import Layout from '../layouts/RetailLayout';
import PageLoader from '../components/PageLoader';
import ProfileComponent from './profile/Profile';
import ConfirmPassword from './profile/ConfirmPassword';
import axios from 'axios';
import UrlService from '../services/UrlService';
import auth from '../services/AuthService';
class Profile extends Component {

    constructor(props){

        super(props);
        this.state = {
            lock : true,
            password : "",
            isLoader : false,
            response : "",
            responseClass : "text-danger",

        }
        
    }

handleConfirmPasswordChnage = (event) => {
    this.setState({
      password : event.target.value
    });
}


handleConfirmPasswordSubmmit = (event) => {
  event.preventDefault();
    this.setState({
      response : "",
      isLoader : true,
    },() => {
      axios.post(UrlService.confirmPasswordUrl(), { password : this.state.password }, {
        headers : auth.apiHeader()
      } ).then( res => {

        if(res.data.success){
            this.setState({
              isLoader : false,
              lock : false,
              response : ""
            });
        }else{
          this.setState({
            isLoader : false,
            response : res.data.message,
            lock : true,
        });
        }

      } ).catch(err => {
      
        err = err.response;
        if(err.status === 401 || err.statusText === "Unauthorized" )
         {
               auth.afterLogout();
               this.props.history.push("/login");
         }else if(err.status === 404){
          this.setState({
            response : "Opps! Something went wrong, Please call to adminstrator at +91-8954836965",
            lock : true,
        });
         }else{
          this.setState({
            response : err.data.message,
            lock : true,
        });
         }
      });
    });
}
    render() {
        return (
            <Layout 
            pathname={this.props.location.pathname}  
            page="My Profile">
               { 
               (this.state.isLoader)
               ?<PageLoader error={this.state.response}/>
               :(
               (this.state.lock)
                ?<ConfirmPassword  
                password = {this.state.password}
                handleConfirmPasswordSubmmit = {this.handleConfirmPasswordSubmmit}
                handleConfirmPasswordChnage = {this.handleConfirmPasswordChnage}
                error = {this.state.response}
                />
                : <ProfileComponent/>
               )}                
          </Layout>
        );
    }
}

export default Profile;