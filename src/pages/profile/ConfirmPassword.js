import React from 'react';

function ConfirmPassword(props) {
  
    return (
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
        <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Confirm password to access this page</h3>
      </div>
      
      
      <form className="form-horizontal" onSubmit={props.handleConfirmPasswordSubmmit}>
        <div className="card-body">
             
             <div className="text-danger">  {props.error} </div>
          <div className="form-group row">
            <label  className="col-sm-1 col-form-label"> <i className="fa fa-lock"></i> </label>
            <div className="col-sm-11">
              <input value={props.password} type="password" className="form-control" name="password" placeholder="Enter Your Password" onChange={props.handleConfirmPasswordChnage} />
            </div>
          </div>
          
        </div>
        
        <div className="card-footer">
          <button type="submit" className="btn btn-primary float-right">Confirm</button>
        </div>
        
      </form>
    </div>
        </div>
      </div>
    );
}

export default ConfirmPassword;