import React from "react";

const NoRecord = ({ data_count }) => {
  return data_count ? null : (
    <div className="col-12 h3 text-center"> No Record Found </div>
  );
};

export default NoRecord;
