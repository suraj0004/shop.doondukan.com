import React, { Component } from 'react';
import {BrowserRouter as Router , Switch, Route } from 'react-router-dom';
import {ProtectedRoutes} from './ProtectedRoutes';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddPurchase from './pages/AddPurchase';
import PurchaseList from './pages/PurchaseList';
import StockList from "./pages/stockList";
import SetPrice from './pages/SetPrice'; 
import GenerateBill from './pages/GenerateBill';
import BillList from './pages/BillList';
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
                    <Route exact path='/login' component = {Login} />
                    <Route path="*" component = { ()=> { return <h1 style={{ textAlign: 'center' }} > 404, PAGE NOT FOUND </h1> } } />
                 </Switch>

        
            
        </Router>
        
  
          );
     }
}

export default App;
