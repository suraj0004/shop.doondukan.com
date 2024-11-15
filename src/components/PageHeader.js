import React from "react";
import { Link } from "react-router-dom";
function PageHeader(props) {
  var li;
  if (props.page !== "Dashboard") {
    li = (
      <li className="breadcrumb-item">
        <Link to="/">Dashboard</Link>
      </li>
    );
  }
  return props.page === "" ? (
    <hr />
  ) : (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">
              <button
                className="btn border rounded-circle mr-2 border-dark"
                onClick={props.history.goBack}
              >
                <i className="fa fa-arrow-left"></i>
              </button>

              {props.page}
            </h1>
          </div>
          <div className="col-sm-6 d-none d-md-block">
            <ol className="breadcrumb float-sm-right">
              {li}
              <li className="breadcrumb-item active">{props.page}</li>
            </ol>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default PageHeader;
