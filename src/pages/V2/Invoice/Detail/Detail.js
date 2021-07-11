import React from "react";
import Item from "./Item";
import GrandTotal from "./GrandTotal";
import BuyerInfo from "./BuyerInfo";
import Moment from "react-moment";
import "moment-timezone";

const Detail = ({ data }) => {
  const { products, buyer, meta, discount } = data;
  let grand_total = 0;
  return (
    <section className="container">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8 card shadow">
          <h5 className="text-left border-bottom pb-4 pt-4 row text-center">
            <div className="col-md-4">
              Invoice No : #{meta.invoice_number}
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
              <span className="badge badge-info">{meta.status}</span>{" "}
            </div>
          </h5>
          {products.map((item) => {
            grand_total += item.quantity * Number(item.price).toFixed(2);
            return <Item item={item} />;
          })}
          <hr />
          <div className="pr-3 text-right">
            <GrandTotal grand_total={grand_total} discount={discount} />
          </div>
          <hr />
          <BuyerInfo buyer={buyer} />
        </div>
      </div>
    </section>
  );
};

export default Detail;
