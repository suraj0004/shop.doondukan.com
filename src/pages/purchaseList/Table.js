import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import NoRecord from '../../components/NoRecord'

function Table(props) {

  const {data, currentPage, perPage} = props;
  let sno = 0;

  return (
    <div className="row">
      <NoRecord data_count={data.length} />
      {data.map((item, index) => {
        
        return (
          <div className="col-12 col-md-6 p-3 " key={index.toString()}>
            <div className="card shadow">
              <div className="card-header">
                {" "}
                <strong> #{ ( (currentPage - 1) * perPage ) +  (index + 1)}  </strong>
              </div>
              <div className="card-body row">
                <div className="col-sm-4 text-center img-responsive">
                  <img
                    src={item.product.image}
                    className="img-fluid"
                    alt={item.product.name}
                  />
                </div>
                <div className="col-sm-8 text-left">
                  <p>
                    <strong>Product: </strong>
                    {item.product.name +
                      " | " +
                      item.product.weight +
                      item.product.weight_type}{" "}
                  </p>
                  <p> <strong>Purchased Quantity: </strong> {item.quantity} </p>
                  <p>
                  <strong>Purchased Date: </strong>
                    <Moment
                      local
                      format="D MMM, YYYY"
                      date={item.created_at}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {/* </tbody> */}
      {/* </table> */}
    </div>
  );

    return (
        <div className="card">
           
            
        <div className="card-body table-responsive">
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
                    data.map( (item) => {
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