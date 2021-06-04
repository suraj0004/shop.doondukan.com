import React from 'react';

function Percentage(props) {
    
    return (
        <div className="card-footer bg-dark">
        <div className="row">

          <div className="col-md-4 col-12">
            <div className="description-block border-right">
              {
                (props.percentage.purchase > 0)
                ?<span className="description-percentage text-primary font-weight-bold"><i className="fas fa-caret-right"></i> {props.percentage.purchase}%</span>
                :<span className="description-percentage text-warning font-weight-bold"><i className="fas fa-caret-left"></i> {props.percentage.purchase * (-1) }%</span>
              }
              
              <h5 className="description-header">Rs. {props.amount.purchase} /-</h5>
              <span className="description-text">YESTERDAY PURCHASE</span>
            </div>

          </div>


          <div className="col-md-4 col-12">
            <div className="description-block border-right">
            {
                (props.percentage.sale > 0)
                ?<span className="description-percentage text-success font-weight-bold"><i className="fas fa-caret-up"></i> {props.percentage.sale}%</span>
                :<span className="description-percentage text-danger font-weight-bold"><i className="fas fa-caret-down"></i> {props.percentage.sale * (-1) }%</span>
              }
              
              <h5 className="description-header">Rs. {props.amount.sale} /-</h5>
              <span className="description-text">YESTERDAY SALE</span>
            </div>

          </div>


          <div className="col-md-4 col-12">
            <div className="description-block border-right">
            {
                (props.percentage.profit > 0)
                ?<span className="description-percentage text-success font-weight-bold"><i className="fas fa-caret-up"></i> {props.percentage.profit}%</span>
                :<span className="description-percentage text-danger font-weight-bold"><i className="fas fa-caret-down"></i> {props.percentage.profit * (-1) }%</span>
              }
              
              <h5 className="description-header">Rs. {props.amount.profit} /-</h5>
              <span className="description-text">YESTERDAY PROFIT</span>
            </div>

          </div>




        </div>

      </div>
    );
}

export default Percentage;