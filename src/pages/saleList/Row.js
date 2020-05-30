import React from 'react';
import {Link} from 'react-router-dom';
function Row(props) {
    const {bill_id,date,name,weight,weight_type,brand,quantity,price,status} = props;
    var statusHtml;
    if(status === "Paid"){
     statusHtml = <span className=" text-success"><b>  <i className="fa fa-rupee-sign"></i> Paid </b></span>
    }else{
         statusHtml = <span className=" text-warning"><b>   <i class="fas fa-exclamation-triangle"></i> Un-Paid </b></span>
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