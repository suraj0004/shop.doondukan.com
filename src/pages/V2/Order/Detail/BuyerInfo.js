import React from "react";
import Moment from "react-moment";

const BuyerInfo = ({ buyer, shipping_address, meta }) => {
  const getDeliveryType = (type) => {
    if (type === "user-self-collected") return "User: Pick Up";
    if (type === "shop-delivery") return "Shop: Home Delivery";
    if (type === "delivery-partner") return "DoonDukna: Delivery Partner";
    return "N/A";
  };

  const getBuyerName = (type) => {
    if (type === "user-self-collected") return buyer.name;
    else return shipping_address.name;
  };

  const getBuyerMobile = (type) => {
    if (type === "user-self-collected") return <a href={`tel:${buyer.phone}`}> {buyer.phone} </a>;
    else return <> <a href={`tel:${shipping_address.mobile}`}> {shipping_address.mobile} </a>, <a href={`tel:${buyer.phone}`}> {buyer.phone} </a> </>;
  };

  return (
    <div className="pb-5 pt-3">
      <h5 className=" text-secondary font-weight-bold">Customer Information</h5>
      <table className="table table-striped">
        <tbody>
          <tr>
            <th>Name:</th>
            <td>{getBuyerName(meta.delivery_type)}</td>
          </tr>
          <tr>
            <th>Mobile:</th>
            <td>{getBuyerMobile(meta.delivery_type)}</td>
          </tr>
          <tr>
            <th>Delivery Type: &nbsp; &nbsp; </th>
            <td>{getDeliveryType(meta.delivery_type)}</td>
          </tr>

          {meta.delivery_type === "user-self-collected" ? (
            <tr>
              <th>User Pick up Timing: &nbsp; &nbsp; </th>
              <td>
                <Moment local format="D MMM, YYYY" date={meta.from_time} /><br/>
                <Moment local format="h:mm a" date={meta.from_time} /> to{" "}
                <Moment local format="h:mm a" date={meta.to_time} />
              </td>
            </tr>
          ) : (
            <tr>
              <th>Delivery Address: &nbsp; &nbsp; </th>
              <td>
                {shipping_address.address}, <br /> {shipping_address.pincode},
                {shipping_address.city}, <br /> {shipping_address.state}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BuyerInfo;
