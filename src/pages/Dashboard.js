import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import auth from '../services/AuthService';
import UrlService from '../services/UrlService';
import Layout from '../layouts/RetailLayout';
import PageLoader from '../components/PageLoader';
import CanvasJSReact from '../assets/canvasjs.react';

import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';

import Percentage from './reports/Percentage';
import MoreDetails from './reports/MoreDetails';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoader : false,
      response : "",
      data : [],
      purchase : [],
      bill : [],
      percentage : {
        purchase:0,
        sale : 0,
        profit : 0,
      },
      amount : {
        purchase:0,
        sale : 0,
        profit : 0,
      },
      more : {
        products : 0,
        stocks : 0,
        item_sold : 0,
        sales : 0,
        profit : 0,
      },
      type: 'rupees',
      purchase_type: 'rupees',
      today : {
        purchase : 0,
        item_purchase : 0,
        item_sold : 0,
        sale : 0,
        profit : 0,
        cost : 0,
      }
    }
  }
  

  renderChart() {
    axios.get(UrlService.DashboardUrl(), {
      headers: auth.apiHeader()
    }).then(res => {
      console.log(res);
      if (res.data.success) {
        this.setState({
          data: res.data.sale_and_profit,
          purchase : res.data.purchase,
          bill : res.data.bill,
          today : res.data.today,
          isLoader: false
        },()=>{
          window.setDataTable();
        });
      } else {
        this.setState({
          response: res.data.message,
        });
      }
    }).catch(err => {
      err = err.response;
      console.log(err);
      if(err.status === 401 || err.statusText === "Unauthorized" )
       {
             auth.afterLogout();
             this.props.history.push("/login");
       }else if(err.status === 404){
        this.setState({
          response : "Opps! Something went wrong, Please call to adminstrator at +91-8954836965",
      });
       }
       else{
        this.setState({
          response : err.data.message,
      });
       }
    });
  }

  
  componentDidMount() {

    this.renderChart();
    axios.get(UrlService.percentageAndMoreUrl(),{
      headers : auth.apiHeader()
    }).then(res=>{
        if(res.data.success){
          this.setState({
            percentage : {
              purchase : res.data.percentage.purchase,
              sale : res.data.percentage.sale,
              profit :  res.data.percentage.profit,  
               },
               amount : {
                purchase : res.data.amount.purchase,
                sale : res.data.amount.sale,
                profit :  res.data.amount.profit,  
                 },
                 more : {
                  products : res.data.more.products,
                  stocks : res.data.more.stocks,
                  item_sold : res.data.more.item_sold,
                  sales : res.data.more.sales,
                  profit : res.data.more.profit,
                }
          });
        }
    }).catch(err=>{
      err = err.response;
      console.log(err);
      if(err.status === 401 || err.statusText === "Unauthorized" )
       {
             auth.afterLogout();
             this.props.history.push("/login");
       }else if(err.status === 404){
        this.setState({
          response : "Opps! Something went wrong, Please call to adminstrator at +91-8954836965",
      });
       }
       else{
        this.setState({
          response : err.data.message,
      });
       }
    });
  }

  handleDropdownChange = (event) => {

    this.setState({
      [event.target.name]: event.target.value,
      // isLoader: true,
    }, () => {
      // this.renderChart();
    });

  }



    render() {
var options;
      if(this.state.type === "rupees"){
         options = {
          theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
          title:{
            text: "Today Sale"
          },
          axisX: {
            // valueFormatString: "hh:mm tt"
          },
          axisY: {
            title: "Sale in Rs.",
            prefix: "₹",
            includeZero: false
          },
          data: [{
            yValueFormatString: "₹#,###",
            // xValueFormatString: "hh:mm tt",
            type: "spline",
            dataPoints : this.state.data.map(item=>{
              var label = Number(item.hour);
              if(label === 12){
                label = "12 noon - 1 pm";
              }else if(label === 0){
                label = " 12 mid-night - 1 am";
              }
              else if(label === 11){
                label = " 11:00 am - 12:00 noon";
              }
              else if(label === 23){
                label = " 11 pm - 12 mid-night";
              }
             else if(label < 11){
                label = label + ":00 am - " + (label + 1)+":00 am";
             }
              else{
                label = label - 12;
                 label = label + ":00 pm - " + (label + 1) + ":00 pm";
              }
              return { label: label, y: item.sale };
            })
         
          }]
        }
      }else{
         options = {
          theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
          title:{
            text: "Item Sold Today"
          },
          axisX: {
            // valueFormatString: "hh:mm tt"
          },
          axisY: {
            title: "Sale in Quantity",
            // prefix: "₹",
            includeZero: false
          },
          data: [{
            // yValueFormatString: "₹#,###",
            // xValueFormatString: "hh:mm tt",
            type: "spline",
            dataPoints : this.state.data.map(item=>{
              var label = Number(item.hour);
              if(label === 12){
                label = "12 noon - 1 pm";
              }else if(label === 0){
                label = " 12 mid-night - 1 am";
              }
              else if(label === 11){
                label = " 11:00 am - 12:00 noon";
              }
              else if(label === 23){
                label = " 11 pm - 12 mid-night";
              }
             else if(label < 11){
                label = label + ":00 am - " + (label + 1)+":00 am";
             }
              else{
                label = label - 12;
                 label = label + ":00 pm - " + (label + 1) + ":00 pm";
              }
              return { label: label, y: Number(item.quantity) };
            })
         
          }]
        }
      }








   const  profitChartOptions = {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    title:{
      text: "Profit Earn Today"
    },
    axisY:{
      title: "Profit in Rs.",
      prefix: "₹",
      includeZero: false
    },
    data: [{
      type: "spline",
      // xValueFormatString: "MMM YYYY",
      // markerSize: 5,
      dataPoints: this.state.data.map(item=>{
        var label = Number(item.hour);
              if(label === 12){
                label = "12 noon - 1 pm";
              }else if(label === 0){
                label = " 12 mid-night - 1 am";
              }
              else if(label === 11){
                label = " 11:00 am - 12:00 noon";
              }
              else if(label === 23){
                label = " 11 pm - 12 mid-night";
              }
             else if(label < 11){
                label = label + ":00 am - " + (label + 1)+":00 am";
             }
              else{
                label = label - 12;
                 label = label + ":00 pm - " + (label + 1) + ":00 pm";
              }
              return { label: label, y: Number(item.profit) };
      })
    }]
  }







  var purchase_options;
      if(this.state.purchase_type === "rupees"){
         purchase_options = {
          theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
          title:{
            text: "Today Purchase"
          },
          axisX: {
            // valueFormatString: "hh:mm tt"
          },
          axisY: {
            title: "Purchase in Rs.",
            prefix: "₹",
            includeZero: false
          },
          data: [{
            yValueFormatString: "₹#,###",
            // xValueFormatString: "hh:mm tt",
            type: "spline",
            dataPoints : this.state.purchase.map(item=>{
              var label = Number(item.hour);
              if(label === 12){
                label = "12 noon - 1 pm";
              }else if(label === 0){
                label = " 12 mid-night - 1 am";
              }
              else if(label === 11){
                label = " 11:00 am - 12:00 noon";
              }
              else if(label === 23){
                label = " 11 pm - 12 mid-night";
              }
             else if(label < 11){
                label = label + ":00 am - " + (label + 1)+":00 am";
             }
              else{
                label = label - 12;
                 label = label + ":00 pm - " + (label + 1) + ":00 pm";
              }
              return { label: label, y: item.purchase };
            })
         
          }]
        }
      }else{
         purchase_options = {
          theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
          title:{
            text: "Item Bought Today"
          },
          axisX: {
            // valueFormatString: "hh:mm tt"
          },
          axisY: {
            title: "Purchase in Quantity",
            // prefix: "₹",
            includeZero: false
          },
          data: [{
            // yValueFormatString: "₹#,###",
            // xValueFormatString: "hh:mm tt",
            type: "spline",
            dataPoints : this.state.purchase.map(item=>{
              var label = Number(item.hour);
              if(label === 12){
                label = "12 noon - 1 pm";
              }else if(label === 0){
                label = " 12 mid-night - 1 am";
              }
              else if(label === 11){
                label = " 11:00 am - 12:00 noon";
              }
              else if(label === 23){
                label = " 11 pm - 12 mid-night";
              }
             else if(label < 11){
                label = label + ":00 am - " + (label + 1)+":00 am";
             }
              else{
                label = label - 12;
                 label = label + ":00 pm - " + (label + 1) + ":00 pm";
              }
              return { label: label, y: Number(item.quantity) };
            })
         
          }]
        }
      }


      const quantity_comparision = {
        animationEnabled: true,

        theme: "light2", //"light1", "dark1", "dark2"
        title:{
          text: "Quantity Comparision"
        },
        data: [{
          type: "column", //change type to bar, line, area, pie, etc
          dataPoints: [
            { label:"Purchase", y: this.state.today.item_purchase ,color:"#B0A2BF"},
            { label:"Sale", y: this.state.today.item_sold, color:"#6D78AD" }
          ]
        }]
      }

      const cost_sale_profit = {
        animationEnabled: true,

        theme: "light2", 
        title:{
          text: "Cost/Sale/profit"
        },
        axisY: {
          prefix: "₹",
          includeZero: false
        },
        data: [{
         
          yValueFormatString: "₹#,###",
          type: "column", //change type to bar, line, area, pie, etc
          dataPoints: [
            { label:"Cost", y: this.state.today.cost,color:"#E9A19B" },
            { label:"Sale", y: this.state.today.sale , color:"#6D78AD"},
            { label:"Profit", y: this.state.today.profit, color : "#86DCBD" }
          ]
        }]
      }

      const cost_percentage = (this.state.today.cost/this.state.today.sale)*100;
      const profit_percentage = (this.state.today.profit/this.state.today.sale)*100;

      const pie_chart = {
        animationEnabled: true,
        theme: "light2", 
        title: {
          text: "Cost VS Profit"
        },
        data: [{
          type: "pie",
          startAngle: 75,
          toolTipContent: "<b>{label}</b>: {y}%",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}%",
          dataPoints: [
            { y: cost_percentage, label: "Cost",color:"#E9A19B" },
            { y: profit_percentage, label: "Profit", color:"#86DCBD" }
           
          ]
        }]
      }
  
    
        return (
 
          <Layout pathname={this.props.location.pathname} page="Dashboard" >
             
            
   
            
             {
                  (this.state.isLoader)
                  ?<PageLoader error={this.state.response}/>
                  : 
            
              <div className="container-fluid">
                
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-3">
                    <div className="info-box">
                      <span className="info-box-icon bg-info elevation-1"><i className="fas fa-cog"></i></span>
        
                      <div className="info-box-content">
                        <span className="info-box-text">Today Purchase</span>
                        <span className="info-box-number">
                         {this.state.today.purchase} &#8377;
                        </span>
                      </div>
                      
                    </div>
                    
                  </div>
                  
                  <div className="col-12 col-sm-6 col-md-3">
                    <div className="info-box mb-3">
                      <span className="info-box-icon bg-danger elevation-1"><i className="fas fa-thumbs-up"></i></span>
        
                      <div className="info-box-content">
                        <span className="info-box-text">Item Sold Today</span>
             <span className="info-box-number"> {this.state.today.item_sold} </span>
                      </div>
                      
                    </div>
                    
                  </div>
                  
        
                  
                  <div className="clearfix hidden-md-up"></div>
        
                  <div className="col-12 col-sm-6 col-md-3">
                    <div className="info-box mb-3">
                      <span className="info-box-icon bg-success elevation-1"><i className="fas fa-shopping-cart"></i></span>
        
                      <div className="info-box-content">
                        <span className="info-box-text">Today Sales</span>
                        <span className="info-box-number"> {this.state.today.sale}  &#8377;</span>
                      </div>
                      
                    </div>
                    
                  </div>
                  
                  <div className="col-12 col-sm-6 col-md-3">
                    <div className="info-box mb-3">
                      <span className="info-box-icon bg-warning elevation-1"><i className="fas fa-users"></i></span>
        
                      <div className="info-box-content">
                        <span className="info-box-text">Today Profit</span>
                        <span className="info-box-number"> {this.state.today.profit}  &#8377;</span>
                      </div>
                      
                    </div>
                    
                  </div>
                  
                </div>
                
                <hr/>
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                     
                      
                      <div className="card-body">
                      <h5 className="row">
                        <div className="form-group float-left" style={{ width: "100px" }} >
                          <select
                            className="custom-select"
                            name="type"
                            value={this.state.type}
                            onChange={this.handleDropdownChange}
                          >
                            <option value="quantity">By Qty</option>
                            <option value="rupees">By Rs.</option>
                          
                          </select>


                        </div>

                   
                      </h5>
                      <div className="row">
                        <div className="col-md-12">

                          <div className="chart">
                            <CanvasJSChart options={options} />

                          </div>

                        </div>



                      </div>

                    </div>
                      
                     

                    </div>
                    
                  </div>
                  
                </div>
                
                <hr/>
                
                <div className="row">
                  
                  <div className="col-md-8">
                    
                   
                    
                   
                    
        
                    
                    <div className="card">
                      <div className="card-header border-transparen text-center">
                        <h3>Today Latest Bill's</h3>
        
                      
                      </div>
                      
                      <div className="card-body p-0">
                        <div className="table-responsive">
                          <table className="table m-0 text-center" id="my_table">
                            <thead>
                            <tr>
                              <th className="all">Bill ID</th>                             
                              <th className="none">Status</th>
                              <th className="all">Time</th>
                              <th className="none">Bill Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                              {
                                this.state.bill.map(item=>{
                                  var statusHtml;
                                  if(item.status === "paid"){
                                   statusHtml = <span className="badge badge-success">Paid</span>
                                  }else{
                                       statusHtml = <span className="badge badge-warning">Un-Paid</span>
                                  }

                                  return  <tr>
                                  <td>  <Link to={"/invoice/"+item.id} className="btn btn-default" style={{marginTop:'-5px'}}> #{(item.id).toString().padStart("4","0")} <i className="fa fa-file"></i></Link> </td>

                                  <td> {statusHtml} </td>

                                  <td> <Moment                              
                                 local
                                //  format="D MMM, YYYY h:mm a"
                                fromNow
                                 date={ item.created_at }
                                 />
                            </td>

                            <td> Rs. {item.sales_price} /-</td>
                                 
                                  
                                </tr>;
                                })
                              }
                           
                            </tbody>
                          </table>
                        </div>
                        
                      </div>
                      
                      <div className="card-footer clearfix">
                        <Link to="/generateBill" className="btn btn-sm btn-info float-left">Generate New Bill</Link>
                        <Link to="/billList" className="btn btn-sm btn-secondary float-right">View All Bills</Link>
                      </div>
                      
                    </div>
                    
                  </div>
                  
        
                  <MoreDetails more={this.state.more} />
                  
                </div>
                <hr/>
                <div className="row">
<div className="col-md-12 card">

 <div className="card-body">
 <div className="chart">
    <CanvasJSChart options={profitChartOptions} />

  </div>
 </div>

</div>



</div>
<hr/>
<div className="card">
    <div className="card-header text-center">
    <h3>Quick Report Of Today</h3>
    </div>
    <div className="card-body">
    <div className="row">
  <div className="col-md-3" style={{borderRight:'1px solid grey'}}>
  <div className="chart">
                            <CanvasJSChart options={quantity_comparision} />

                          </div>
  </div>
  <div className="col-md-5" style={{borderRight:'1px solid grey'}}>
                  <div className="chart">
                            <CanvasJSChart options={cost_sale_profit} />

                          </div>
    </div>
    <div className="col-md-4">
    <div className="chart">
                            <CanvasJSChart options={pie_chart} />

                          </div>
    </div>
</div>
    </div>
</div>
                
                <hr/>

                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                     
                      
                      <div className="card-body">
                      <h5 className="row">
                        <div className="form-group float-left" style={{ width: "100px" }} >
                          <select
                            className="custom-select"
                            name="purchase_type"
                            value={this.state.purchase_type}
                            onChange={this.handleDropdownChange}
                          >
                            <option value="quantity">By Qty</option>
                            <option value="rupees">By Rs.</option>
                          
                          </select>


                        </div>

                   
                      </h5>
                      <div className="row">
                        <div className="col-md-12">

                          <div className="chart">
                            <CanvasJSChart options={purchase_options} />

                          </div>

                        </div>



                      </div>

                    </div>
                      
                     

                    </div>
                    
                  </div>
                  
                </div>


         

                <hr/>




<Percentage percentage={this.state.percentage}  amount={this.state.amount} />
              </div>


             }
           
       
              </Layout >

        );
    }
}

export default Dashboard;