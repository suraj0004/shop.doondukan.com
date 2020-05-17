import React from 'react';

function Card(props) {
    const { customer_name, customer_email, customer_mobile } = props.bill;
    return (
        <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch" >
            <div className="card bg-light" style={{width:'inherit'}}>
                <div className="card-header text-muted border-bottom-1">
                    BILL No:  <strong>ABCD-0001</strong> 
                </div>
                <div className="card-body">
            
                            <h2 className="lead"><b>{customer_name}</b></h2>
                            <p className="text-muted border-bottom-0"> {customer_email} </p>
                            <p className="text-muted border-bottom-0"> {customer_mobile} </p>
                            <hr />
                            <p className="text-muted text-sm"><b>Total Item Sold: </b> 5 Products</p>
                            <p className="text-muted text-sm"><b>Total Price: </b> Rs. 250 /- </p>
                        
                </div>
                <div className="card-footer">
                    <div className="text-right">
                        <a href="#" className="btn btn-sm btn-primary">
                            View Full Bill
                         </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;