import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Layout from '../layouts/RetailLayout';
import auth from '../services/AuthService';
import UrlService from '../services/UrlService';
import PageLoader from '../components/PageLoader';
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
        this.setState({ 
          selectedOption:selectedOption,
          price : (selectedOption.value).split(",")[1]
        });
    
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
              stock_id : (selectedOption.value).split(",")[0],
              price :  Number(price) ,
             }
       
             axios.post( UrlService.setPriceUrl(), postData, {
               headers : auth.apiHeader()
             }).then( res => {
                 if(res.data.success){
                  this.setState({
                    response : "Successfully Added Selling price, Check your Stock list for details.",
                    responseClass : "text-success",
                    selectedOption: null,
                    price : "", 
                    isLoader : false,
                  });
                 }else{
                  this.setState({
                    response : res.data.message,
                    responseClass : "text-danger",
                    selectedOption: null,
                    price : "",
                    isLoader : false,
                  });
                 }
             } ).catch( err => {
             
               err = err.response;
               if(err.status === 401 || err.statusText === "Unauthorized" )
                {
                      auth.afterLogout();
                      this.props.history.push("/login");
                }else if(err.status === 404){
                  this.setState({
                    response : "Opps! Something went wrong, Please call to adminstrator at +91-8954836965",
                });
                 }else{
                 this.setState({
                   response : err.data.message,
               });
                }
             } );
          });
    
          
       
    
    
    
        }
       
      };


      componentDidMount() {
   


        axios.get( UrlService.globalStockListUrl(), {
          headers : auth.apiHeader(),    
            } ).then( res => {
               
              if(res.data.success){
                const data = res.data.data;
                console.log(data);
                let options_main = data.main.map(item => {
                    let option = {
                      value : "",
                      label : "",
                     };
                    option.value = item.id + "," + item.price;
                    option.label =  `${item.product.name} |  ${ item.product.weight} ${item.product.weight_type}  | ${item.product.brand}, (Purchased at Rs. ${item.purchase_price.price} /- Per Pec)`;
                    return option;
                });
        
                let options_temp = [];
                 options_temp = data.temp.map(item => {
                  let option = {
                    value : "",
                    label : "",
                   };
                   option.value = item.id + "," + item.price;
                  option.label =  item.temp_product.name+' | '+  item.temp_product.weight+' '+ item.temp_product.weight_type +' | '+item.temp_product.brand;
                  return option;
              });
        
                this.setState({
                  options : options_temp.concat(options_main),
                  isLoader : false,
                });
              }else{
                this.setState({
                  response : res.data.message,
              });
              }

            } ).catch(  err => {
              err = err.response;
              if(err.status === 401 || err.statusText === "Unauthorized" )
               {
                     auth.afterLogout();
                     this.props.history.push("/login");
               }else if(err.status === 404){
                this.setState({
                  response : "Opps! Something went wrong, Please call to adminstrator at +91-8954836965",
              });
               }else{
                this.setState({
                  response : err.data.message,
              });
               }
            });


     }

     

    render() {
        const { selectedOption,options } = this.state;
        return (
          <Layout pathname={this.props.location.pathname} page="Set Stock Price"  >
                {
                  (this.state.isLoader)
                  ?<PageLoader error={this.state.response}/>
                  :  
                  <div className="card card-info" style={{marginLeft:'5%',marginRight:'5%',padding:'10px'}}>
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
                }  
         
         
          </Layout>
        );
    }
}

export default SetPrice;