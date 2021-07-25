import React from "react";
import axios from "axios";
import UrlService from "../../../../services/UrlService";
import auth from "../../../../services/AuthService";
const OrderActions = ({ status, id, orderStatusUpdated }) => {
  const updateState = (newStatus) => {
    const postData = {
      id: id,
      status: newStatus,
    };
    axios
      .post(UrlService.updateOrderStatus(), postData, {
        headers: auth.apiHeader(),
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          orderStatusUpdated();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const acceptOrder = () => {
    updateState(1);
  };

  const rejectOrder = () => {
    updateState(3);
  };

  const completeOrder = () => {
    updateState(2);
  };

  const getActionsBtn = () => {
    if (status === 0) {
      return (
        <>
          <button
            className="btn btn-primary mr-2 font-weight-bold"
            onClick={acceptOrder}
          >
            Accept Now
          </button>
          <button
            className="btn btn-danger  mr-2 font-weight-bold"
            onClick={rejectOrder}
          >
            Reject
          </button>
        </>
      );
    }
    if (status === 1) {
      return (
        <>
          <button
            className="btn btn-success mr-2 font-weight-bold"
            onClick={completeOrder}
          >
            Mark as Completed
          </button>
        </>
      );
    }
  };

  return (
    <div className="card shadow text-center bg-dark">
      <div className="p-2 ">{getActionsBtn()}</div>
    </div>
  );
};

export default OrderActions;
