import React from "react";
// import { Link } from 'react-router-dom';
import Moment from "react-moment";
import "moment-timezone";

function OrderCard(props) {
  var data = props.data;

  return (
    <>
      {data.data.map((order, index) => {
        console.log(order);
        return (
          <div
            className="col-12 col-sm-6 col-md-6 col-lg-4 d-flex align-items-stretch "
            key={order.id}
          >
            <div className="card bg-light shadow" style={{ width: "inherit" }}>
              <div className="card-header text-muted border-bottom-1">
                Order No. <strong>#{order.order_no} </strong>
                {order.status === 1 ? (
                  <span className="badge  p-2 badge-primary float-right">
                    Confirmed
                  </span>
                ) : (
                  ""
                )}
                {order.status === 3 ? (
                  <span className="badge p-2 badge-warning float-right">
                    Canceled
                  </span>
                ) : (
                  ""
                )}
                {order.status === 2 ? (
                  <span className="badge p-2 badge-success float-right">
                    Completed
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div
                className="card-body text-left"
                style={{ paddingBottom: "0px" }}
              >
                <p className="text-muted text-sm">
                  <strong> Buyer Name : </strong> {order.buyer.name}
                </p>
                <p className="text-muted text-sm">
                  <strong> Phone Number : </strong> {order.buyer.phone}
                </p>
                <p className="text-muted text-sm">
                  <strong> Total Amount : </strong>
                  {Number(order.order_amount).toFixed(2)}
                </p>
                <p className="text-muted text-sm">
                  <strong> Pickup Time : </strong>
                  <strong>
                    <Moment
                      local
                      format="D MMM, YYYY h:mm a"
                      date={order.from_time}
                    />
                  </strong>
                  {" "}to{" "}
                  <strong>
                    <Moment
                      local
                      format="D MMM, YYYY h:mm a"
                      date={order.to_time}
                    />
                  </strong>
                </p>

                <div
                  className="modal fade"
                  id={"exampleModal" + order.id}
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Order Products
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body table-responsive">
                        <table
                          id=""
                          className="table table-bordered table-hover"
                        >
                          <thead>
                            <tr>
                              <th className="all">Sr. No</th>
                              <th className="all">Product</th>
                              <th className="none">Quantity</th>
                              <th className="none">Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.orderitem ? (
                              order.orderitem.map((item, i) => {
                                return (
                                  <React.Fragment key={item.id}>
                                    <tr>
                                      <td>{i + 1}.</td>
                                      <td>{item.product.name} </td>
                                      <td>{item.quantity} </td>
                                      <td>{Number(item.price).toFixed(2)} </td>
                                    </tr>
                                  </React.Fragment>
                                );
                              })
                            ) : (
                              <React.Fragment></React.Fragment>
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer text-center">
                <button
                  className="btn btn-sm btn-info mr-2"
                  data-toggle="modal"
                  data-target={"#exampleModal" + order.id}
                >
                  View Details
                </button>
                {order.status === 0 ? (
                  <button
                    className="btn btn-success btn-sm mr-2"
                    onClick={function () {
                      props.updateState(order.id, 1);
                    }}
                  >
                    Accept
                  </button>
                ) : (
                  ""
                )}

                {order.status === 0 ? (
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={function () {
                      props.updateState(order.id, 3);
                    }}
                  >
                    Reject
                  </button>
                ) : (
                  ""
                )}

                {order.status === 1 ? (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={function () {
                      props.updateState(order.id, 2);
                    }}
                  >
                    Mark as Complete
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default OrderCard;
