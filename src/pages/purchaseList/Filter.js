import React from "react";

const Filter = ({
  purchaseDate,
  sortType,
  searchKey,
  handleSearchChange,
  handlePurchaseDateChange,
  handleSortTypeChange,
  handleSearch,
}) => {
  return (
    <div className="row">
      <div className="col-sm-4 col-12">
        <div className="form-group">
          <input className="form-control" type="date" onChange={handlePurchaseDateChange} value={purchaseDate} />
        </div>
      </div>
      <div className="col-sm-4 col-12">
        <div className="form-group">
          <select
            className="custom-select"
            value={sortType}
            onChange={handleSortTypeChange}
          >
            <option value="purchase-date-latest">Purchase-Date-Latest</option>
            <option value="purchase-date-oldest">Purchase-Date-Oldest</option>
            <option value="qty-low-to-high">Qty-Low-to-High</option>
            <option value="qty-high-to-low">Qty-High-to-Low</option>
          </select>
        </div>
      </div>
      <div className="col-sm-4 col-12">
        <div className="form-group">
          <div className="input-group input-group-sm">
            <input
              type="text"
              className="form-control"
              placeholder="Search Product Name"
              style={{ height: "38px" }}
              value={searchKey}
              onChange={handleSearchChange}
            />
            <span className="input-group-append">
              <button
                type="button"
                className="btn btn-info btn-flat"
                onClick={handleSearch}
              >
                Go!
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
