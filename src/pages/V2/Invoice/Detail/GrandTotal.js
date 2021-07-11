import React from "react";
import { FaRupeeSign } from "react-icons/fa";

const GrandTotal = ({ grand_total, discount }) => {
  let discount_amount = 0;
  if (discount.type === "percentage") {
    discount_amount = (grand_total * discount.amount) / 100;
  } else {
    discount_amount = discount.amount;
  }
  return (
    <div className="row p-2 font-weight-bold text-dark">
      <div className="col-9 p-0 m-0">
        {discount_amount ? (
          <>
            <p>
              Total <small className="text-secondary"></small>
            </p>
            <p>
              Discount <small className="text-secondary"></small>
            </p>
          </>
        ) : null}
        <p>
          Grand Total{" "}
          <small className="text-secondary">(Inclusive of all taxes)</small>
        </p>
      </div>
      <div className="col-3 text-right p-0 m-0">
        {discount_amount ? (
          <>
            <p>
              <FaRupeeSign size="15" />
              {grand_total}
            </p>
            <p>
              {" "}
              <FaRupeeSign size="15" />
              {discount_amount}
            </p>
          </>
        ) : null}
        <p>
          <FaRupeeSign size="15" />
          {grand_total - discount_amount}
        </p>
      </div>
    </div>
  );
};

export default GrandTotal;
