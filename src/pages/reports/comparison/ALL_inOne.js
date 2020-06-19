import React, { Component } from 'react';
import auth from '../../../services/AuthService';
import UrlService from '../../../services/UrlService';
import Layout from '../../../layouts/RetailLayout';
import PageLoader from '../../../components/PageLoader';
import CanvasJSReact from '../../../assets/canvasjs.react';
import axios from 'axios';

import Moment from 'react-moment';
import 'moment-timezone';
import Percentage from '../Percentage';
import MoreDetails from '../MoreDetails';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ALL_inOne extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoader: false,
      response: "",
      range: 'month',
      data: [],
      year: "",
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
      }
    }
  }



  renderChart() {
    axios.get(UrlService.ALL_inOneUrl(), {
      params: {
        range: this.state.range
      },
      headers: auth.apiHeader()
    }).then(res => {
      console.log(res);
      if (res.data.success) {
        this.setState({
          data: res.data.data,
          year: res.data.year,
          isLoader: false
        },()=>{
          // window.setDataTable();
        });
      } else {
        this.setState({
          response: res.data.message,
        });
      }
    }).catch(err => {
      console.log(err.response);
      this.setState({
        response: "Opps Something went wrong",
      });
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

    });
  }


  handleDropdownChange = (event) => {

    this.setState({
      [event.target.name]: event.target.value,
      isLoader: true,
    }, () => {
      this.renderChart();
    });

  }


  render() {

    const options = {
			theme: "light2",
			animationEnabled: true,
			title: {
				text: "Comparison of Sales / Cost / Profit "+this.state.year
			},
			subtitles: [{
				text: "Sales Vs Cost Vs Profit "
			}],
			axisY: {
				includeZero: false,
				prefix: "₹"
			},
			toolTip: {
				shared: true
			},
			data: [
        
			
			{
				type: "area",
        name: "Sales",
        color : "#007bff",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "₹#,##0.##",
        dataPoints : this.state.data.map(item=>{
          return { label: item.created_at , y: item.sale};
        })
			},{
				type: "area",
        name: "Cost",
        color : "#ffc107",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "₹#,##0.##",
        dataPoints : this.state.data.map(item=>{
          return { label: item.created_at , y: item.cost};
        })
			},
			{
				type: "area",
        name: "Profit",
        color : "#28a745",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "₹#,##0.##",
        dataPoints : this.state.data.map(item=>{
          return { label: item.created_at , y: item.profit};
        })
			}
			]
		}
    


    var table_label = `Sales Vs Cost Vs Profit - `;
    switch (this.state.range) {
        case 'month':
        table_label += `By Month `;
        break;
        case 'year':
        table_label += `By Year `;
        break;
      default:
        break;
    }
    table_label += this.state.year;

    return (

      <Layout pathname={this.props.location.pathname} page="" >




        {
          (this.state.isLoader)
            ? <PageLoader error={this.state.response} />
            :

            <div className="container-fluid">




              <div className="row">
                <div className="col-md-12">
                  <div className="card">
              
                  <Percentage percentage={this.state.percentage}  amount={this.state.amount} />


                    <div className="card-body">
                      <h5 className="row">
                       

                        <div className="form-group float-left ml-3" style={{ width: "150px" }} >
                          <select
                            className="custom-select"
                            name="range"
                            value={this.state.range}
                            onChange={this.handleDropdownChange}
                          >
                            
                            <option value="month">By Month</option>
                            <option value="year">By Year</option>
                            
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



              <div className="row">

                <div className="col-md-8">






                  <div className="card">
                    <div className="card-header border-transparent">
                      <h3 className="card-title"> 
                         {table_label} 
                        
                         
                          </h3>


                    </div>

                    <div className="card-body p-0">
                      <div className="card-body">
                        <table id="my_table" className="table table-bordered table-striped">
                          <thead>
                            <tr className="text-center">
                              <th>Sno.</th>
                              <th>By {this.state.range}</th>
                              <th>Cost</th>
                              <th>Sale</th>
                              <th>Profit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              this.state.data.map((item, index) => {
                               
                                // console.log(item);
                                return <tr className="text-center" key={item.month}>
                                  <td> {index + 1} </td>
                                  <td> {item.created_at} </td>
                                  <td> Rs. {item.cost} /-</td>
                                  <td> Rs. {item.sale} /-</td>
                                  <td className={ (item.profit <= 0)?( (item.profit == 0)?"bg-warning":"bg-danger" ):"" } > Rs. {item.profit} /-</td>
                                </tr>
                              })
                            }


                          </tbody>
                        </table>
                      </div>

                    </div>


                  </div>

                </div>


  <MoreDetails more={this.state.more} />

              </div>

            </div>
        }


      </Layout >

    );
  }
}

export default ALL_inOne;