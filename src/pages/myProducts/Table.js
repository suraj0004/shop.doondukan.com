import React from "react";
import Moment from "react-moment";
import "moment-timezone";
import NoRecord from "../../components/NoRecord";

function Table(props) {
  const { data, currentPage, perPage, showEditModal } = props;

  return (
    <div className="row">
      <NoRecord data_count={data.length} />
      {data.map((product, index) => {
        return (
          <div className="col-12 col-md-6 p-3 " key={product.id.toString()}>
            <div className="card shadow">
              <div className="card-header">
                {" "}
                <strong> #{(currentPage - 1) * perPage + (index + 1)} </strong>
                <button className="btn btn-info float-right" onClick={() => showEditModal(product)}> <i className="fa fa-edit"></i> </button>
              </div>
              <div className="card-body row">
                <div className="col-sm-4 text-center img-responsive">
                  <img
                    src={product.image}
                    className="img-fluid"
                    alt={product.name}
                  />
                </div>
                <div className="col-sm-8 text-left">
                  <p>
                    <strong>Product: </strong>
                    {product.name +
                      " | " +
                      product.weight +
                      product.weight_type}{" "}
                  </p>
                  <p>
                    <strong>Category: </strong>{" "}
                    {product?.category?.category_name
                      ? product.category.category_name
                      : " -- "}
                  </p>
                  {
                    Number(product.price)
                    ?<p>
                      <strong>Cost/Purchase Price: </strong> Rs. {product.price}{" "}/-
                    </p>
                    :null
                  }
                  
                  <p>
                    <strong>Created On: </strong>
                    <Moment
                      local
                      format="D MMM, YYYY"
                      date={product.created_at}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Table;
