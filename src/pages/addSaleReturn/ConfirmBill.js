import React from 'react';

function ConfirmBill(props) {
  
    const {handleConfirmBillSubmmit,bill_id,handleConfirmBillChnage } = props;
    return (
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
        <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Return Sale</h3>
      </div>
      
      
      <form className="form-horizontal" onSubmit={handleConfirmBillSubmmit}>
        <div className="card-body">
             
           
          <div className="form-group row">
            <label  className="col-sm-1 col-form-label"> <i className="fa fa-file"></i> </label>
            <div className="col-sm-11">
              <input value={bill_id} type="bill_id" className="form-control" name="bill_id" placeholder="Enter Your Bill Number" onChange={handleConfirmBillChnage}
              autoFocus />
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

export default ConfirmBill;