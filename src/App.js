import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { WithoutAuthRoutes } from "./WithoutAuthRoutes";
import { handleSession } from "./helpers/Helpers";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/orders";
import AddPurchase from "./pages/AddPurchase";
import PurchaseList from "./pages/PurchaseList";
import StockList from "./pages/StockList";
import SetPrice from "./pages/SetPrice";
import GenerateBill from "./pages/GenerateBill";
import BillList from "./pages/BillList";
import SaleList from "./pages/SaleList";
import Invoice from "./pages/Invoice";
import Profile from "./pages/Profile";
import HighestSelling from "./pages/reports/products/Highest Selling";
import LowestSelling from "./pages/reports/products/Lowest Selling";
import Profitable from "./pages/reports/products/Profitable";
import LessProfitable from "./pages/reports/products/LessProfitable";
import Loosely from "./pages/reports/products/Loosely";
import SaleVsProfit from "./pages/reports/comparison/SaleVsProfit";
import ALL_inOne from "./pages/reports/comparison/ALL_inOne";
import QuantityVsSale from "./pages/reports/comparison/QuantityVsSale";
import QuantityVsProfit from "./pages/reports/comparison/QuantityVsProfit";
import SaleGrowth from "./pages/reports/growth/SaleGrowth";
import ProfitGrowth from "./pages/reports/growth/ProfitGrowth";
import PurchaseGrowth from "./pages/reports/growth/PurchaseGrowth";
import MyProductList from "./pages/myProducts/MyProductList";
import AddPurchaseReturn from "./pages/addPurchaseReturn";
import PurchaseReturnList from "./pages/purchaseReturnList";
import AddSaleReturn from "./pages/addSaleReturn";
import SaleReturnList from "./pages/saleReturnList";
import Sign from "./pages/Signup";
import CatalogBuilder from "./pages/Catalog";
import InvoiceDetail from "./pages/V2/Invoice/Detail/"

class App extends Component {

  componentDidMount(){
    handleSession()
  }
 
  render() {
    return (
      <Router>
        <Switch>
          <ProtectedRoutes exact path="/" component={Dashboard} />
          <ProtectedRoutes exact path="/addPurchase" component={AddPurchase} />
          <ProtectedRoutes
            exact
            path="/purchaseList"
            component={PurchaseList}
          />
          <ProtectedRoutes exact path="/stockList" component={StockList} />
          <ProtectedRoutes exact path="/setPrice/:id?" component={SetPrice} />
          <ProtectedRoutes
            exact
            path="/generateBill"
            component={GenerateBill}
          />
          <ProtectedRoutes exact path="/orders" component={Orders} />
          <ProtectedRoutes exact path="/billList" component={BillList} />
          <ProtectedRoutes exact path="/saleList" component={SaleList} />
          <ProtectedRoutes exact path="/invoice/:id" component={Invoice} />
          <ProtectedRoutes exact path="/invoice/detail/:id" component={InvoiceDetail} />
          <ProtectedRoutes exact path="/profile" component={Profile} />

          <ProtectedRoutes
            exact
            path="/addPurchaseReturn"
            component={AddPurchaseReturn}
          />
          <ProtectedRoutes
            exact
            path="/purchaseReturnList"
            component={PurchaseReturnList}
          />

          <ProtectedRoutes
            exact
            path="/addSaleReturn"
            component={AddSaleReturn}
          />
          <ProtectedRoutes
            exact
            path="/saleReturnList"
            component={SaleReturnList}
          />

          <ProtectedRoutes
            exact
            path="/top-highest-selling-products"
            component={HighestSelling}
          />
          <ProtectedRoutes
            exact
            path="/top-lowest-selling-products"
            component={LowestSelling}
          />
          <ProtectedRoutes
            exact
            path="/top-profitable-products"
            component={Profitable}
          />
          <ProtectedRoutes
            exact
            path="/top-less-profitable-products"
            component={LessProfitable}
          />
          <ProtectedRoutes
            exact
            path="/top-loosely-products"
            component={Loosely}
          />

          <ProtectedRoutes
            exact
            path="/sale-vs-profit"
            component={SaleVsProfit}
          />
          <ProtectedRoutes
            exact
            path="/quantity-vs-sale"
            component={QuantityVsSale}
          />
          <ProtectedRoutes
            exact
            path="/quantity-vs-profit"
            component={QuantityVsProfit}
          />
          <ProtectedRoutes exact path="/all-in-one" component={ALL_inOne} />

          <ProtectedRoutes exact path="/sale-growth" component={SaleGrowth} />
          <ProtectedRoutes
            exact
            path="/profit-growth"
            component={ProfitGrowth}
          />
          <ProtectedRoutes
            exact
            path="/purchase-growth"
            component={PurchaseGrowth}
          />

          <ProtectedRoutes
            exact
            path="/my-products"
            component={MyProductList}
          />

          <ProtectedRoutes
            exact
            path="/catalogue-builder"
            component={CatalogBuilder}
          />

          <WithoutAuthRoutes exact path="/login" component={Login} />
          <WithoutAuthRoutes exact path="/sign-up" component={Sign} />
          <Route
            path="*"
            component={() => {
              return (
                <h1 style={{ textAlign: "center" }}> 404, PAGE NOT FOUND </h1>
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
