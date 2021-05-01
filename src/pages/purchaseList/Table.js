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
              <th>Purchased Date</th>
              <th>Product Detail</th>
              <th>Purchased Quantity</th>
              <th>Purchased Price (Per Piece)</th>
              <th>Total Price</th>
              
            </tr>
            </thead>
            <tbody>



              
            {
                   temp.map( (item) => {
                      sno++;
                      console.log(sno);
                    return (
                      
                       <tr key={sno.toString() } >
                       <td> {sno } <span className="badge badge-warning">Custom Product</span> </td>
                       <td> <Moment 
                                
                                //  parse="YYYY-MM-DDTHH:mm"
                                 local
                                 format="D MMM, YYYY h:mm a"
                                 date={ item.created_at }
                                 />
                            </td>
                       <td> { item.temp_product.name + " | " + item.temp_product.weight + item.temp_product.weight_type}  </td>
                       <td> {item.quantity} </td>
                       <td> {item.price} </td>
                       <td>{item.quantity * item.price } </td>
                     </tr>
                    );
                   })
                }

                
                {
                    main.map( (item) => {
                      sno++;
                      console.log(sno);
                     return (
                       
                        <tr key={sno.toString() } >
                        <td> { sno } </td>
                        <td> <Moment 
                                
                                //  parse="YYYY-MM-DDTHH:mm"
                                 local
                                 format="D MMM, YYYY h:mm a"
                                 date={ item.created_at }
                                 />
                            </td>
                        <td> { item.product.name + " | " + item.product.weight + item.product.weight_type  } </td>
                        <td> {item.quantity} </td>
                        <td> { (item.price).toFixed(8) } </td>
                        <td>{Math.round(item.quantity * (item.price).toFixed(8)) } </td>
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