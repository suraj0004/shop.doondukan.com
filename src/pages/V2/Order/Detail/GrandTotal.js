import React from "react";
import { FaRupeeSign } from "react-icons/fa";

const GrandTotal = ({ grand_total }) => {

  return (
    <div className="row p-2 font-weight-bold text-dark">
      <div className="col-9 p-0 m-0">
        <p>
          Grand Total{" "}
          <small className="text-secondary">(Inclusive of all taxes)</small>
        </p>
      </div>
      <div className="col-3 text-right p-0 m-0">
        <p>
          <FaRupeeSign size="15" />
          {grand_total}
        </p>
      </div>
    </div>
  );
};

export default GrandTotal;
