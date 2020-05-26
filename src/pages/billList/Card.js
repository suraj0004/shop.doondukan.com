import React from 'react';
import {Link} from 'react-router-dom';

function Card(props) {
    const { customer_name, customer_email, customer_mobile, id } = props.bill;
    return (
        <div className="col-12 col-sm-6 col-md-3 d-flex align-items-stretch" >
            <div className="card bg-light" style={{ width: 'inherit' }}>
                <div className="card-header text-muted border-bottom-1">
                    BILL No:  <strong>#{id}</strong>
                </div>
                <div className="card-body text-left">

                <p className="text-muted border-bottom-0"> {(customer_name !== null)?customer_name:"Not-Specified"  } </p>
                    <p className="text-muted border-bottom-0">  {(customer_email !== null)?customer_email:"Not-Specified"  } </p>
                    <p className="text-muted border-bottom-0">  {(customer_mobile !== null)?customer_mobile:"Not-Specified"  }</p>
                    <hr />
                    <p className="text-muted text-sm"><b>Total Item Sold: </b> 5 Products</p>
                    <p className="text-muted text-sm"><b>Total Price: </b> Rs. 250 /- </p>

                </div>
                <div className="card-footer">
                    <div className="text-center">
                        <Link to={ "/invoice/"+ id } className="btn btn-sm btn-primary">
                            View Full Bill
                         </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;