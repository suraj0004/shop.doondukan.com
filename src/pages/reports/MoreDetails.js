import React from 'react';

function MoreDetails(props) {
    return (
        <div className="col-md-4">

        <div className="info-box mb-3 bg-warning">
          <span className="info-box-icon"><i className="fas fa-tag"></i></span>

          <div className="info-box-content">
            <span className="info-box-text">Products</span>
            <span className="info-box-number"> {props.more.products} </span>
          </div>

        </div>

        <div className="info-box mb-3 bg-success">
          <span className="info-box-icon"><i className="far fa-heart"></i></span>

          <div className="info-box-content">
            <span className="info-box-text">In Stock</span>
            <span className="info-box-number">{props.more.stocks} </span>
          </div>

        </div>

        <div className="info-box mb-3 bg-primary">
          <span className="info-box-icon"><i className="fa fa-arrow-right"></i></span>

          <div className="info-box-content">
            <span className="info-box-text">Item Sold Today</span>
            <span className="info-box-number">{props.more.item_sold} </span>
          </div>

        </div>

        <div className="info-box mb-3 bg-danger">
          <span className="info-box-icon"><i className="fa fa-user"></i></span>

          <div className="info-box-content">
            <span className="info-box-text">Today Sale</span>
            <span className="info-box-number">Rs. {props.more.sales?props.more.sales:0}  /-</span>
          </div>

        </div>

        <div className="info-box mb-3 bg-info">
          <span className="info-box-icon"><i className="fa fa-rupee-sign"></i></span>

          <div className="info-box-content">
            <span className="info-box-text">Today Profit</span>
            <span className="info-box-number">Rs. {props.more.profit?props.more.profit:0}  /-</span>
          </div>

        </div>




      </div>
    );
}

export default MoreDetails;