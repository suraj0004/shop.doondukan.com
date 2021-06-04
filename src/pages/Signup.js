import React, { useState  } from 'react';
import axios from 'axios';
import auth from '../services/AuthService';
// import PageLoader from '../components/PageLoader';
import UrlService from '../services/UrlService';
import { Link } from 'react-router-dom';

const Signup = (props) => {
	const [userData,setUserData] = useState({
		name:"",
		email:"",
		phone:"",
		password:"",
		c_password:"",
	});
	const [error,setError] = useState("");
	const [lat,setlat] = useState("");
	const [lng,setlng] = useState("");
	const handleInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setUserData({...userData, [name]: value });
	}
	const handleLocation = (e) => {
		if (navigator.geolocation) {
			if(e.target.checked){
    		navigator.geolocation.getCurrentPosition(showPosition, showError);
    	} 
  	} else { 
    	setError("Geolocation is not supported by this browser.");
  	}
	}
	const showPosition = (position) => {
		setError("");
		setlat(position.coords.latitude);
    setlng(position.coords.longitude);
	}
	const showError = (error) => {
		document.getElementById("locationId").checked = false;
		switch(error.code) {
	    case error.PERMISSION_DENIED:
	       setError("Please Allow Location Permission");
	      break;
	    case error.POSITION_UNAVAILABLE:
	      setError("Location information is unavailable.");
	      break;
	    case error.TIMEOUT:
	     setError("The request to get user location timed out.Try again.");
	      break;
	    case error.UNKNOWN_ERROR:
	      setError("An unknown error occurred.Please try again.");
	      break;
		default:
			console.log("default");
  		}
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		try {
					var location;
					var userPostData;
					location = {
						lat: lat,
						lng: lng
					}
					userPostData = {
						...userData,
						...location
					}
            axios.post( UrlService.signUpUrl() , userPostData, {
                headers : {
                  "Accept" : "application/json",
                  "Content-Type" : "application/json",
                }
            })
            .then( (response) => {
				console.log("response");
				console.log(response);
                if(response.data.success){
                	auth.afterLogin(response.data,false);
                  setTimeout(() => {
					props.history.push('/profile');
				  }, 250);
             	} else {
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
				        <div className="mb-3 row">
				        	<div className="col-2">
				          	<input type="checkbox" name="location"
				          	 onClick={handleLocation} id="locationId" required/>
				          	<input type="hidden" value={lat} name="lat" id="lat"/>
				          	<input type="hidden" value={lng} name="lng" id="lng"/>
				          </div>
				          <div className="col-8">
				          	<label>Allow Location Permission</label>
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
				        <Link to="/login" className="btn btn-block btn-success">
				          <i className="mr-2"></i>
				          Login
				        </Link>
				      </div>
				    </div>
  				</div>
			</div>
		</div>
	)
}

export default Signup