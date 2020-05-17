import React from 'react';

function Table(props) {
   
    const {main,temp} = props.data;
    return (
        <div className="card">
                       
                        
        <div className="card-body">
          <table id="my_table" className="table table-bordered table-striped">
            <thead>
                
            <tr>
              <th>Sno.</th>
              <th>Last purchased date</th>
              <th>Product Detail</th>
              <th>Total Quantity</th> 
              <th>Selling Price</th>  
                                      
            </tr>
            </thead>
            <tbody>
                {
                    main.map( (item,index) => {
                      
                     return (
                       
                        <tr key={index.toString() } >
                        <td> {index + 1 } </td>
                        <td> { item.last_purchased_at } </td>
                        <td> { item.product.name + " | " + item.product.weight + item.product.weight_type + " | " +  item.product.brand } </td>
                        <td> {item.quantity} </td>
                        <td> {item.price} </td>
                        
                      </tr>
                     );
                    } )
                }
              {
                    temp.map( (item,index) => {
                      
                     return (
                       
                        <tr key={index.toString() } >
                        <td> {index + 1 } </td>
                        <td> { item.last_purchased_at } </td>
                        <td> { item.temp_product.name + " | " + item.temp_product.weight + item.temp_product.weight_type + " | " +  item.temp_product.brand } </td>
                        <td> {item.quantity} </td>
                        <td> {item.price} </td>
                        
                      </tr>
                     );
                    } )
                }
           
            </tbody>
           
          </table>
        </div>
        
      </div>
    );
}

export default Table;