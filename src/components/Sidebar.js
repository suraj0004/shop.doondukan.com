import React from "react";
import { Link } from "react-router-dom";
import cookieService from "../services/CookieService";
import UrlService from "../services/UrlService";
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: "/",
      image: null,
      name: null,
    };
  }

  menuClick = (menu) => {
    if (this.state.menu === menu) {
      this.setState({
        menu: "/",
      });
    } else {
      this.setState({
        menu: menu,
      });
    }
  };

  componentDidMount() {
    const name = cookieService.get("name")
      ? cookieService.get("name")
      : "Owner";
    const image = UrlService.userImageUrl() + cookieService.get("image");
    this.setState({
      name: name,
      image: image,
    });
  }

  setImage = () => {
    this.setState({
      image: "/asset/dist/img/user2-160x160.jpg",
    });
  };

  render() {
    const props = this.props;
    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a target="_blank" rel="noopener noreferrer" href="https://doondukan.com" className="brand-link">
          <img
            src="/logo192.png"
            alt="DoonDukan Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">DoonDukan</span>
        </a>

        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
               <li className="nav-header">Dashboard & My Profile</li>

               <li className="nav-item ">
                <Link
                  to="/"
                  className={
                    props.pathname === "/" ? "nav-link active" : "nav-link "
                  }
                >
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>Dashboard</p>
                </Link>
              </li>

               <li className="nav-item ">
                <Link
                  to="/profile"
                  className={
                    props.pathname === "/profile" ? "nav-link active" : "nav-link "
                  }
                >
                 
                  <img
                src={this.state.image}
                onError={this.setImage}
                className="img-circle elevation-3 nav-icon"
                alt="User Img"
                style={{ height: "25px", width: "25px" }}
              />
                  <p> {this.state.name}</p>
                </Link>
              </li>

            

             

              <li className="nav-header">Inventory Management</li>

              <li
                className={
                  props.pathname === "/addPurchase" ||
                  props.pathname === "/purchaseList" ||
                  this.state.menu === "purchase"
                    ? "nav-item has-treeview menu-open"
                    : "nav-item has-treeview"
                }
              >
                <div
                  onClick={() => this.menuClick("purchase")}
                  className="nav-link sidebar-menu"
                >
                  <i className="nav-icon fas fa-money-bill-alt"></i>
                  <p>
                  Manage Purchase 
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </div>
                <ul className="nav nav-treeview ">
                  <li className="nav-item">
                    <Link
                      to="/addPurchase"
                      className={
                        props.pathname === "/addPurchase"
                          ? "nav-link active"
                          : "nav-link "
                      }
                    >
                      <i className="nav-icon fa fa-plus"></i>
                      <p>Purchase Product</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/purchaseList"
                      className={
                        props.pathname === "/purchaseList"
                          ? "nav-link active"
                          : "nav-link "
                      }
                    >
                      <i className="nav-icon fa fa-clipboard-list"></i>
                      <p>Purchase History</p>
                    </Link>
                  </li>
                </ul>
              </li>

              <li
                className={
                  props.pathname.includes("/setPrice") ||
                  props.pathname === "/stockList" ||
                  this.state.menu === "stock"
                    ? "nav-item has-treeview menu-open"
                    : "nav-item has-treeview"
                }
              >
                <div
                  onClick={() => this.menuClick("stock")}
                  className="nav-link sidebar-menu"
                >
                  <i className="nav-icon fas fa-boxes"></i>
                  <p>
                    Manage Stock
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </div>
                <ul className="nav nav-treeview ">
                 
                  <li className="nav-item">
                    <Link
                      to="/stockList"
                      className={
                        props.pathname === "/stockList"
                          ? "nav-link active"
                          : "nav-link "
                      }
                    >
                      <i className="fa fa-warehouse nav-icon"></i>
                      <p>Products/Stock</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/setPrice"
                      className={
                        props.pathname.includes("/setPrice")
                          ? "nav-link active"
                          : "nav-link "
                      }
                    >
                      <i className="fa fa-tags nav-icon"></i>
                      <p>Products Selling Price</p>
                    </Link>
                  </li>

                </ul>
              </li>
              <li className="nav-header">Online Order Management</li>
             

              <li className="nav-item ">
                <Link
                  to="/orders"
                  className={
                    props.pathname === "/orders"
                      ? "nav-link active"
                      : "nav-link "
                  }
                >
                  <i className="nav-icon fas fa-list-ul"></i>
                  <p>Online Orders </p>
                </Link>
              </li>

              

              <li className="nav-header">Offline Order Management</li>
              <li className="nav-item ">
                <Link
                  to="/generateBill"
                  className={
                    props.pathname === "/generateBill"
                      ? "nav-link active"
                      : "nav-link "
                  }
                >
                  <i className="nav-icon fas fa-cash-register"></i>
                  <p>Generate Offline Invoice</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/billList"
                  className={
                    props.pathname === "/billList"
                      ? "nav-link active"
                      : "nav-link "
                  }
                >
                  <i className="nav-icon fa fa-file-invoice-dollar"></i>
                  <p>Offline Invoices</p>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  to="/saleList"
                  className={
                    props.pathname === "/saleList"
                      ? "nav-link active"
                      : "nav-link "
                  }
                >
                  <i className="nav-icon fa fa-layer-group"></i>
                  <p>Sale History</p>
                </Link>
              </li> */}

              {/* <li className="nav-header">Return Management</li>

              <li
                className={
                  props.pathname === "/addPurchaseReturn" ||
                  props.pathname === "/purchaseReturnList" ||
                  this.state.menu === "purchaseReturn"
                    ? "nav-item has-treeview menu-open"
                    : "nav-item has-treeview"
                }
              >
                <div
                  onClick={() => this.menuClick("purchaseReturn")}
                  className="nav-link sidebar-menu"
                >
                  <i className="nav-icon fas fa-exchange-alt"></i>
                  <p>
                    Purchase Return
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </div>
                <ul className="nav nav-treeview ">
                  <li className="nav-item">
                    <Link
                      to="/addPurchaseReturn"
                      className={
                        props.pathname === "/addPurchaseReturn"
                          ? "nav-link active"
                          : "nav-link "
                      }
                    >
                      <i className="nav-icon fa fa-plus"></i>
                      <p>Add Return</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/purchaseReturnList"
                      className={
                        props.pathname === "/purchaseReturnList"
                          ? "nav-link active"
                          : "nav-link "
                      }
                    >
                      <i className="nav-icon fa fa-clipboard-list"></i>
                      <p>Return Product List</p>
                    </Link>
                  </li>
                </ul>
              </li>

              <li
                className={
                  props.pathname === "/addSaleReturn" ||
                  props.pathname === "/saleReturnList" ||
                  this.state.menu === "sellReturn"
                    ? "nav-item has-treeview menu-open"
                    : "nav-item has-treeview"
                }
              >
                <div
                  onClick={() => this.menuClick("sellReturn")}
                  className="nav-link sidebar-menu"
                >
                  <i className="nav-icon fas fa-undo"></i>
                  <p>
                    Sale Return
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </div>
                <ul className="nav nav-treeview ">
                  <li className="nav-item">
                    <Link
                      to="/addSaleReturn"
                      className={
                        props.pathname === "/addSaleReturn"
                          ? "nav-link active"
                          : "nav-link "
                      }
                    >
                      <i className="nav-icon fa fa-plus"></i>
                      <p>Add Return</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/saleReturnList"
                      className={
                        props.pathname === "/saleReturnList"
                          ? "nav-link active"
                          : "nav-link "
                      }
                    >
                      <i className="nav-icon fa fa-clipboard-list"></i>
                      <p>Return Product List</p>
                    </Link>
                  </li>
                </ul>
              </li> */}

              {/* <li className="nav-header">Reports &amp; Charts</li> */}

              {/* <li
                className={
                  props.pathname === "/top-highest-selling-products" ||
                  props.pathname === "/top-profitable-products" ||
                  props.pathname === "/top-lowest-selling-products" ||
                  props.pathname === "/top-less-profitable-products" ||
                  props.pathname === "/top-loosely-products" ||
                  this.state.menu === "products"
                    ? "nav-item has-treeview menu-open"
                    : "nav-item has-treeview"
                }
              >
                <div
                  onClick={() => this.menuClick("products")}
                  className="nav-link sidebar-menu"
                >
                  <i className="nav-icon fas fa-database"></i>
                  <p>
                    Product Report
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </div>
                <ul className="nav nav-treeview ">
                  <li className="nav-item">
                    <Link
                      to="/top-highest-selling-products"
                      className={
                        props.pathname === "/top-highest-selling-products"
                          ? "nav-link active"
                          : "nav-link "
                      }
                    >
                      <i className="fa fa-arrow-up nav-icon"></i>
                      <p>Highest Selling</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/top-lowest-selling-products"
                      className={
                        props.pathname === "/top-lowest-selling-products"
                          ? "nav-link active"
                          : "nav-link "
                      }
                    >
                      <i className="fa fa-arrow-down nav-icon"></i>
                      <p>Lowest Selling</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/top-profitable-products"
                      className={
                        props.pathname === "/top-profitable-products"
                          ? "nav-link active"
                          : "nav-link "
                      }
                    >
                      <i className="fa fa-chart-line nav-icon"></i>
                      <p>Profitable</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/top-less-profitable-products"
                      className={
                        props.pathname === "/top-less-profitable-products"
                          ? "nav-link active"
                          : "nav-link "
                      }
                    >
                      <i className="fa fa-chart-area nav-icon"></i>
                      <p>Less Profitable</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/top-loosely-products"
                      className={
                        props.pathname === "/top-loosely-products"
                          ? "nav-link active"
                          : "nav-link "
                      }
                    >
                      <i className="fa fa-thumbs-down nav-icon"></i>
                      <p>Loosely</p>
                    </Link>
                  </li>
                </ul>
              </li>

              <li
                className={
                  props.pathname === "/sale-vs-profit" ||
                  props.pathname === "/all-in-one" ||
                  props.pathname === "/quantity-vs-sale" ||
                  props.pathname === "/quantity-vs-profit" ||
                  this.state.menu === "comparison"
                    ? "nav-item has-treeview menu-open"
                    : "nav-item has-treeview"
                }
              >
                <div
                  onClick={() => this.menuClick("comparison")}
                  className="nav-link sidebar-menu"
                >
                  <i className="nav-icon fas fa-greater-than-equal"></i>
                  <p>
                    Comparison Report
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </div>
                <ul className="nav nav-treeview ">
                  <li className="nav-item">
                    <Link
                      to="/sale-vs-profit"
                      className={
                        props.pathname === "/sale-vs-profit"
                          ? "nav-link active"
                          : "nav-link "
                      }
                    >
                      <i className="fa fa-arrows-alt-h nav-icon"></i>
                      <p>Sale Vs Profit</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/quantity-vs-sale"
                      className={
                        props.pathname === "/quantity-vs-sale"
                          ? "nav-link active"
                          : "nav-link "
                      }
                    >
                      <i className="fa fa-compress-alt nav-icon"></i>
                      <p>Quantity Vs Sale</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/quantity-vs-profit"
                      className={
                        props.pathname === "/quantity-vs-profit"
                          ? "nav-link active"
                          : "nav-link "
                      }
                    >
                      <i className="fa fa-compress-arrows-alt nav-icon"></i>
                      <p>Quantity Vs Profit</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/all-in-one"
                      className={
                        props.pathname === "/all-in-one"
                          ? "nav-link active"
                          : "nav-link "
                      }
                    >
                      <i className="fa fa-border-all nav-icon"></i>
                      <p>ALL IN ONE</p>
                    </Link>
                  </li>
                </ul>
              </li>

              <li
                className={
                  props.pathname === "/sale-growth" ||
                  props.pathname === "/purchase-growth" ||
                  props.pathname === "/profit-growth" ||
                  this.state.menu === "growth"
                    ? "nav-item has-treeview menu-open"
                    : "nav-item has-treeview"
                }
              >
                <div
                  onClick={() => this.menuClick("growth")}
                  className="nav-link sidebar-menu"
                >
                  <i className="nav-icon fas fa-hand-holding-water"></i>
                  <p>
                    Growth Report
                    <i className="right fas fa-angle-left"></i>
                  </p>
                </div>
                <ul className="nav nav-treeview ">
                  <li className="nav-item">
                    <Link
                      to="/sale-growth"
                      className={
                        props.pathname === "/sale-growth"
                          ? "nav-link active"
                          : "nav-link "
                      }
                    >
                      <i className="fa fa-chart-bar nav-icon"></i>
                      <p>Sale</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/purchase-growth"
                      className={
                        props.pathname === "/purchase-growth"
                          ? "nav-link active"
                          : "nav-link "
                      }
                    >
                      <i className="fa fa-chart-bar nav-icon"></i>
                      <p>Purchase</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/profit-growth"
                      className={
                        props.pathname === "/profit-growth"
                          ? "nav-link active"
                          : "nav-link "
                      }
                    >
                      <i className="fa fa-chart-bar nav-icon"></i>
                      <p>Profit</p>
                    </Link>
                  </li>
                </ul>
              </li> */}

              <li className="nav-header">Extra Features</li>
              {/* <li className="nav-item ">
                <Link to='/temp-brands' className={(props.pathname === "/temp-brands") ? "nav-link active" : "nav-link "}  >
                  <i className="nav-icon fas fa-user"></i>
                  <p>My Brands</p>
                </Link>
              </li>
              <li className="nav-item ">
                <Link to='/temp-catogries' className={(props.pathname === "/temp-catogries") ? "nav-link active" : "nav-link "}  >
                  <i className="nav-icon fas fa-user"></i>
                  <p>My Categories</p>
                </Link>
              </li> */}
              <li className="nav-item ">
                <Link to='/my-products' className={(props.pathname === "/my-products") ? "nav-link active" : "nav-link "}  >
                  <i className="nav-icon fas fa-user"></i>
                  <p>Product Builder</p>
                </Link>
              </li>

              {/* <li className="nav-item ">
                <Link to='/contact-us' className={(props.pathname === "/contact-us") ? "nav-link active" : "nav-link "}  >
                  <i className="nav-icon fas fa-phone"></i>
                  <p>Contact Us</p>
                </Link>
              </li> */}

              <li className="nav-item ">
                <a target="_blank" rel="noopener noreferrer" href="https://doondukan.com/contact" className="nav-link">
                  <i className="nav-icon fas fa-phone"></i>
                  <p>Contact Us</p>
                </a>
              </li>

              <li className="nav-header"></li>
              <li className="nav-header"></li>
            </ul>
          </nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
