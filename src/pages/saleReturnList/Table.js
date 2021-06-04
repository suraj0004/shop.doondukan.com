import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import {Link} from 'react-router-dom';

function Table(props) {
    const data = props.data ? props.data : {
        main : [],
        temp : []
    };

    var i = 1;

    return (
        <table className="table table-striped" id="my_table">
  <thead className="thead-dark">
    <tr>
      <th scope="col" className="all">#Bill No.</th>
      <th scope="col" className="all">Product</th>
      <th scope="col" className="none">Return Price (Per Pcs.)</th>
      <th scope="col" className="none">Return Quantity</th>
      <th scope="col" className="none">Total Amount</th>
      <th scope="col" className="none">Return On</th>
    </tr>
  </thead>
  <tbody>
      {
          data.main.map((row,index) => {
         
              return (
                <tr key={(row.id).toString()}>

                <th scope="row">  <Link to={"/invoice/"+row.bill_id} className="btn btn-default" style={{marginTop:'-5px'}}> #{(row.bill_id).toString().padStart("4","0")} <i className="fa fa-file"></i></Link> </th>
                <td>{ `${row.product.name} | ${row.product.weight} ${row.product.weight_type} ` }</td>
                <td>  Rs. {row.price} /- </td>
                <td>  {row.quantity} pcs </td>
                <td>  Rs. {row.price * row.quantity} /- </td>
                <td>   <Moment 
                     local
                     format="D MMM, YYYY h:mm a"
                        date={ row.created_at }
                     /> 
                </td>
              
              </tr>
              )
          })

        
      }

      {
            data.temp.map((row,index) => {
         
                return (
                  <tr key={(row.id).toString()+'_custom'}>
    
                  <th scope="row"> {i++} <span className="badge badge-warning">Custom Product</span> </th>
                  <td>{ `${row.temp_product.name} | ${row.temp_product.weight} ${row.temp_product.weight_type} ` }</td>
                  <td>  Rs. {row.price} /- </td>
                  <td>  {row.quantity} pcs </td>
                  <td>  Rs. {row.price * row.quantity} /- </td>
                  <td>   <Moment 
                       local
                       format="D MMM, YYYY h:mm a"
                          date={ row.created_at }
                       /> 
                  </td>
                
                </tr>
                )
            })
      }
  
   
  </tbody>
</table>
    );
}

export default Table;