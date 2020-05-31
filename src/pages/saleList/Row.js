import React from 'react';
import {Link} from 'react-router-dom';
function Row(props) {
    const {bill_id,date,name,weight,weight_type,brand,quantity,price,status} = props;
    var statusHtml;
    if(status === "paid"){
     statusHtml = <span className="badge badge-success">Paid</span>
    }else{
         statusHtml = <span className="badge badge-warning">Un-Paid</span>
    }
    return (
        <tr>
        <td>  <Link to={"/invoice/"+bill_id} className="btn btn-default" style={{marginTop:'-5px'}}> #{(bill_id).toString().padStart("4","0")} <i className="fa fa-file"></i></Link> </td>
        <td> {statusHtml} </td>
        <td> {date} </td>
        <td> { ` ${name} | ${weight} ${weight_type} | ${brand} ` } </td>
    <td>{quantity} Pcs. @ Rs. {price}/- per Pcs </td>
        <td> Rs.  {  price*quantity  } /- </td>
    </tr>
    );
}

export default Row;