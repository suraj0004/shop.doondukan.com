import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import UrlService from '../../services/UrlService';
import axios from 'axios';
import auth from '../../services/AuthService';


function  updateState(id) {
  
    const postData = {
          id  : id,
      };
    axios.post(UrlService.updateOrderStatus(), postData,  {
        headers: auth.apiHeader()
    }).then(res=>{
         console.log(res, 'success');
         
    }).catch(err=> {
          console.log(err, 'error');
          
    })

  
 }; 



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
                                    <button className="btn btn-info mr-2" data-toggle="modal" data-target="#exampleModal">View Details</button>
                                    <button className="btn btn-success" onClick={function(){updateState(order.id)}} >Confirm</button>
                               </div>
                               <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Order Products</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Sr. No</th>
                                                    <th>Product</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(order.orderitem) ? 
                                                (order.orderitem.map((item) => {
                                                    return (
                                                        <React.Fragment key={item.id}>
                                                            <tr>
                                                                <td>1</td>
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
                                        <button type="button" className="btn btn-primary">Save changes</button>
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