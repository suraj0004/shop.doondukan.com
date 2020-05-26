import React, { Component } from 'react';
import axios from 'axios';
import UrlService from '../../services/UrlService';
import auth from '../../services/AuthService';
import PageLoader from '../../components/PageLoader';
class AccountSettingForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      response : "",
      responseClass : "text-danger",
      isLoader : false,
    };
  }

  

  handleInputChange = (event) => {

    var user = this.state.data;
   var response = "", responseClass = "text-danger";
    switch (event.target.name) {
      case 'name':
        user.name = event.target.value;
        break;
      case 'email':
        user.email = event.target.value;
        break;
      case 'mobile':
        user.mobile = event.target.value;
        break;
      case 'password':
        user.password = event.target.value;
        if( user.c_password && user.password !== user.c_password){
          response = "Confirm Password is incorrect";
        }
        break; 
      case 'c_password':
          user.c_password = event.target.value;
          if(user.password !== user.c_password){
            response = "Confirm Password is incorrect";
          }
       break; 
      case 'image':
        user.image = event.target.files[0];
        break; 
      default:
        break;
    }

    this.setState({
      data : user,
      response : response,
      responseClass : responseClass
    });
  }


  handleSubmit = (event) => {
    event.preventDefault();
  var user = this.state.data;
    if(user.name === "" || user.name === null ){

      this.setState({
        response : "Name Can't be empty.",
        responseClass : "text-danger",
      });
      return;
    }

    if(user.email === "" || user.email === null ){

      this.setState({
        response : "Enail Can't be empty.",
        responseClass : "text-danger",
      });
    return;
  }

  if(user.mobile === "" || user.mobile === null ){

    this.setState({
      response : "Mobile Can't be empty.",
      responseClass : "text-danger",
    });
  return;
}

if( (user.password) && user.password !== user.c_password  ){
  
  this.setState({
    response : "Confirm Password is incorrect",
    responseClass : "text-danger",
  });
return;
}



    this.setState({
      isLoader:true,
      response : "",
    }, () => {

      const user = this.state.data;
      var data = new FormData();
      data.append("name",user.name);
      data.append("email",user.email);
      data.append("phone",user.mobile);
      data.append("password", user.password );
      data.append("c_password", user.c_password );
      if(user.image){
      data.append("image", user.image, user.image.name );
      }
      axios.post( UrlService.profileUserSettingUrl(), data , {
        headers : auth.apiHeader()
      }).then(res => {
         if(res.data.success){
            var user = this.state.data;
            user.password = "";
            user.c_password = "";
            user.image = null;
          this.setState({
            isLoader: false,
            data : user,
            response : "Data Saved Successfully",
            responseClass : "text-success",
          });

         }else{
          this.setState({
            isLoader: false,
            response : res.data.message,
            responseClass : "text-danger",
          });

         }
      }).catch(err => {
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
    });


  }









  render() {
    const {response,responseClass,data} = this.state;
    const {name,email,mobile,password,c_password,image} = data;
    return (
        this.state.isLoader
        ?<PageLoader error={response}/>
        :<form className="form-horizontal" onSubmit={this.handleSubmit} >
        <div className={responseClass}> {response} </div>
    <div className="form-group row">
      <label htmlFor="username" className="col-sm-2 col-form-label">Owner Name</label>
      <div className="col-sm-10">
        <input 
           type="text" 
           className="form-control" 
           id="username" 
           name="name"
           placeholder="Name"
           value={name}
           onChange={this.handleInputChange}
           />
      </div>
    </div>
    <div className="form-group row">
      <label htmlFor="useremail" className="col-sm-2 col-form-label">Owner Email</label>
      <div className="col-sm-10">
        <input  
          type="text" 
          className="form-control" 
          id="useremail" 
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.handleInputChange}
          />
      </div>
    </div>
    <div className="form-group row">
      <label htmlFor="usermobile" className="col-sm-2 col-form-label">Owner Mobile</label>
      <div className="col-sm-10">
        <input 
           type="text" 
           className="form-control" 
           id="usermobile"
           name="mobile" 
           placeholder="Mobile Number"
           value={mobile}
           onChange={this.handleInputChange}
           />
      </div>
    </div>

    <div className="form-group row">
      <label htmlFor="newpassword" className="col-sm-2 col-form-label">New password</label>
      <div className="col-sm-10">
        <input 
           type="password" 
           className="form-control" 
           id="newpassword"
           name="password" 
           placeholder="New Password "
           value={password}
           onChange={this.handleInputChange}
           />
      </div>
    </div>

    <div className="form-group row">
      <label htmlFor="c_password" className="col-sm-2 col-form-label">Confirm password</label>
      <div className="col-sm-10">
        <input 
           type="password" 
           className="form-control" 
           id="c_password"
           name="c_password" 
           placeholder="Confirm Password "
           value={c_password}
           onChange={this.handleInputChange}
           />
      </div>
    </div>

    <div className="form-group row">
      <label htmlFor="userimage" className="col-sm-2 col-form-label">Owner Image</label>
      <div className="col-sm-10">
      <div className="custom-file">
                  <input type="file" className="custom-file-input" id="userimage" name="image" onChange={this.handleInputChange} />
                  <label className="custom-file-label" htmlFor="userimage"> {(image === null)?"Choose file":image.name } </label>
                </div>
      </div>
    </div>
    
  
    {/* <div className="form-group row">
      <div className="offset-sm-2 col-sm-10">
        <div className="checkbox">
          <label>
            <input type="checkbox"/> I agree to the <a href="#">terms and conditions</a>
          </label>
        </div>
      </div>
    </div> */}
    <div className="form-group text-center">
      
        <button type="submit" className="btn btn-primary btn-lg">Submit</button>
      
    </div>
  </form>
    );
  }
}

export default AccountSettingForm;