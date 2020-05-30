import React, { Component } from 'react';
import auth from '../../../services/AuthService';
import Layout from '../../../layouts/RetailLayout';
import PageLoader from '../../../components/PageLoader';
import CanvasJSReact from '../../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class HighestSelling extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoader : true,
      response : "",
    }
  }
  
  
  componentDidMount() {
  

    auth.isValidToken( (success) =>{
      if(success){
          auth.afterLogout();
         this.props.history.push("/login"); 
        
      }

 
      this.setState({
        isLoader:false
      });
    });
    
    
   
    
  }
    render() {

      const options = {
        title: {
          text: "Top 20 Highest Selling Products",
        },
        animationEnabled: true,
        data: [
        {
          // Change type to "doughnut", "line", "splineArea", etc.
          type: "column",
          dataPoints: [
            { label: "Apple",  y: 10  },
            { label: "Orange", y: 15  },
            { label: "Banana", y: 25  },
            { label: "Mango",  y: 30  },
            { label: "Grape",  y: 28  },
            { label: "Apple",  y: 10  },
            { label: "Orange", y: 15  },
            { label: "Banana", y: 25  },
            { label: "Mango",  y: 30  },
            { label: "Grape",  y: 28  },
            { label: "Apple",  y: 10  },
            { label: "Orange", y: 15  },
            { label: "Banana", y: 25  },
            { label: "Mango",  y: 30  },
            { label: "Grape",  y: 28  },
            { label: "Apple",  y: 10  },
            { label: "Orange", y: 15  },
            { label: "Banana", y: 25  },
            { label: "Mango",  y: 30  },
            { label: "Grape",  y: 28  },
          ]
        }
        ]
      }
    
        return (
 
          <Layout pathname={this.props.location.pathname} page="" >
             
            
   
            
             {
                  (this.state.isLoader)
                  ?<PageLoader error={this.state.response}/>
                  : 
            
              <div className="container-fluid">
                
              
                
        
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="card-title">
                        <div className="form-group float-left" style={{ width: "100px" }} >
                                <select 
                                  className="custom-select" 
                                  // value={this.state.status}
                                  // onChange={this.handleStatusChange} 
                                  >
                                    <option value="20">Top 20</option>
                                    <option value="30">Top 30</option>
                                    <option value="40">Top 40</option>
                                    <option value="50">Top 50</option>
                                </select>

                                
                            </div>

                            <div className="form-group float-left ml-3" style={{ width: "150px" }} >
                                <select 
                                  className="custom-select" 
                                  // value={this.state.status}
                                  // onChange={this.handleStatusChange} 
                                  >
                                    <option value="week">Last week</option>
                                    <option value="month">Last Month</option>
                                    <option value="months">Last Six Months</option>
                                    <option value="now">Till Now</option>
                                </select>

                                
                            </div>
                        </h5>
        
                        {/* <div className="card-tools">
                          <button type="button" className="btn btn-tool" data-card-widget="collapse">
                            <i className="fas fa-minus"></i>
                          </button>
                          <div className="btn-group">
                            <button type="button" className="btn btn-tool dropdown-toggle" data-toggle="dropdown">
                              <i className="fas fa-wrench"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right" role="menu">
                              <a href="/" className="dropdown-item">Action</a>
                              <a href="/" className="dropdown-item">Another action</a>
                              <a href="/" className="dropdown-item">Something else here</a>
                              <span className="dropdown-divider"> </span>
                              <a href="/" className="dropdown-item">Separated link</a>
                            </div>
                          </div>
                          <button type="button" className="btn btn-tool" data-card-widget="remove">
                            <i className="fas fa-times"></i>
                          </button>
                        </div> */}
                      </div>
                      
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-12">
                            <p className="text-center">
                              <strong>Sales: 1 Jan, 2020 - 7 Jan, 2020</strong>
                            </p>
        
                            <div className="chart">
                            <CanvasJSChart options = {options}  />
                              
                            </div>
                            
                          </div>
                          
                       
                          
                        </div>
                        
                      </div>
                      
                      <div className="card-footer">
                        <div className="row">
                          <div className="col-sm-3 col-6">
                            <div className="description-block border-right">
                              <span className="description-percentage text-success"><i className="fas fa-caret-up"></i> 17%</span>
                              <h5 className="description-header">$35,210.43</h5>
                              <span className="description-text">TOTAL REVENUE</span>
                            </div>
                            
                          </div>
                          
                          <div className="col-sm-3 col-6">
                            <div className="description-block border-right">
                              <span className="description-percentage text-warning"><i className="fas fa-caret-left"></i> 0%</span>
                              <h5 className="description-header">$10,390.90</h5>
                              <span className="description-text">TOTAL COST</span>
                            </div>
                            
                          </div>
                          
                          <div className="col-sm-3 col-6">
                            <div className="description-block border-right">
                              <span className="description-percentage text-success"><i className="fas fa-caret-up"></i> 20%</span>
                              <h5 className="description-header">$24,813.53</h5>
                              <span className="description-text">TOTAL PROFIT</span>
                            </div>
                            
                          </div>
                          
                          <div className="col-sm-3 col-6">
                            <div className="description-block">
                              <span className="description-percentage text-danger"><i className="fas fa-caret-down"></i> 18%</span>
                              <h5 className="description-header">1200</h5>
                              <span className="description-text">GOAL COMPLETIONS</span>
                            </div>
                            
                          </div>
                        </div>
                        
                      </div>
                      
                    </div>
                    
                  </div>
                  
                </div>
                
        
                
                <div className="row">
                  
                  <div className="col-md-8">
                    
                
          
                    
        
                    
                    <div className="card">
                      <div className="card-header border-transparent">
                        <h3 className="card-title">Latest Orders</h3>
        
                        <div className="card-tools">
                          <button type="button" className="btn btn-tool" data-card-widget="collapse">
                            <i className="fas fa-minus"></i>
                          </button>
                          <button type="button" className="btn btn-tool" data-card-widget="remove">
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                      
                      <div className="card-body p-0">
                        <div className="table-responsive">
                          <table className="table m-0">
                            <thead>
                            <tr>
                              <th>Order ID</th>
                              <th>Item</th>
                              <th>Status</th>
                              <th>Popularity</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                              <td><a href="/">OR9842</a></td>
                              <td>Call of Duty IV</td>
                              <td><span className="badge badge-success">Shipped</span></td>
                              <td>
                                <div className="sparkbar" data-color="#00a65a" data-height="20">90,80,90,-70,61,-83,63</div>
                              </td>
                            </tr>
                            <tr>
                              <td><a href="/">OR1848</a></td>
                              <td>Samsung Smart TV</td>
                              <td><span className="badge badge-warning">Pending</span></td>
                              <td>
                                <div className="sparkbar" data-color="#f39c12" data-height="20">90,80,-90,70,61,-83,68</div>
                              </td>
                            </tr>
                            <tr>
                              <td><a href="/">OR7429</a></td>
                              <td>iPhone 6 Plus</td>
                              <td><span className="badge badge-danger">Delivered</span></td>
                              <td>
                                <div className="sparkbar" data-color="#f56954" data-height="20">90,-80,90,70,-61,83,63</div>
                              </td>
                            </tr>
                            <tr>
                              <td><a href="/">OR7429</a></td>
                              <td>Samsung Smart TV</td>
                              <td><span className="badge badge-info">Processing</span></td>
                              <td>
                                <div className="sparkbar" data-color="#00c0ef" data-height="20">90,80,-90,70,-61,83,63</div>
                              </td>
                            </tr>
                            <tr>
                              <td><a href="/">OR1848</a></td>
                              <td>Samsung Smart TV</td>
                              <td><span className="badge badge-warning">Pending</span></td>
                              <td>
                                <div className="sparkbar" data-color="#f39c12" data-height="20">90,80,-90,70,61,-83,68</div>
                              </td>
                            </tr>
                            <tr>
                              <td><a href="/">OR7429</a></td>
                              <td>iPhone 6 Plus</td>
                              <td><span className="badge badge-danger">Delivered</span></td>
                              <td>
                                <div className="sparkbar" data-color="#f56954" data-height="20">90,-80,90,70,-61,83,63</div>
                              </td>
                            </tr>
                            <tr>
                              <td><a href="/">OR9842</a></td>
                              <td>Call of Duty IV</td>
                              <td><span className="badge badge-success">Shipped</span></td>
                              <td>
                                <div className="sparkbar" data-color="#00a65a" data-height="20">90,80,90,-70,61,-83,63</div>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                        
                      </div>
                      
                      <div className="card-footer clearfix">
                        <a href="/" className="btn btn-sm btn-info float-left">Place New Order</a>
                        <a href="/" className="btn btn-sm btn-secondary float-right">View All Orders</a>
                      </div>
                      
                    </div>
                    
                  </div>
                  
        
                  <div className="col-md-4">
                    
                    <div className="info-box mb-3 bg-warning">
                      <span className="info-box-icon"><i className="fas fa-tag"></i></span>
        
                      <div className="info-box-content">
                        <span className="info-box-text">Inventory</span>
                        <span className="info-box-number">5,200</span>
                      </div>
                      
                    </div>
                    
                    <div className="info-box mb-3 bg-success">
                      <span className="info-box-icon"><i className="far fa-heart"></i></span>
        
                      <div className="info-box-content">
                        <span className="info-box-text">Mentions</span>
                        <span className="info-box-number">92,050</span>
                      </div>
                      
                    </div>
                    
                    <div className="info-box mb-3 bg-danger">
                      <span className="info-box-icon"><i className="fas fa-cloud-download-alt"></i></span>
        
                      <div className="info-box-content">
                        <span className="info-box-text">Downloads</span>
                        <span className="info-box-number">114,381</span>
                      </div>
                      
                    </div>
                    
                    <div className="info-box mb-3 bg-info">
                      <span className="info-box-icon"><i className="far fa-comment"></i></span>
        
                      <div className="info-box-content">
                        <span className="info-box-text">Direct Messages</span>
                        <span className="info-box-number">163,921</span>
                      </div>
                      
                    </div>
                    
        
                
                    
                  </div>
                  
                </div>
                
              </div>
             }
           
       
              </Layout >

        );
    }
}

export default HighestSelling;