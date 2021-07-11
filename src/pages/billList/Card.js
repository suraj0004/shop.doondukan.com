import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";

function Card(props) {
  const {
    customer_name,
    customer_email,
    customer_mobile,
    id,
    sales_count,
    sales_price,
    created_at,
  } = props.bill;

  return (
    <div className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch">
      <div className="card shadow" style={{ width: "inherit" }}>
        <div className="card-header text-muted border-bottom-1 ">
          Invoice No: <strong>#{id.toString().padStart("4", "0")}</strong>
        </div>
        <div className="card-body text-center" style={{ paddingBottom: "0px" }}>
          <div className="row">
            <div className="col-md-3 ">
              <img src={props.bill.image} height="90" width="90" />
            </div>

            <div className="col-md-6">
              <p className="text-muted text-sm">
                <strong>Total Item: </strong> {sales_count}
              </p>
              <p className="text-muted text-sm">
                <strong>Total Price: </strong> Rs. {sales_price} /-{" "}
              </p>
              <p className="text-muted text-sm">
                <strong>Date: </strong>
                <Moment local format="D MMM, YYYY h:mm a" date={created_at} />
              </p>
            </div>
          </div>

          <hr />
        </div>
        <div className="card-footer row">
          <div className="col-6 text-left">
            <span className="badge badge-success p-2">{props.bill.status}</span>
          </div>
          <div className="col-6 text-right ">
            <Link to={"/invoice/detail/" + id} className="btn btn-sm btn-primary">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
