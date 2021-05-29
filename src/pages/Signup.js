import React, { useState  } from 'react';
import axios from 'axios';
import auth from '../services/AuthService';
import PageLoader from '../components/PageLoader';
import UrlService from '../services/UrlService';
const Signup = (props) => {
	const [userData,setUserData] = useState({
		name:"",
		email:"",
		phone:"",
		password:"",
		c_password:"",
	});
	const [error,setError] = useState("");
	const handleInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setUserData({...userData, [name]: value });
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
            axios.post( UrlService.signUpUrl() , userData, {
                headers : {
                  "Accept" : "application/json",
                  "Content-Type" : "application/json",
                }
            })
            .then( (response) => {
                if(response.data.success){
                	auth.afterLogin(response,false);
                  props.history.push('/');
             	} else {
             			console.log(response.success);
             			setError(response.data.message);
	               	console.log(response);
             	}
            })
            .catch((error) => {
            	setError(error.message);
              console.log(error);
            });
       	} catch (error) {
       		setError(error.message);
        	console.log(error);
       }
	}
	return (
		<div className="register-page">
			<div className="register-box">
			  <div className="register-logo">
			    <a href="/"><b>Meri</b>Dukan</a>
			  </div>
			  <div className="card">
				    <div className="card-body register-card-body">
				      <p className="login-box-msg">Sign Up</p>
				       <p className="text-danger text-left">  { error } </p>
				      <form method="POST" onSubmit={handleSubmit}>
				        <div className="input-group mb-3">
				          <input type="text" className="form-control" 
				          	placeholder="Full name" name="name" value={userData.name} 
				          	onChange={handleInput} required/>
				          <div className="input-group-append">
				            <div className="input-group-text">
				              <span className="fas fa-user"></span>
				            </div>
				          </div>
				        </div>
				        <div className="input-group mb-3">
				          <input type="email" className="form-control" placeholder="Email" 
				          	name="email" value={userData.email} onChange={handleInput} />
				          <div className="input-group-append">
				            <div className="input-group-text">
				              <span className="fas fa-envelope"></span>
				            </div>
				          </div>
				        </div>
				        <div className="input-group mb-3">
				          <input type="text" className="form-control" placeholder="Phone number" 
				          	name="phone" value={userData.phone} onChange={handleInput} required/>
				          <div className="input-group-append">
				            <div className="input-group-text">
				              <span className="fas fa-envelope"></span>
				            </div>
				          </div>
				        </div>
				        <div className="input-group mb-3">
				          <input type="password" className="form-control" placeholder="Password" 
				          name="password" value={userData.password} onChange={handleInput} required/>
				          <div className="input-group-append">
				            <div className="input-group-text">
				              <span className="fas fa-lock"></span>
				            </div>
				          </div>
				        </div>
				        <div className="input-group mb-3">
				          <input type="password" value={userData.c_password} className="form-control" placeholder="Retype password" 
				          name="c_password" onChange={handleInput} required/>
				          <div className="input-group-append">
				            <div className="input-group-text">
				              <span className="fas fa-lock"></span>
				            </div>
				          </div>
				        </div>
				        <div className="row">			          
				          <div className="col-12">
				            <button type="submit" className="btn btn-primary btn-block">Register</button>
				          </div>
				        </div>
				      </form>
				      <div className="social-auth-links text-center">
				        <p>- OR -</p>
				        <a href="/login" className="btn btn-block btn-danger">
				          <i className="mr-2"></i>
				          Login
				        </a>
				      </div>
				    </div>
  				</div>
			</div>
		</div>
	)
}

export default Signup