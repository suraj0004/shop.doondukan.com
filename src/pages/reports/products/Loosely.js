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

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Loosely extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoader: true,
      response: "",
      top: 20,
      range: 'week',
      data: [],
      from: null,
      to: null,
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
    axios.get(UrlService.topLooselyProductsUrl(), {
      params: {
        top: this.state.top,
        range: this.state.range
      },
      headers: auth.apiHeader()
    }).then(res => {
      console.log(res);
      if (res.data.success) {
        this.setState({
          data: res.data.data,
          from: res.data.from,
          to: res.data.to,
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
			animationEnabled: true,
			colorSet: "colorSet2",
			title: {
        text: `Top ${this.state.top} Loosely Products`,
			},
			axisX: {
				// valueFormatString: "MMMM"
			},
			axisY: {
				// prefix: "$",
				// labelFormatter: this.addSymbols
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				// itemclick: this.toggleDataSeries,
				verticalAlign: "top"
			},
			data: [{
				type: "column",
				name: "Total Loss",
				showInLegend: true,
				// xValueFormatString: "MMMM YYYY",
				// yValueFormatString: "$#,##0",
				dataPoints: this.state.data.map(item => {
          return { label: item.product.name, y: Number(item.loss) }
        })
			},{
				type: "line",
				name: "Expected Selling Price Per Item",
				showInLegend: true,
				// yValueFormatString: "$#,##0",
				dataPoints: this.state.data.map(item => {
          return { label: item.product.name, y: Math.round((item.purchase_price + (item.purchase_price * 0.08) )) }
        })
			},{
				type: "area",
				name: "Selling Price Per Item",
				markerBorderColor: "white",
				markerBorderThickness: 2,
				showInLegend: true,
				// yValueFormatString: "$#,##0",
        dataPoints: this.state.data.map(item => {
          return { label: item.product.name, y: Number(item.price) }
        })
			}]
		}
    


    var table_label = `Top ${this.state.top} Loosely Products - `;
    switch (this.state.range) {
      case 'week':
        table_label += `Last Week `;
        break;
        case 'month':
        table_label += `Last Month `;
        break;
        case 'months':
        table_label += `Last Six Months `;
        break;
        case 'now':
        table_label += `Till Now `;
        break;
      default:
        break;
    }

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
                        <div className="form-group float-left" style={{ width: "100px" }} >
                          <select
                            className="custom-select"
                            name="top"
                            value={this.state.top}
                            onChange={this.handleDropdownChange}
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
                            name="range"
                            value={this.state.range}
                            onChange={this.handleDropdownChange}
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
                            <strong>Sales: &nbsp;
                              <Moment
                                local
                                format="D MMM, YYYY"
                                date={this.state.from}
                              />
                                 &nbsp;-&nbsp;
                                 <Moment
                                local
                                format="D MMM, YYYY"
                                date={this.state.to}
                              />
                            </strong>
                          </p>

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

                <div className="col-md-12">






                  <div className="card">
                    <div className="card-header border-transparent">
                      <h3 className="card-title"> 
                         {table_label} 
                         <strong>( Sales: &nbsp;
                              <Moment
                                local
                                format="D MMM, YYYY"
                                date={this.state.from}
                              />
                                 &nbsp;-&nbsp;
                                 <Moment
                                local
                                format="D MMM, YYYY"
                                date={this.state.to}
                              />
                         ) </strong>
                         
                          </h3>


                    </div>

                    <div className="card-body p-0">
                      <div className="card-body">
                        <table id="my_table" className="table table-bordered table-striped">
                          <thead>
                            <tr className="text-center">
                              <th>Sno.</th>
                              <th>Product</th>
                              <th>Available Qty</th>
                              <th>Qty Sold</th>
                              <th>Margin</th>
                              <th>Loss</th>
                              <th> Selling Price <br/> Per Item</th>
                              <th>Expected Selling Price  <br/> Per Item</th>
                             
                            </tr>
                          </thead>
                          <tbody>
                            {
                              this.state.data.map((item, index) => {
                                // console.log(item);
                                return <tr className="text-center" key={item.product_id}>
                                  <td> {index + 1} </td>
                                  <td> { `${item.product.name} | ${item.product.weight}${item.product.weight_type} | ${item.product.brand}` } </td>
                                  <td>  {item.available?item.available:0}</td>
                                  <td>  {item.qty?item.qty:0}</td>
                                  <td> Rs. {item.margin?item.margin:0} /- </td>
                                  <td className={item.loss < 0?"bg-danger":"bg-warning"}>  <strong>Rs. {item.loss?item.loss:0} /-</strong>  </td>
                                  <td> Rs. {item.price?item.price:0} /- </td>
                                  <td> Rs. {item.purchase_price + Math.round(item.purchase_price * 0.08)} /- </td>
                                  
                                </tr>
                              })
                            }


                          </tbody>
                        </table>
                      </div>

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

export default Loosely;