import React from 'react';

function Table(props) {

  const data = props.data.map( (row,index) => {
   return(
    <tr key={row.id}>
      <td> {index + 1} </td>
    <td> {row.product.name + " | " + row.product.weight+row.product.weight_type + " | " + row.product.brand } </td>
    <td> {row.quantity} Pcs. </td>
   <td> Rs. {row.price} /- per Pcs. </td>
    <td> Rs. {row.price * row.quantity} /-</td>
  </tr>
   );
  } );
    return (
        <div className="row">
        <div className="col-12 table-responsive">
          <table className="table table-striped">
            <thead>
            <tr>
            <th>#</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price Per Pcs</th>
              <th>Subtotal</th>
            </tr>
            </thead>
            <tbody>
            
          {data}
            </tbody>
          </table>
        </div>
        
      </div>
    );
}

export default Table;