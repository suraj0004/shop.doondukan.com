import React from "react";
import Item from "./Item";
import GrandTotal from "./GrandTotal";
import BuyerInfo from "./BuyerInfo";
import Moment from "react-moment";
import "moment-timezone";

const Detail = ({ data }) => {
  const { products, buyer, meta, shipping_address } = data;
  let grand_total = 0;

  const getStatus = (status) => {
      if(status === 0) return <span className="badge badge-warning"> pending </span>
      if(status === 1) return <span className="badge badge-primary"> accepted </span>
      if(status === 2) return <span className="badge badge-success"> completed </span>
      if(status === 3) return <span className="badge badge-danger"> cancled </span>
  }

  return (
    <section className="container">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8 card shadow">
          <h5 className="text-left border-bottom pb-4 pt-4 row text-center">
            <div className="col-md-4">
              Order No : #{meta.order_number}
              <br />
              <small className="text-secondary">
                <Moment local format="D MMM, YYYY h:mm a" date={meta.date} />
              </small>
            </div>
            <div className="col-md-4">
              {" "}
              <span className="badge badge-success">{meta.type}</span>{" "}
            </div>
            <div className="col-md-4">
                {getStatus(meta.status)}
            </div>
          </h5>
          {products.map((item) => {
            grand_total += item.quantity * Number(item.price).toFixed(2);
            return <Item item={item} />;
          })}
          <hr />
          <div className="pr-3 text-right">
            <GrandTotal grand_total={grand_total} />
          </div>
          <hr />
          <BuyerInfo buyer={buyer} shipping_address={shipping_address} meta={meta} />
        </div>
      </div>
    </section>
  );
};

export default Detail;
