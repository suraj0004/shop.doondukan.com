import React from "react";
import NoRecord from "../../components/NoRecord";
import { Link } from "react-router-dom";
import Moment from "react-moment";

function Table(props) {
  const { data, currentPage, perPage } = props;

  return (
    <div className="row">
      <NoRecord data_count={data.length} />
      {data.map((item, index) => {
        const total = Number(item.price) * Number(item.quantity);

        return (
          <div className="col-12 col-md-6 p-3 " key={index.toString()}>
            <div className="card shadow">
              <div className="card-header">
                {" "}
                <strong>
                  {" "}
                  #{(currentPage - 1) * perPage + (index + 1)}{" "}
                  <span
                    className={`p-1 badge ${
                      item.bill.status === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {" "}
                    {item.bill.status === "paid" ? "Paid" : "Un-Paid"}{" "}
                  </span>{" "}
                </strong>
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
                    {" "}
                    <strong>Bill Number: </strong>
                    <Link
                      to={"/invoice/" + item.bill.id}
                      className="btn btn-default"
                    >
                      {" "}
                      #{item.bill.id.toString().padStart("4", "0")}{" "}
                      <i className="fa fa-file"></i>
                    </Link>
                  </p>
                  <p>
                    <strong>Product: </strong>
                    {item.product.name +
                      " | " +
                      item.product.weight +
                      item.product.weight_type}{" "}
                  </p>
                  <p>
                    {" "}
                    <strong>Sold Quantity: </strong> {item.quantity} Pcs. @ Rs.{" "}
                    {item.price}/- per Pcs{" "}
                  </p>
                  <p>
                    {" "}
                    <strong>Total Price: </strong>Rs. {total} /-{" "}
                  </p>
                  <p>
                    <strong>Sold On: </strong>
                    <Moment local format="D MMM, YYYY" date={item.created_at} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Table;
