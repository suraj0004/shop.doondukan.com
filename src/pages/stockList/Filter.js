import React from "react";

const Filter = ({
  stockFilter,
  sortType,
  searchKey,
  handleSearchChange,
  handleStockFilterChange,
  handleSortTypeChange,
  handleSearch,
}) => {
  return (
    <div className="row">
      <div className="col-sm-4 col-12">
        <div className="form-group">
          <select
            className="custom-select"
            value={stockFilter}
            onChange={handleStockFilterChange}
          >
            <option value="all-stock">All-Stock</option>
            <option value="in-stock">In-Stock</option>
            <option value="out-of-stock">Out-of-Stock</option>
          </select>
        </div>
      </div>
      <div className="col-sm-4 col-12">
        <div className="form-group">
          <select
            className="custom-select"
            value={sortType}
            onChange={handleSortTypeChange}
          >
            <option value="qty-low-to-high">Qty-Low-to-High</option>
            <option value="qty-high-to-tow">Qty-High-to-Low</option>
            <option value="price-low-to-high">Price-Low-to-High</option>
            <option value="price-high-to-tow">Price-High-to-Low</option>
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
