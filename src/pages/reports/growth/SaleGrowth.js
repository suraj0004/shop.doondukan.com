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

class SaleGrowth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoader: false,
      response: "",
      type: 'rupees',
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
    axios.get(UrlService.saleGrowthUrl(), {
      params: {
        type: this.state.type,
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
			theme: "light2",
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: "Sales Growth " +( (this.state.type === "quantity")?"By Quantity":"By Rupees")
			},
			axisY: {
				title: (this.state.type === "quantity")?"Item Sold":"Sales in Rs.",
				includeZero: false,
			},
			data: [
			{
				type: "area",
				xValueFormatString: "YYYY",
				yValueFormatString: "#,##0.##",
				dataPoints: this.state.data.map(item=>{
          return {label : item.created_at, y : (this.state.type === "quantity")?Number(item.data):item.data};
        })
			}
			]
		}
    


    var table_label = `Sales Growth -`;
    switch (this.state.range) {
      case 'week':
        table_label += `Last 7 Days `;
        break;
        case 'month':
        table_label += `Last Month `;
        break;
        case 'months':
        table_label += `By Months `;
        break;
        case 'year':
        table_label += `By Year `;
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
                            name="type"
                            value={this.state.type}
                            onChange={this.handleDropdownChange}
                          >
                            <option value="quantity">By Qty</option>
                            <option value="rupees">By Rs.</option>
                          
                          </select>


                        </div>

                        <div className="form-group float-left ml-3" style={{ width: "150px" }} >
                          <select
                            className="custom-select"
                            name="range"
                            value={this.state.range}
                            onChange={this.handleDropdownChange}
                          >
                            <option value="week">Last 7 Days</option>
                            <option value="month">Last Month</option>
                            <option value="months">All Month</option>
                            <option value="year">All year</option>
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

                <div className="col-md-8">






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
                              <th> { table_label.split("-")[1] } </th>
                              <th> { this.state.type === "quantity" ? "Item Sold":"Sales in Rs" } </th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              this.state.data.map((item, index) => {
                                
                                return <tr className="text-center" key={index}>
                                  <td> {index + 1} </td>
                                  <td> {item.created_at} </td>
                                  {
                                    (this.state.type === "quantity")
                                    ? <td> {item.data} </td>
                                    : <td> Rs. {item.data} /- </td>
                                  }
                                 
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

export default SaleGrowth;