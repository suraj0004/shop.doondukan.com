import React from 'react';
import {Link} from 'react-router-dom';
function PageHeader(props) {
  var li;
  if(props.page !== "Dashboard"){
    li = <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
  }
    return (
        <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">{props.page}</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                {li}
                <li className="breadcrumb-item active">{props.page}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
}

export default PageHeader;