import React from 'react';

import Row from './Row';
function Table(props) {
  // console.log(props);
  const {main,temp} = props.data;
    return (
        <div className="card">
           
            
        <div className="card-body">
          <table id="my_table" className="table table-bordered table-striped">
            <thead>
                
            <tr>
              <th>Bill No.</th>
              <th>Status</th>
              <th>Sale Date</th>
              <th>Product Detail</th>
              <th>Sold Quantity</th>
              <th>Total Price</th>
              
            </tr>
            </thead>
            <tbody>
         
          
            {
              main.map((sale) => {
                const {price,quantity,id,created_at,product,bill_id, bill} = sale;
                  return(
                    <Row
                 key = {id}
                 bill_id = {bill_id}
                 date = {created_at}
                 name = {product.name}
                 weight = {product.weight}
                 weight_type = {product.weight_type}
                 brand = {product.brand}
                 quantity = {quantity}
                 price = {price}
                 status = {bill.status}
              />
                  )   
                      
              })
            }

           {
              temp.map((sale) => {
                const {price,quantity,id,created_at,temp_product,bill_id} = sale;
                  return (
                    <Row
                    key = {id}
                    bill_id = {bill_id}
                    date = {created_at}
                    name = {temp_product.name}
                    weight = {temp_product.weight}
                    weight_type = {temp_product.weight_type}
                    brand = {temp_product.brand}
                    quantity = {quantity}
                    price = {price}
                    status = "Paid"
                 />
                  )
              })
            }
           
            </tbody>
           
          </table>
        </div>
        
      </div>
    );
}

export default Table;