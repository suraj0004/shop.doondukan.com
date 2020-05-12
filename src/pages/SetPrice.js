import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Layout from '../layouts/RetailLayout';
import auth from '../services/AuthService';
import UrlService from '../services/UrlService';
import PageHeader from '../components/PageHeader';
class SetPrice extends Component {
    constructor(props){
        super(props);
       this.state = {
          selectedOption: null,
          options : [],
          price : "",
          response : "",
          responseClass : "text-danger",
          isLoader : true,
        };   
       
      }

      handleChange = selectedOption => {
        console.log(`Option selected:`, selectedOption);
    
        this.setState({ selectedOption });
    
      };

      handleInputChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      
      };

      handleSubmit = event =>{
        event.preventDefault();
        var { selectedOption, price } = this.state;
    
        if(selectedOption === null){
          this.setState({
            response : "Please Select Stock.",
            responseClass : "text-danger",
          });
        }else if(price === null || price === 0 || price === ""){
          this.setState({
            response : "Please Enter Selling Price.",
            responseClass : "text-danger",
          });
        }else{
          this.setState({
            response : "",
            isLoader : true,
          },()=>{
            const postData = {
              stock_id : selectedOption.value,
              price :  Number(price) ,
             }
       
             axios.post( UrlService.setPriceUrl(), postData, {
               headers : auth.apiHeader()
             }).then( res => {
               this.setState({
                 response : "Successfully Added Selling price, Check your Stock list for details.",
                 responseClass : "text-success",
                 selectedOption: null,
                 price : "", 
                 isLoader : false,
               });
             } ).catch( err => {
               this.setState({
                 response : "Opps something went wrong, please call to administrator at 8954836965",
                 responseClass : "text-danger",
                 selectedOption: null,
                 price : "",
                 isLoader : false,
               });
             } );
          });
    
          
       
    
    
    
        }
       
      };


      componentDidMount() {
   
    
        auth.isValidToken( (success) =>{
          if(success){
              auth.afterLogout();
             this.props.history.push("/login"); 
          }
        });

        axios.get( UrlService.globalStockListUrl(), {
          headers : auth.apiHeader(),    
            } ).then( res => {
              const data = res.data.data;
              console.log(data);
              let options_main = data.map(item => {
                  let option = {
                    value : "",
                    label : "",
                   };
                  option.value = item.id;
                  option.label =  item.product.name+' | '+  item.product.weight+' '+ item.product.weight_type +' | '+item.product.brand;
                  return option;
              });
      
              let options_temp = [];
            //   let options_temp = data.temp.map(item => {
            //     let option = {
            //       value : "",
            //       label : "",
            //      };
            //     option.value = item.id;
            //     option.label =  item.product.name+' | '+  item.product.weight+' '+ item.product.weight_type +' | '+item.product.brand;
            //     return option;
            // });
      
              this.setState({
                options : options_temp.concat(options_main),
                isLoader : false,
              });

            } ).catch(  err => {
              console.log(err);

              this.setState({
                isLoader : false,
              });
            });


     }

     

    render() {
        const { selectedOption,options } = this.state;
        return (
          <Layout pathname={this.props.location.pathname} isLoader={this.state.isLoader} >
                    <PageHeader page="Set Stock Price"/>
            <div className="card card-info col-md-6 offset-3">
              <div className="card-header">
                <h3 className="card-title">Set Stock Selling Price</h3>
              </div>
              
              <div className={ this.state.responseClass } style={{ paddingTop:'5px' }}>  &nbsp; <strong> {this.state.response} </strong> </div>
              <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="card-body">
                  <div className="form-group row">
                    <label htmlFor="prduct" className="col-sm-4 col-form-label">Select Stock</label>
                    <div className="col-sm-8" id="prduct">
         <Select
         value={selectedOption}
         onChange={this.handleChange}
         options={options}
      />
 


                    </div>
                  </div>


            

                  <div className="form-group row">
                  <label htmlFor="price" className="col-sm-4 col-form-label">Set Selling Price</label>
                    <div className="col-sm-8">
                      <input value={this.state.price} type="text" className="form-control" name="price" placeholder="Enter Selling Price"  onChange={this.handleInputChange}/>
                    </div>

                    </div>
               
                </div>
                
                <div className="card-footer">
                  <button type="reset" className="btn btn-default ">Cancel</button>
                  <button type="submit" className="btn btn-info float-right">Add</button>
                </div>
                
              </form>
            </div>
         
          </Layout>
        );
    }
}

export default SetPrice;