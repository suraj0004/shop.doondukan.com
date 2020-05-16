import React from 'react';
import {Link} from 'react-router-dom';
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu : "/"
    };
    
  }

  menuClick = (menu) => {
    if (this.state.menu === menu) {
      this.setState({
        menu : "/"
      });
    } else {
      this.setState({
        menu : menu
      });
    }
  
     
  }
  linkClick = () => {
   
      // if(document.body.classList.contains('sidebar-open'))
      //  {
      //   document.body.classList.remove('sidebar-open');
      //   document.body.classList.add('sidebar-closed');
      //   document.body.classList.add('sidebar-collapse');
       
       
      // }else{
        
      //     document.body.classList.add('sidebar-collapse');
        
      // }
    
  }
  
   render(){
     const props = this.props;
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
  
    <Link to='/' className="brand-link">
      <img src="asset/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3"
           style={{opacity: '.8'}}/>
      <span className="brand-text font-weight-light">Meri Dukan</span>
    </Link>

    
    <div className="sidebar">
     
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="asset/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Img"/>
        </div>
        <div className="info">
          <a href="/" className="d-block">Suraj upadhyay</a>
        </div>
      </div>

    
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">


        <li className="nav-item ">
        <Link to='/' className={(props.pathname === "/") ? "nav-link active": "nav-link " }  >
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>Dashboard</p>
              </Link>
          </li>

          <li className="nav-header">OPERATIONS</li>

          <li className={ (props.pathname === "/addPurchase" || props.pathname === "/purchaseList" || this.state.menu === "purchase" )?"nav-item has-treeview menu-open":"nav-item has-treeview" } >
          <a  onClick={ () => this.menuClick("purchase") } className="nav-link " >
              <i className="nav-icon fas fa-chart-pie"></i>
              <p>
                Purchases
                <i className="right fas fa-angle-left"></i>
              </p>
              </a>
            <ul className="nav nav-treeview ">
              <li className="nav-item">
              <Link to='/addPurchase' className={(props.pathname === "/addPurchase") ? "nav-link active": "nav-link " } >
                  <i className="far fa-circle nav-icon"></i>
                  <p>Add Purchase</p>
                 </Link>
              </li>
              <li className="nav-item">
              <Link to='/purchaseList' className={(props.pathname === "/purchaseList") ? "nav-link active": "nav-link " } >
                  <i className="far fa-circle nav-icon"></i>
                  <p>Purchase List</p>
                 </Link>
              </li>
            
            </ul>
          </li>


            <li className={ (props.pathname === "/setPrice" || props.pathname === "/stockList"  || this.state.menu === "stock" )?"nav-item has-treeview menu-open":"nav-item has-treeview" } >
          <a  onClick={ () => this.menuClick("stock") }  className="nav-link " >
              <i className="nav-icon fas fa-chart-pie"></i>
              <p>
                Stock
                <i className="right fas fa-angle-left"></i>
              </p>
              </a>
            <ul className="nav nav-treeview ">
              <li className="nav-item">
              <Link to='/setPrice' className={(props.pathname === "/setPrice") ? "nav-link active": "nav-link " } >
                  <i className="far fa-circle nav-icon"></i>
                  <p>Set Selling Price</p>
                 </Link>
              </li>
              <li className="nav-item">
              <Link to='/stockList' className={(props.pathname === "/stockList") ? "nav-link active": "nav-link " } >
                  <i className="far fa-circle nav-icon"></i>
                  <p>Stock List</p>
                 </Link>
              </li>
            
            </ul>
          </li>


          <li className={ (props.pathname === "/generateBill" || props.pathname === "/billList"  || this.state.menu === "sold" )?"nav-item has-treeview menu-open":"nav-item has-treeview" } >
          <a   onClick={ () => this.menuClick("sold") }  className="nav-link " >
              <i className="nav-icon fas fa-chart-pie"></i>
              <p>
                Bill
                <i className="right fas fa-angle-left"></i>
              </p>
              </a>
            <ul className="nav nav-treeview ">
              <li className="nav-item">
              <Link to='/generateBill' className={(props.pathname === "/generateBill") ? "nav-link active": "nav-link " } >
                  <i className="far fa-circle nav-icon"></i>
                  <p>Generate Bill</p>
                 </Link>
              </li>
              <li className="nav-item">
              <Link to='/billList' className={(props.pathname === "/billList") ? "nav-link active": "nav-link " } >
                  <i className="far fa-circle nav-icon"></i>
                  <p>Bill List</p>
                 </Link>
              </li>
            
            </ul>
          </li>
         
          
          
        </ul>
      </nav>
     
    </div>
    
  </aside>
        );
        }
}

export default Sidebar;