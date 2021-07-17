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
    <div className="col-12 col-md-6 p-3 ">
    <div className="card shadow">
      <div className="card-header">
      Invoice No: <strong>#{id.toString().padStart("4", "0")}</strong>
      </div>
      <div className="card-body row">
        <div className="col-sm-4 text-center img-responsive">
          <img
            src={props.bill.image}
            className="img-fluid"
            alt={id}
          />
        </div>
        <div className="col-sm-8 text-left">
          <p>
            <strong>Total Item: </strong>{sales_count}
          </p>
          <p>
          <strong>Total Price: </strong> Rs. {sales_price} /-
          </p>
          <p>
            <strong>Date: </strong>
            <Moment local format="D MMM, YYYY" date={created_at} />
          </p>
        </div>
      </div>
      <div className="card-footer row">
          <div className="col-6 text-left">
            <span className="badge badge-success p-2">{props.bill.order_type}</span>
          </div>
          <div className="col-6 text-right ">
            <Link to={"/invoice/detail/" + id} className="btn btn-sm btn-primary">
              View Details
            </Link>
          </div>
        </div>
    </div>
  </div>
  )
}

export default Card;
