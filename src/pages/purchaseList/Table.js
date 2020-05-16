import React from 'react';

function Table(props) {
  console.log(props);
  var {main,temp} = props.data;
    return (
        <div className="card">
           
            
        <div className="card-body">
          <table id="my_table" className="table table-bordered table-striped">
            <thead>
                
            <tr>
              <th>Sno.</th>
              <th>Purchased Date</th>
              <th>Product Detail</th>
              <th>Purchased Quantity</th>
              <th>Purchased Price (Per Piece)</th>
              <th>Total Price</th>
              
            </tr>
            </thead>
            <tbody>
                {
                    main.map( (item,index) => {
                      
                     return (
                       
                        <tr key={index.toString() } >
                        <td> {index + 1 } </td>
                        <td> { item.created_at } </td>
                        <td> { item.product.name + " | " + item.product.weight + item.product.weight_type + " | " +  item.product.brand } </td>
                        <td> {item.quantity} </td>
                        <td> {item.price} </td>
                        <td>{item.quantity * item.price } </td>
                      </tr>
                     );
                    })
                }

                {
                   temp.map( (item,index) => {
                      console.log(item);
                    return (
                      
                       <tr key={index.toString() } >
                       <td> {index + 1 } </td>
                       <td> { item.created_at } </td>
                       <td> { item.product.name + " | " + item.product.weight + item.product.weight_type + " | " +  item.product.brand } </td>
                       <td> {item.quantity} </td>
                       <td> {item.price} </td>
                       <td>{item.quantity * item.price } </td>
                     </tr>
                    );
                   })
                }
           
            </tbody>
           
          </table>
        </div>
        
      </div>
    );
}

export default Table;