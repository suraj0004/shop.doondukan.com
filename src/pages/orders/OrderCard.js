import React from 'react';
// import { Link } from 'react-router-dom';
// import Moment from 'react-moment';
import 'moment-timezone';





function OrderCard(props) {

    var  data  = props;
    
    return (
        <>
        {data.data.map((order, index) => {
            return (
                    <div className="col-12 col-sm-6 col-md-3 d-flex align-items-stretch" key={order.id} >
                        <div className="card bg-light" style={{ width: 'inherit' }}>
                            <div className="card-header text-muted border-bottom-1">
                                Order No. {index+1} 
                            </div>
                            <div className="card-body text-left" style={{paddingBottom : '0px'}}>
                                <p className="text-muted text-sm"> <strong> Buyer Name :  </strong>  {order.buyer.name}
                                </p>
                                <p className="text-muted text-sm"> <strong> Phone Number : </strong> {order.buyer.phone} </p>
                                <p className="text-muted text-sm"> <strong> Total Amount :  </strong> {order.order_amount}  </p>
                                <p className="text-muted text-sm"> <strong> Pickup Time : </strong> {order.from_time} to {order.to_time}  </p>
                               
                               <div className="d-flex">
                                    <button className="btn btn-sm btn-info mr-2" data-toggle="modal" data-target={"#exampleModal"+order.id}>View Details</button>
                                    { order.status == 0 ? <button className="btn btn-success btn-sm mr-2" onClick={function(){props.updateState(order.id, 1)}} >Accept</button>
                                       :   '' }
                                    {order.status == 1 ? <span className="badge text-success">Confirmed</span> :'' }
                                    {order.status == 3 ? <span className="badge text-secondary">Canceled</span> : '' }
                                    {order.status == 0 ? <button className="btn btn-sm btn-success" onClick={function(){props.updateState(order.id, 3)}} >Cancel</button> : '' } 
                                   
                               </div>
                               <div className="modal fade" id={"exampleModal"+order.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Order Products</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body table-responsive">
                                        <table id="" className="table table-bordered table-hover my_table">
                                            <thead>
                                                <tr>
                                                    <th  className="all">Sr. No</th>
                                                    <th  className="all">Product</th>
                                                    <th className="none">Quantity</th>
                                                    <th className="none">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(order.orderitem) ? 
                                                (order.orderitem.map((item, i) => {
                                                    return (
                                                        <React.Fragment key={item.id}>
                                                            <tr>
                                                                <td>{i+1}.</td>
                                                                <td>{item.product.name} </td>
                                                                <td>{item.quantity } </td>
                                                                <td>{item.price} </td>
                                                            </tr>
                                                        </React.Fragment> 
                                                    )
                                                }))
                                               :
                                                <React.Fragment></React.Fragment>

                                            }
                                               
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="text-center">
                                    
                                </div>
                            </div>
                        </div>
                    </div>

        
            )
        })}
        </>
    )
}

export default OrderCard;