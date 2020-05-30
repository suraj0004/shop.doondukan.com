import React, { Component } from 'react';
import {BrowserRouter as Router , Switch, Route } from 'react-router-dom';
import {ProtectedRoutes} from './ProtectedRoutes';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddPurchase from './pages/AddPurchase';
import PurchaseList from './pages/PurchaseList';
import StockList from "./pages/StockList";
import SetPrice from './pages/SetPrice'; 
import GenerateBill from './pages/GenerateBill';
import BillList from './pages/BillList';
import SaleList from "./pages/SaleList";
import Invoice from './pages/Invoice';
import Profile from './pages/Profile';
import HighestSelling from './pages/reports/products/Highest Selling';
class App extends Component { 
  



     render() {
          return (
            
        
        <Router>
          
           
                
                 <Switch>
                    <ProtectedRoutes exact path='/' component = {Dashboard} />
                    <ProtectedRoutes exact path='/addPurchase' component = {AddPurchase} />
                    <ProtectedRoutes exact path='/purchaseList' component = {PurchaseList} />
                    <ProtectedRoutes exact path='/stockList' component = {StockList} />
                    <ProtectedRoutes exact path='/setPrice' component = {SetPrice} />
                    <ProtectedRoutes exact path='/generateBill' component = {GenerateBill} />
                    <ProtectedRoutes exact path='/billList' component = {BillList} />
                    <ProtectedRoutes exact path='/saleList' component = {SaleList} />
                    <ProtectedRoutes exact path='/invoice/:id' component = {Invoice} />
                    <ProtectedRoutes exact path='/profile' component = {Profile} />
                    <ProtectedRoutes exact path='/top-highest-selling-products' component = {HighestSelling} />
                    <Route exact path='/login' component = {Login} />
                    <Route path="*" component = { ()=> { return <h1 style={{ textAlign: 'center' }} > 404, PAGE NOT FOUND </h1> } } />
                 </Switch>

        
            
        </Router>
        
  
          );
     }
}

export default App;
