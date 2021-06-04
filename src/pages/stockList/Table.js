import React from "react";
import Moment from "react-moment";
import "moment-timezone";
import { Link } from "react-router-dom";
function Table(props) {
  const { main, temp } = props.data;
  let sno = 0;
  return (
    <div className="card">
      <div className="card-body table-responsive">
        <table id="my_table" className="table table-bordered table-striped ">
          <thead>
            <tr>
              <th>Sno.</th>
              <th>Product Detail</th>
              <th>Last purchased date</th>
              <th>Product Image</th>
              <th>Total Quantity</th>
              <th>Selling Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {temp.map((item) => {
              sno++;
              return (
                <tr key={sno.toString()}>
                  <td>
                    {" "}
                    {sno}{" "}
                    <span className="badge badge-warning">Custom Product</span>{" "}
                  </td>
                  <td>
                    {" "}
                    {item.temp_product.name +
                      " | " +
                      item.temp_product.weight +
                      item.temp_product.weight_type}{" "}
                  </td>
                  <td>
                    {" "}
                    <Moment
                      local
                      format="D MMM, YYYY h:mm a"
                      date={item.last_purchased_at}
                    />
                  </td>
                  <td>
                    {" "}
                    <img
                      src={item.product.image}
                      className="img-fluid"
                      height="100"
                      width="100"
                      alt={item.temp_product.name}
                    />{" "}
                  </td>
                  <td> {item.quantity} </td>
                  <td> {item.price} </td>
                  <td>
                    <Link to={`/setPrice/${item.id}`} className="btn btn-info">
                      {" "}
                      <i className="fa fa-edit"></i>{" "}
                    </Link>
                  </td>
                </tr>
              );
            })}

            {main.map((item) => {
              sno++;
              return (
                <tr key={sno.toString()}>
                  <td> {sno} </td>
                  <td>
                    {" "}
                    {item.product.name +
                      " | " +
                      item.product.weight +
                      item.product.weight_type}{" "}
                  </td>
                  <td>
                    {" "}
                    <Moment
                      local
                      format="D MMM, YYYY h:mm a"
                      date={item.last_purchased_at}
                    />
                  </td>
                  <td>
                    {" "}
                    <img
                      src={item.product.image}
                      className="img-fluid"
                      height="100"
                      width="100"
                      alt={item.product.name}
                    />{" "}
                  </td>
                  <td> {item.quantity} </td>
                  <td> {item.price} </td>
                  <td>
                    <Link to={`/setPrice/${item.id}`} className="btn btn-info">
                      {" "}
                      <i className="fa fa-edit"></i>{" "}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
