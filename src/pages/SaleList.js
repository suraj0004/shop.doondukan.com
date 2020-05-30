import React, { Component } from 'react';
import axios from 'axios';
import Layout from '../layouts/RetailLayout';

import auth from '../services/AuthService';
import UrlService from '../services/UrlService';
import PageLoader from '../components/PageLoader';
import Table from '../pages/saleList/Table';
class SaleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            status: "",
            isLoader: true,
            response: ""
        }
        this.getList = this.getList.bind(this);
    }

    getList(){
        axios.get(UrlService.saleListUrl(), {
            headers: auth.apiHeader(),
            params: {
                status: this.state.status
              },
        }).then((res) => {
            if (res.data.success) {
                this.setState({
                    data: res.data.data,
                    isLoader: false,

                }, () => {
                    var script = document.createElement("script");
                    script.src = "/asset/dist/js/pages/data_table.js";
                    script.defer = true;
                    document.body.appendChild(script);
                });
            } else {
                this.setState({

                    response: res.data.message
                });
            }
        }).catch((err) => {
            err = err.response;
            if (err.status === 401 || err.statusText === "Unauthorized") {
                auth.afterLogout();
                this.props.history.push("/login");
            } else if (err.status === 404) {
                this.setState({
                    response: "Opps! Something went wrong, Please call to adminstrator at +91-8954836965",
                });
            } else {
                this.setState({
                    response: err.data.message,
                });
            }
        });
    }
    componentDidMount() {

        this.getList();

    }

    handleStatusChange = (event) => {
        this.setState({
            status : event.target.value,
            isLoader : true
        },()=>{
            this.getList();
        });
    }

    render() {

        return (
            <Layout
                pathname={this.props.location.pathname}
                page="Sale List">
                {
                    (this.state.isLoader)
                        ? <PageLoader error={this.state.response} />
                        : <React.Fragment>
                            <div className="form-group" style={{ width: "125px" }} >
                                <select 
                                  className="custom-select" 
                                  value={this.state.status}
                                  onChange={this.handleStatusChange} >
                                    <option value="">All</option>
                                    <option value="paid">Paid</option>
                                    <option value="unpaid">Un Paid</option>
                                </select>
                            </div>
                            <Table data={this.state.data} />
                        </React.Fragment>
                }
            </Layout>
        );
    }
}

export default SaleList;