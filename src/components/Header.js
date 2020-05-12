import React from 'react';
import {Link,withRouter }from 'react-router-dom';
import auth from '../services/AuthService';

class  Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarCollapse : false,
    };
    
  }

  handleSidebar = () =>{
    this.setState( (prev) => (
      {
        sidebarCollapse : !prev.sidebarCollapse
      }
      ),()=>{
        if(this.state.sidebarCollapse){
          document.body.classList.add('sidebar-collapse');
        }else{
          document.body.classList.remove('sidebar-collapse');
        }
      })
  }

  handleLogout = () => {
    auth.logout( (success) =>{
      if(success){
          auth.afterLogout();
          this.props.history.push('/login');
      }else{
          alert("Opps! something went wrong.");
      }
 } );
  }
  render(){

  
        return (
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            
            <ul className="navbar-nav">
              <li className="nav-item">
                <button onClick={ this.handleSidebar } className="btn nav-link"  type="button"  ><i className="fas fa-bars"></i></button>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <Link to="/" className="nav-link">Dashboard</Link>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <Link to="/contact" className="nav-link">Contact</Link>
              </li>
            </ul>
        
         
        
            
            <ul className="navbar-nav ml-auto">
              
             
              <li className="nav-item dropdown">
                <a className="nav-link" data-toggle="dropdown" href="/">
                  <i className="far fa-bell"></i>
                  <span className="badge badge-warning navbar-badge">15</span>
                </a>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                  <span className="dropdown-item dropdown-header">15 Notifications</span>
                  <div className="dropdown-divider"></div>
                  <a href="/" className="dropdown-item">
                    <i className="fas fa-envelope mr-2"></i> 4 new messages
                    <span className="float-right text-muted text-sm">3 mins</span>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="/" className="dropdown-item">
                    <i className="fas fa-users mr-2"></i> 8 friend requests
                    <span className="float-right text-muted text-sm">12 hours</span>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="/" className="dropdown-item">
                    <i className="fas fa-file mr-2"></i> 3 new reports
                    <span className="float-right text-muted text-sm">2 days</span>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="/" className="dropdown-item dropdown-footer">See All Notifications</a>
                </div>
              </li>

              <li className="nav-item d-none d-sm-inline-block">
                 <button className="btn" onClick={this.handleLogout} > <i className="fa fa-lock-open"></i> </button>
              </li>
             
            </ul>
          </nav>
        );
        }
}


export default withRouter(Header);