import React from 'react';
import Modal from "react-bootstrap/Modal";
function BuyerDetailForm(props) {
    return (
        <Modal show={props.show} >
        <Modal.Header className="bg-primary">
       
          <Modal.Title >
            Buyer Details 
            </Modal.Title>
            <button className="btn btn-xs btn-danger" onClick={props.hideModal} style={{float:'right'}}> <i className="fa fa-times"></i> </button>
        </Modal.Header>
        <Modal.Body>
          <div className="text-danger"> {props.model_response} </div>
        <div className="form-group">
                    <label htmlFor="buyer_name">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="buyer_name" 
                        name="buyer_name" 
                        placeholder="Enter name"
                        onChange={ props.handleBuyerDetails}  value={props.buyer_name}
                        />
          </div>
            <div className="form-group">
                    <label htmlFor="buyer_email">Email address</label>
                    <input  
                          onChange={ props.handleBuyerDetails}  
                          value={props.buyer_email} 
                          type="email" 
                          className="form-control" 
                          id="buyer_email" 
                          name="buyer_email" 
                          placeholder="Enter email"/>
              </div>
         <div className="form-group">
                    <label htmlFor="buyer_mobile">Mobile</label>
                    <input  
                         onChange={ props.handleBuyerDetails}  
                         value={props.buyer_mobile} 
                         type="text" 
                         className="form-control" 
                         id="buyer_mobile" 
                         name="buyer_mobile" 
                         placeholder="Enter mobile number"/>
              </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-info" onClick={props.handleSkipSubmit}>Skip &amp; Continue</button>
          <button className="btn btn-primary" onClick={props.handleSaveSubmit} >Save &amp; Continue </button>
        </Modal.Footer>
      </Modal>
    );
}

export default BuyerDetailForm;