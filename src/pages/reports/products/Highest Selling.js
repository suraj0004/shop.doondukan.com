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
                    <div className="card-footer">
                        <div className="row">

                        <div className="col-sm-4 col-6">
                            <div className="description-block border-right">
                              <span className="description-percentage text-warning"><i className="fas fa-caret-left"></i> 0%</span>
                              <h5 className="description-header">$10,390.90</h5>
                              <span className="description-text">YESTERDAY COST/PURCHASE</span>
                            </div>
                            
                          </div>


                          <div className="col-sm-4 col-6">
                            <div className="description-block border-right">
                              <span className="description-percentage text-success"><i className="fas fa-caret-up"></i> 17%</span>
                              <h5 className="description-header">$35,210.43</h5>
                              <span className="description-text">YESTERDAY SALE</span>
                            </div>
                            
                          </div>
                          
                          
                          <div className="col-sm-4 col-6">
                            <div className="description-block border-right">
                              <span className="description-percentage text-success"><i className="fas fa-caret-up"></i> 20%</span>
                              <h5 className="description-header">$24,813.53</h5>
                              <span className="description-text">YESTERDAY PROFIT</span>
                            </div>
                            
                          </div>

                        
                          
                     
                        </div>
                        
                      </div>
                   
                      
                      <div className="card-body">
                      <h5 className="row">
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
                      
                   
                      
                    </div>
                    
                  </div>
                  
                </div>
                
        
                
                <div className="row">
                  
                  <div className="col-md-8">
                    
                
          
                    
        
                    
                    <div className="card">
                      <div className="card-header border-transparent">
                        <h3 className="card-title">Top 20 Highest Selling Products</h3>
        
                       
                      </div>
                      
                      <div className="card-body p-0">
                        <div className="table-responsive">
                          <table className="table m- table-hover table-striped">
                            <thead>
                            <tr className="text-center">
                              <th>Sno.</th>
                              <th>Product</th>
                              <th>Qty Sold per week</th>
                              <th>Stock Available</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="text-center">
                              <td>1</td>
                              <td>coca cola</td>
                              <td>80</td>
                              <td>
                                890
                              </td>
                            </tr>
                            <tr className="text-center">
                              <td>1</td>
                              <td>coca cola</td>
                              <td>80</td>
                              <td>
                                890
                              </td>
                            </tr>
                            <tr className="text-center">
                              <td>1</td>
                              <td>coca cola</td>
                              <td>80</td>
                              <td>
                                890
                              </td>
                            </tr>
                            <tr className="text-center">
                              <td>1</td>
                              <td>coca cola</td>
                              <td>80</td>
                              <td>
                                890
                              </td>
                            </tr>
                            <tr className="text-center">
                              <td>1</td>
                              <td>coca cola</td>
                              <td>80</td>
                              <td>
                                890
                              </td>
                            </tr>
                            <tr className="text-center">
                              <td>1</td>
                              <td>coca cola</td>
                              <td>80</td>
                              <td>
                                890
                              </td>
                            </tr>
                            <tr className="text-center">
                              <td>1</td>
                              <td>coca cola</td>
                              <td>80</td>
                              <td>
                                890
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                        
                      </div>
                      
                      
                    </div>
                    
                  </div>
                  
        
                  <div className="col-md-4">
                    
                    <div className="info-box mb-3 bg-warning">
                      <span className="info-box-icon"><i className="fas fa-tag"></i></span>
        
                      <div className="info-box-content">
                        <span className="info-box-text">Products</span>
                        <span className="info-box-number">5,00,200</span>
                      </div>
                      
                    </div>
                    
                    <div className="info-box mb-3 bg-success">
                      <span className="info-box-icon"><i className="far fa-heart"></i></span>
        
                      <div className="info-box-content">
                        <span className="info-box-text">In Stock</span>
                        <span className="info-box-number">92,050</span>
                      </div>
                      
                    </div>

                    <div className="info-box mb-3 bg-primary">
                      <span className="info-box-icon"><i className="fa fa-arrow-right"></i></span>
        
                      <div className="info-box-content">
                        <span className="info-box-text">Item Sold Today</span>
                        <span className="info-box-number">1,381</span>
                      </div>
                      
                    </div>

                    <div className="info-box mb-3 bg-danger">
                      <span className="info-box-icon"><i className="fa fa-user"></i></span>
        
                      <div className="info-box-content">
                        <span className="info-box-text">Today Sale</span>
                        <span className="info-box-number">Rs. 914,381 /-</span>
                      </div>
                      
                    </div>
                    
                    <div className="info-box mb-3 bg-info">
                      <span className="info-box-icon"><i className="fa fa-rupee-sign"></i></span>
        
                      <div className="info-box-content">
                        <span className="info-box-text">Today Profit</span>
                        <span className="info-box-number">Rs. 163,921 /-</span>
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