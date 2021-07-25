import React from 'react';

function Table(props) {
  
  const {main} = props;
  const main_data = main.map( (row,index) => {
    let quantity=0;
    if(row.deleted_at){
      quantity = Number(row.return_quantity);
    }else if(row.return_quantity){
      quantity = Number(row.return_quantity) + Number(row.quantity);
    }else{
      quantity =  Number(row.quantity);
    }
   return(
    <tr key={row.id}>
      <td> {index + 1} </td>
    <td> {row.product.name + " | " + row.product.weight+row.product.weight_type + " | " + (row.product.brand?row.product.brand.brand_name:"") } </td>
    <td> {quantity} Pcs. </td>
   <td> Rs. {row.price} /- per Pcs. </td>
    <td> Rs. {row.price * quantity} /-</td>
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
              <th>Price ( Per Pcs )</th>
              <th>Sub-total</th>
            </tr>
            </thead>
            <tbody>
            
          {main_data}
            </tbody>
          </table>
        </div>
        
      </div>
    );
}

export default Table;