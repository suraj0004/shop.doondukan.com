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
      <img src="/asset/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3"
           style={{opacity: '.8'}}/>
      <span className="brand-text font-weight-light">Meri Dukan</span>
    </Link>

    
    <div className="sidebar">
     
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="/asset/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Img"/>
        </div>
        <div className="info">
        <Link to='/profile' className={(props.pathname === "/profile") ? "d-block active": "d-block " } >Suraj upadhyay</Link>
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


          <li className="nav-item ">
        <Link to='/generateBill' className={(props.pathname === "/generateBill") ? "nav-link active": "nav-link " }  >
              <i className="nav-icon fas fa-cash-register"></i>
              <p>Generate Bill</p>
              </Link>
          </li>


          <li className="nav-header">Operations</li>

          <li className={ (props.pathname === "/addPurchase" || props.pathname === "/purchaseList" || this.state.menu === "purchase" )?"nav-item has-treeview menu-open":"nav-item has-treeview" } >
          <a  onClick={ () => this.menuClick("purchase") } className="nav-link " >
              <i className="nav-icon fas fa-money-bill-alt"></i>
              <p>
                Purchases
                <i className="right fas fa-angle-left"></i>
              </p>
              </a>
            <ul className="nav nav-treeview ">
              <li className="nav-item">
              <Link to='/addPurchase' className={(props.pathname === "/addPurchase") ? "nav-link active": "nav-link " } >
                  <i className="nav-icon fa fa-plus"></i>
                  <p>Add Purchase</p>
                 </Link>
              </li>
              <li className="nav-item">
              <Link to='/purchaseList' className={(props.pathname === "/purchaseList") ? "nav-link active": "nav-link " } >
                  <i className="nav-icon fa fa-clipboard-list"></i>
                  <p>Purchase List</p>
                 </Link>
              </li>
            
            </ul>
          </li>


            <li className={ (props.pathname === "/setPrice" || props.pathname === "/stockList"  || this.state.menu === "stock" )?"nav-item has-treeview menu-open":"nav-item has-treeview" } >
          <a  onClick={ () => this.menuClick("stock") }  className="nav-link " >
              <i className="nav-icon fas fa-boxes"></i>
              <p>
                Stock
                <i className="right fas fa-angle-left"></i>
              </p>
              </a>
            <ul className="nav nav-treeview ">
              <li className="nav-item">
              <Link to='/setPrice' className={(props.pathname === "/setPrice") ? "nav-link active": "nav-link " } >
                  <i className="fa fa-tags nav-icon"></i>
                  <p>Set Selling Price</p>
                 </Link>
              </li>
              <li className="nav-item">
              <Link to='/stockList' className={(props.pathname === "/stockList") ? "nav-link active": "nav-link " } >
                  <i className="fa fa-warehouse nav-icon"></i>
                  <p>Stock List</p>
                 </Link>
              </li>
            
            </ul>
          </li>

          <li className="nav-item">
              <Link to='/billList' className={(props.pathname === "/billList") ? "nav-link active": "nav-link " } >
                  <i className="nav-icon fa fa-file-invoice-dollar"></i>
                  <p>Bill List</p>
                 </Link>
              </li>
              <li className="nav-item">
              <Link to='/saleList' className={(props.pathname === "/saleList") ? "nav-link active": "nav-link " } >
                  <i className="nav-icon fa fa-layer-group"></i>
                  <p>Sale List</p>
                 </Link>
              </li>





          <li className="nav-header">Reports/Charts</li>

<li className={
   (
      props.pathname === "/top-highest-selling-products" ||
      props.pathname === "/top-profitable-products" || 
      props.pathname === "/top-lowest-selling-products" || 
      props.pathname === "/top-less-profitable-products"  || 
      props.pathname === "/top-loosely-products" 
      || this.state.menu === "products" 
     )?"nav-item has-treeview menu-open":"nav-item has-treeview"
    } >
<a  onClick={ () => this.menuClick("products") } className="nav-link " >
    <i className="nav-icon fas fa-chart-pie"></i>
    <p>
      Products
      <i className="right fas fa-angle-left"></i>
    </p>
    </a>
  <ul className="nav nav-treeview ">
    <li className="nav-item">
    <Link to='/top-highest-selling-products' className={(props.pathname === "/top-highest-selling-products") ? "nav-link active": "nav-link " } >
        <i className="far fa-circle nav-icon"></i>
        <p>Highest Selling</p>
       </Link>
    </li>

    <li className="nav-item">
    <Link to='/top-profitable-products' className={(props.pathname === "/top-profitable-products") ? "nav-link active": "nav-link " } >
        <i className="far fa-circle nav-icon"></i>
        <p>profitable</p>
       </Link>
    </li>

    <li className="nav-item">
    <Link to='/top-lowest-selling-products' className={(props.pathname === "/top-lowest-selling-products") ? "nav-link active": "nav-link " } >
        <i className="far fa-circle nav-icon"></i>
        <p>Lowest Selling</p>
       </Link>
    </li>
  
    <li className="nav-item">
    <Link to='/top-less-profitable-products' className={(props.pathname === "/top-less-profitable-products") ? "nav-link active": "nav-link " } >
        <i className="far fa-circle nav-icon"></i>
        <p>Less Profitable</p>
       </Link>
    </li>

    <li className="nav-item">
    <Link to='/top-loosely-products' className={(props.pathname === "/top-loosely-products") ? "nav-link active": "nav-link " } >
        <i className="far fa-circle nav-icon"></i>
        <p>Loosely</p>
       </Link>
    </li>
  </ul>
</li>




<li className={
   (
      props.pathname === "/sale-vs-profit" ||
      props.pathname === "/all-in-one"
      || this.state.menu === "comparison" 
     )?"nav-item has-treeview menu-open":"nav-item has-treeview"
    } >
<a  onClick={ () => this.menuClick("comparison") } className="nav-link " >
    <i className="nav-icon fas fa-chart-pie"></i>
    <p>
    Comparison
      <i className="right fas fa-angle-left"></i>
    </p>
    </a>
  <ul className="nav nav-treeview ">
    <li className="nav-item">
    <Link to='/sale-vs-profit' className={(props.pathname === "/sale-vs-profit") ? "nav-link active": "nav-link " } >
        <i className="far fa-circle nav-icon"></i>
        <p>Sale Vs Profit</p>
       </Link>
    </li>

    <li className="nav-item">
    <Link to='/all-in-one' className={(props.pathname === "/all-in-one") ? "nav-link active": "nav-link " } >
        <i className="far fa-circle nav-icon"></i>
        <p>All In 1</p>
       </Link>
    </li>

  
  </ul>
</li>


<li className={
   (
      props.pathname === "/sale-growth" ||
      props.pathname === "/purchase-growth" ||
      props.pathname === "/profit-growth"
      || this.state.menu === "growth" 
     )?"nav-item has-treeview menu-open":"nav-item has-treeview"
    } >
<a  onClick={ () => this.menuClick("growth") } className="nav-link " >
    <i className="nav-icon fas fa-chart-pie"></i>
    <p>
    Growth
      <i className="right fas fa-angle-left"></i>
    </p>
    </a>
  <ul className="nav nav-treeview ">
    <li className="nav-item">
    <Link to='/sale-growth' className={(props.pathname === "/sale-growth") ? "nav-link active": "nav-link " } >
        <i className="far fa-circle nav-icon"></i>
        <p>Sale</p>
       </Link>
    </li>

    <li className="nav-item">
    <Link to='/purchase-growth' className={(props.pathname === "/purchase-growth") ? "nav-link active": "nav-link " } >
        <i className="far fa-circle nav-icon"></i>
        <p>purchase</p>
       </Link>
    </li>


    <li className="nav-item">
    <Link to='/profit-growth' className={(props.pathname === "/profit-growth") ? "nav-link active": "nav-link " } >
        <i className="far fa-circle nav-icon"></i>
        <p>Profit</p>
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