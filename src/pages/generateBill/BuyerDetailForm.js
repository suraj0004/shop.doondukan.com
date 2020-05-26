import React from 'react';
import Modal from "react-bootstrap/Modal";
import Select from 'react-select';
function BuyerDetailForm(props) {
  const {buyer_name,buyer_email,buyer_mobile,discount,selectedOption} = props.buyer;
  const options = [
    {value : "rupees" , label : "In Rs."},
    {value : "percentage" , label : "In %."},
  ]
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
                        value={buyer_name}
                        placeholder="Enter name"
                        onChange={ props.handleBuyerDetails}  
                        />
          </div>
            <div className="form-group">
                    <label htmlFor="buyer_email">Email address</label>
                    <input  
                          onChange={ props.handleBuyerDetails}  
                          value={buyer_email} 
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
                         value={buyer_mobile} 
                         type="text" 
                         className="form-control" 
                         id="buyer_mobile" 
                         name="buyer_mobile" 
                         placeholder="Enter mobile number"/>
              </div>
              <div className="form-group">
                    <label htmlFor="discount_type">Discount Type</label>
                    <Select
                           value={selectedOption}
                           onChange={ (e) => props.handleDiscountTypeChange(e) }
                           options={options}
                           />
              </div>
              <div className="form-group">
                    <label htmlFor="discount">Discount</label>
                    <input  
                         onChange={ props.handleBuyerDetails}  
                         value={discount} 
                         type="text" 
                         className="form-control" 
                         id="discount" 
                         name="discount" 
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