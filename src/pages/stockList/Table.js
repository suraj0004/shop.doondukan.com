import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
function Table(props) {
    const {main,temp} = props.data;
    let sno = 0;
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
                    temp.map( (item) => {
                      sno++
                     return (
                       
                        <tr key={sno.toString() } >
                        <td> {sno }  <span className="badge badge-warning">Custom Product</span> </td>
                        <td> <Moment                              
                                 local
                                 format="D MMM, YYYY h:mm a"
                                 date={ item.last_purchased_at }
                                 />
                            </td>
                        <td> { item.temp_product.name + " | " + item.temp_product.weight + item.temp_product.weight_type } </td>
                        <td> {item.quantity} </td>
                        <td> {item.price} </td>
                        
                      </tr>
                     );
                    } )
                }
                
                {
                    main.map( (item) => {
                      sno++
                     return (
                       
                        <tr key={sno.toString() } >
                        <td> {sno } </td>
                        <td> <Moment                              
                                 local
                                 format="D MMM, YYYY h:mm a"
                                 date={ item.last_purchased_at }
                                 />
                            </td>
                      
                        <td> { item.product.name + " | " + item.product.weight + item.product.weight_type } </td>
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