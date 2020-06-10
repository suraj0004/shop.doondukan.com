import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';

function Card(props) {
    const { customer_name, customer_email, customer_mobile, id, sales_count, sales_price,created_at  } = props.bill;
     
    if(props.bill.status && props.bill.status === "paid"){
        var status = <span className="text-right text-success float-right"><b>  <i className="fa fa-rupee-sign"></i> Paid </b></span>
    }else{
        var status = <span className="text-right text-warning float-right"><b>   <i className="fas fa-exclamation-triangle"></i> Un-Paid </b></span>
    }
    return (
        <div className="col-12 col-sm-6 col-md-3 d-flex align-items-stretch" >
            <div className="card bg-light" style={{ width: 'inherit' }}>
                <div className="card-header text-muted border-bottom-1">
                    BILL No:  <strong>#{(id.toString().padStart('4', '0'))}</strong>
                    {status}
                </div>
                <div className="card-body text-left" style={{paddingBottom : '0px'}}>

 <p className="text-muted text-sm"> <strong>
 <Moment                              
                                 local
                                 format="D MMM, YYYY h:mm a"
                                 date={ created_at }
                                 />
     </strong> </p>
                    <p className="text-muted border-bottom-0"> {(customer_name !== null) ? customer_name : "Not-Specified"} </p>
                    <p className="text-muted border-bottom-0">  {(customer_email !== null) ? customer_email : "Not-Specified"} </p>
                    <p className="text-muted border-bottom-0">  {(customer_mobile !== null) ? customer_mobile : "Not-Specified"}</p>
                    <hr />
                    <p className="text-muted text-sm"><strong>Total Item Sold: </strong> {sales_count} Products</p>
                    <p className="text-muted text-sm"><strong>Total Price: </strong> Rs. {sales_price} /- </p>
                    
                </div>
                <div className="card-footer">
                    <div className="text-center">
                        <Link to={"/invoice/" + id} className="btn btn-sm btn-primary">
                            View Full Bill
                         </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;