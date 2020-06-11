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

  // handleSidebar = () =>{
   

  //       if (document.body.classList.contains('sidebar-closed')) {
  //     alert("sidebar-closed true");
  //         document.body.classList.remove('sidebar-closed');
  //         document.body.classList.remove('sidebar-collapse');
  //         document.body.classList.add('sidebar-open');
  //       }else{
  //         alert("sidebar-closed false");
  //         if(document.body.classList.contains('sidebar-open'))
  //          {
  //           alert("sidebar-open true");
  //           document.body.classList.add('sidebar-closed');
  //           document.body.classList.add('sidebar-collapse');
  //           document.body.classList.remove('sidebar-open');
           
  //         }else{
  //           alert("sidebar-open false");
  //           if (document.body.classList.contains('sidebar-collapse')) {
  //             alert("sidebar-collapse true");
  //             document.body.classList.remove('sidebar-collapse');
  //           }else{
  //             alert("sidebar-collapse false");
  //             document.body.classList.add('sidebar-collapse');
  //           }
  //         }
  //       }
    
  // }


  render(){

  
        return (
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            
            <ul className="navbar-nav">
              <li className="nav-item">
                <button  className="btn nav-link" type="button" role="button" data-widget="pushmenu" ><i className="fas fa-bars"></i></button>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <Link to="/" className="nav-link">Dashboard</Link>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <Link to="/contact" className="nav-link">Contact</Link>
              </li>
            </ul>
        
         
        
            
            <ul className="navbar-nav ml-auto">
              
            <li className="nav-item d-none d-sm-inline-block">
                 <button className="btn" onClick={this.props.handleLogout} > <i className="fa fa-sign-out-alt"></i> </button>
              </li>
              
              {/* <li className="nav-item dropdown">
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
              </li> */}

             
             
            </ul>
          </nav>
        );
        }
}


export default withRouter(Header);