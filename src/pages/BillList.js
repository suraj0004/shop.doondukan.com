import React, { Component } from 'react';
import axios from 'axios';

import Layout from '../layouts/RetailLayout';

import auth from '../services/AuthService';
import UrlService from '../services/UrlService';
import PageLoader from '../components/PageLoader';
import PaginatedData from './billList/PaginatedData';


class BillList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      type: "",
      search : "",
      isLoader: true,
      response: ""
    }

    this.getBills = this.getBills.bind(this);
  }

  getBills(page = 1,loader = true) {
    this.setState({
      isLoader: loader,
    }, () => {
      var search = this.state.search;

      search = search.replace('#000','');
      search = search.replace('#00','');
      search = search.replace('#0','');
      search = search.replace('#','');

      axios.get(UrlService.billListUrl(), {
        headers: auth.apiHeader(),
        params: {
          page : page,
          type: this.state.type,
          search : search,
        },
      }).then(res => {
        if (res.data.success) {
          this.setState({
            data: res.data.data,
            isLoader: false,
            response : "",
          })
        } else {
          if(this.state.type === "" && this.state.search === ""){
            this.setState({
              response: res.data.message
            });
          }else{
            this.setState({
              isLoader : false,
              response: res.data.message
            });
          }
         
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
    })


  }



  componentDidMount() {

    this.getBills(1);


  }

  handleStatusChange = (event) => {
    this.setState({
        status : event.target.value,
        response : "",
        // isLoader : true
    },()=>{
      this.getBills(1);
    });
}

handleSearchChange = (event) => {
  this.setState({
    search : event.target.value,
    response : "",
},() => {
  if(this.state.search === ""){
    this.getBills(1);
  }
});
}

handleSearch = () =>{
  this.getBills(1);
}

  render() {

    return (
      <Layout
        pathname={this.props.location.pathname}
        page="Invoice">
        {
          (this.state.isLoader)
            ? <PageLoader error={this.state.response} />
            : <React.Fragment>
              <div className="row">
                <div className="col-md-6">
                <div className="form-group" style={{ width: "125px" }} >
                                <select 
                                  className="custom-select" 
                                  value={this.state.type}
                                  onChange={this.handleStatusChange} >
                                    <option value="">All</option>
                                    <option value="online">Online</option>
                                    <option value="offline">Offline</option>
                                </select>
                   </div>
                </div>

                <div className="col-md-6">
                <div className="form-group float-right" style={{ width: "200px" }} >
                {/* <input 
                   type="text" 
                   class="form-control"
                   placeholder="Search Bill No." 
                   value={this.state.search}
                   onChange={this.handleSearchChange}
                   /> */}
                     <div className="input-group input-group-sm">
                  <input 
                     type="text" 
                     className="form-control"
                     placeholder="Search Invoice No." 
                     value={this.state.search}
                     onChange={this.handleSearchChange}
                     />
                  <span className="input-group-append">
                    <button 
                      type="button" 
                      className="btn btn-info btn-flat"
                      onClick={this.handleSearch}
                      >Go!</button>
                  </span>
                </div>
                   </div>
                </div>

              </div>
              <PaginatedData data={this.state.data} getBills={this.getBills} response={this.state.response} />
            </React.Fragment>
        }
      </Layout>
    );
  }
}

export default BillList;