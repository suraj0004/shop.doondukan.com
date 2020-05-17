import React from 'react';

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
              <th>Sale Date</th>
              <th>Product Detail</th>
              <th>Sold Quantity</th>
              <th>Total Price</th>
              
            </tr>
            </thead>
            <tbody>
         
          
            {
              main.map((sale) => {
                const {price,quantity,id,date,product} = sale;
                  return   <tr key={id}>
                  <td>  <a className="btn btn-default" style={{marginTop:'-5px'}}>  ABCD-{id} <i className="fa fa-file"></i></a> </td>
                  <td> {date} </td>
                  <td> { ` ${product.name} | ${product.weight} ${product.weight_type} | ${product.brand} ` } </td>
              <td>{quantity} Pcs. @ Rs. {price}/- per Pcs </td>
                  <td> Rs.  {  price*quantity  } /- </td>
              </tr>
              })
            }

           {
              temp.map((sale) => {
                const {price,quantity,id,date,product} = sale;
                  return   <tr key={id}>
                  <td>  <a className="btn btn-default" style={{marginTop:'-5px'}}>  ABCD-{id} <i className="fa fa-file"></i></a> </td>
                  <td> {date} </td>
                  <td> { ` ${product.name} | ${product.weight} ${product.weight_type} | ${product.brand} ` } </td>
              <td>{quantity} Pcs. @ Rs. {price}/- per Pcs </td>
                  <td> Rs.  {  price*quantity  } /- </td>
              </tr>
              })
            }
           
            </tbody>
           
          </table>
        </div>
        
      </div>
    );
}

export default Table;