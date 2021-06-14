import React from "react";
import Moment from "react-moment";
import "moment-timezone";
import { Link } from "react-router-dom";
function Table(props) {
  const {data, currentPage, perPage} = props;
 
  return (
    <div className="row">
      {data.map((item, index) => {
        
        return (
          <div className="col-12 col-md-6 p-3 " key={index.toString()}>
            <div className="card shadow">
              <div className="card-header">
                {" "}
                <strong> #{ ( (currentPage - 1) * perPage ) +  (index + 1)} </strong>{" "}
                <span className="float-right">
                  <Link to={`/setPrice/${item.id}`} className="btn btn-info">
                    {" "}
                    <i className="fa fa-edit"></i>{" "}
                  </Link>
                </span>{" "}
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
                  <p> <strong> Available Quantity: </strong> {item.quantity} </p>
                  <p>  <strong>Selling Price: </strong>{item.price} </p>
                  <p>
                  <strong>Last Purchased: </strong>
                    <Moment
                      local
                      format="D MMM, YYYY"
                      date={item.last_purchased_at}
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
}

export default Table;
