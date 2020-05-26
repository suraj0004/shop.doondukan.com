import React from 'react';
import {Link} from 'react-router-dom';
function Row(props) {
    const {bill_id,date,name,weight,weight_type,brand,quantity,price} = props;
    return (
        <tr>
        <td>  <Link to={"/invoice/"+bill_id} className="btn btn-default" style={{marginTop:'-5px'}}>  ABCD-{bill_id} <i className="fa fa-file"></i></Link> </td>
        <td> {date} </td>
        <td> { ` ${name} | ${weight} ${weight_type} | ${brand} ` } </td>
    <td>{quantity} Pcs. @ Rs. {price}/- per Pcs </td>
        <td> Rs.  {  price*quantity  } /- </td>
    </tr>
    );
}

export default Row;