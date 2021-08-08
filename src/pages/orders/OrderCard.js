import React from "react";
import { Link } from "react-router-dom";


function OrderCard(props) {

  const getDeliveryType = (type) => {
    if(type === 'user-self-collected') return 'Pick Up';
    else return 'Home Delivery'
  }
  return (
    <>
      {props.data.map((order, index) => {
        console.log(order);
        return (
          <div className="col-12 col-md-6 p-3 ">
          <div className="card shadow">
            <div className="card-header">
            Order No. <strong>#{order.order_no} </strong>
            </div>
            <div className="card-body row">
              <div className="col-sm-4 text-center img-responsive">
                <img
                  src={order.image}
                  className="img-fluid"
                  alt={order.id}
                />
              </div>
              <div className="col-sm-8 text-left">
                <p>
                <strong> Buyer Name : </strong> {order?.buyer?.name?order.buyer.name:'NA'}
                </p>
                <p>
                <strong> Phone Number : </strong> {order?.buyer?.phone?order.buyer.phone:'NA'}
                </p>
                <p>
                  <strong>Total Item: </strong>
                  {order.orderitem_count}
                </p>
                <p>
                <strong>Total Price: </strong> {Number(order.order_amount).toFixed(2)}
                </p>
                <p>
                <strong> Delivery Type : </strong>
                {getDeliveryType(order.delivery_type)}
                </p>
              </div>
            </div>
            <div className="card-footer row">
                <div className="col-6 text-left">
                {order.status === 0 ? (
                        <span className="badge  p-2 badge-warning p-2">
                          Pending
                        </span>
                      ) : (
                        ""
                      )}
                {order.status === 1 ? (
                        <span className="badge  p-2 badge-primary p-2">
                          Confirmed
                        </span>
                      ) : (
                        ""
                      )}
                      {order.status === 3 ? (
                        <span className="badge p-2 badge-danger p-2">
                          Canceled
                        </span>
                      ) : (
                        ""
                      )}
                      {order.status === 2 ? (
                        <span className="badge p-2 badge-success p-2">
                          Completed
                        </span>
                      ) : (
                        ""
                      )}
                </div>
                <div className="col-6 text-right ">
                  <Link to={"/order/detail/" + order.id} className="btn btn-sm btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
          </div>
        </div>
        )
        // return (
        //   <div
        //     className="col-12 col-sm-6 col-md-6 col-lg-4 d-flex align-items-stretch "
        //     key={order.id}
        //   >
        //     <div className="card bg-light shadow" style={{ width: "inherit" }}>
        //       <div className="card-header text-muted border-bottom-1">
        //         Order No. <strong>#{order.order_no} </strong>
        //         {order.status === 1 ? (
        //           <span className="badge  p-2 badge-primary float-right">
        //             Confirmed
        //           </span>
        //         ) : (
        //           ""
        //         )}
        //         {order.status === 3 ? (
        //           <span className="badge p-2 badge-warning float-right">
        //             Canceled
        //           </span>
        //         ) : (
        //           ""
        //         )}
        //         {order.status === 2 ? (
        //           <span className="badge p-2 badge-success float-right">
        //             Completed
        //           </span>
        //         ) : (
        //           ""
        //         )}
        //       </div>
        //       <div
        //         className="card-body text-left"
        //         style={{ paddingBottom: "0px" }}
        //       >
        //         <p className="text-muted text-sm">
        //           <strong> Buyer Name : </strong> {order.buyer.name}
        //         </p>
        //         <p className="text-muted text-sm">
        //           <strong> Phone Number : </strong> {order.buyer.phone}
        //         </p>
        //         <p className="text-muted text-sm">
        //           <strong> Total Amount : </strong>
        //           {Number(order.order_amount).toFixed(2)}
        //         </p>
        //         <p className="text-muted text-sm">
        //           <strong> Pickup Time : </strong>
        //           <strong>
        //             <Moment
        //               local
        //               format="D MMM, YYYY h:mm a"
        //               date={order.from_time}
        //             />
        //           </strong>
        //           {" "}to{" "}
        //           <strong>
        //             <Moment
        //               local
        //               format="D MMM, YYYY h:mm a"
        //               date={order.to_time}
        //             />
        //           </strong>
        //         </p>

        //         <div
        //           className="modal fade"
        //           id={"exampleModal" + order.id}
        //           tabIndex="-1"
        //           role="dialog"
        //           aria-labelledby="exampleModalLabel"
        //           aria-hidden="true"
        //         >
        //           <div className="modal-dialog" role="document">
        //             <div className="modal-content">
        //               <div className="modal-header">
        //                 <h5 className="modal-title" id="exampleModalLabel">
        //                   Order Products
        //                 </h5>
        //                 <button
        //                   type="button"
        //                   className="close"
        //                   data-dismiss="modal"
        //                   aria-label="Close"
        //                 >
        //                   <span aria-hidden="true">&times;</span>
        //                 </button>
        //               </div>
        //               <div className="modal-body table-responsive">
        //                 <table
        //                   id=""
        //                   className="table table-bordered table-hover"
        //                 >
        //                   <thead>
        //                     <tr>
        //                       <th className="all">Sr. No</th>
        //                       <th className="all">Product</th>
        //                       <th className="none">Quantity</th>
        //                       <th className="none">Price</th>
        //                     </tr>
        //                   </thead>
        //                   <tbody>
        //                     {order.orderitem ? (
        //                       order.orderitem.map((item, i) => {
        //                         return (
        //                           <React.Fragment key={item.id}>
        //                             <tr>
        //                               <td>{i + 1}.</td>
        //                               <td>{item.product.name} </td>
        //                               <td>{item.quantity} </td>
        //                               <td>{Number(item.price).toFixed(2)} </td>
        //                             </tr>
        //                           </React.Fragment>
        //                         );
        //                       })
        //                     ) : (
        //                       <React.Fragment></React.Fragment>
        //                     )}
        //                   </tbody>
        //                 </table>
        //               </div>
        //               <div className="modal-footer">
        //                 <button
        //                   type="button"
        //                   className="btn btn-secondary"
        //                   data-dismiss="modal"
        //                 >
        //                   Close
        //                 </button>
        //                 {/* <button type="button" className="btn btn-primary">Save changes</button> */}
        //               </div>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //       <div className="card-footer text-center">
        //         <button
        //           className="btn btn-sm btn-info mr-2"
        //           data-toggle="modal"
        //           data-target={"#exampleModal" + order.id}
        //         >
        //           View Details
        //         </button>
        //         {order.status === 0 ? (
        //           <button
        //             className="btn btn-success btn-sm mr-2"
        //             onClick={function () {
        //               props.updateState(order.id, 1);
        //             }}
        //           >
        //             Accept
        //           </button>
        //         ) : (
        //           ""
        //         )}

        //         {order.status === 0 ? (
        //           <button
        //             className="btn btn-sm btn-danger"
        //             onClick={function () {
        //               props.updateState(order.id, 3);
        //             }}
        //           >
        //             Reject
        //           </button>
        //         ) : (
        //           ""
        //         )}

        //         {order.status === 1 ? (
        //           <button
        //             className="btn btn-sm btn-success"
        //             onClick={function () {
        //               props.updateState(order.id, 2);
        //             }}
        //           >
        //             Mark as Complete
        //           </button>
        //         ) : (
        //           ""
        //         )}
        //       </div>
        //     </div>
        //   </div>
        // );
      })}
    </>
  );
}

export default OrderCard;
