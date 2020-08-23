import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Layout from '../../layouts/RetailLayout';
import auth from '../../services/AuthService';
import UrlService from '../../services/UrlService';
import PageLoader from '../../components/PageLoader';

class AddPurchaseReturn extends Component {


    constructor(props) {
        super(props);
        this.state = {
            response : "",
            responseClass : "text-danger",
            isLoader : false,

            selectedOption: null,
            options : [],
            price : "",
            max_quantity : "0",
            return_quantity : "",
          }; 
    }

    handleChange = selectedOption => {
        console.log(`Option selected:`, selectedOption);
        this.setState({ 
          selectedOption:selectedOption,
          price : (selectedOption.value).split(",")[1],
          max_quantity : (selectedOption.value).split(",")[2],
          response : "",
        });
    
      };



      handleInputChange = event => {
        var response = "";
        const return_quantity = Number(event.target.value);
        const max_quantity = Number(this.state.max_quantity);
        if(event.target.name == "return_quantity" && return_quantity > max_quantity  ){
            response = ` Return Quantity must be less than ${max_quantity} `;
        }
        this.setState({
          [event.target.name]: event.target.value,
          response : response
        });
      
      };



      handleSubmit = event =>{
        event.preventDefault();
        var { selectedOption, price, return_quantity,max_quantity } = this.state;
    
        if(selectedOption === null){
          this.setState({
            response : "Please Select Return Item.",
            responseClass : "text-danger",
          });
        }else if(price === null || price === 0 || price === ""){
          this.setState({
            response : "Please Enter Return Price.",
            responseClass : "text-danger",
          });
        }
        else if(return_quantity === null || return_quantity === 0 || return_quantity === ""){
          this.setState({
            response : "Please Enter Return Quantity.",
            responseClass : "text-danger",
          });
        }
        else if(Number(return_quantity) > Number(max_quantity)){
          this.setState({
            response :  ` Return Quantity must be less than ${max_quantity} `,
            responseClass : "text-danger",
          });
        }
        else{
          this.setState({
            response : "",
            isLoader : true,
          },()=>{
            const postData = {
              stock_id : Number((selectedOption.value).split(",")[0]),
              price :  Number(price) ,
              quantity :  Number(return_quantity) ,
             }
       
             axios.post( UrlService.returnPurchaseURL(), postData, {
               headers : auth.apiHeader()
             }).then( res => {
                 if(res.data.success){
                  this.setState({
                    response : "Successfully Added Return Item, Check your Return list for details.",
                    responseClass : "text-success",
                    selectedOption: null,
                    price : "", 
                    return_quantity : "",
                    max_quantity : "",
                    isLoader : false,
                  });
                 }else{
                  this.setState({
                    response : res.data.message,
                    responseClass : "text-danger",
                    selectedOption: null,
                    price : "",
                    return_quantity : "",
                    max_quantity : "",
                    isLoader : false,
                  });
                 }
             } ).catch( err => {
             
               if(err.response){
                err = err.response;
                if( err.status && ( err.status === 401 || err.statusText === "Unauthorized") )
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
               }
             } );
          });
    
          
       
    
    
    
        }
       
      };

   
      componentDidMount() {
        
        axios.get(  UrlService.globalAvailableStockListForPurchaseReturnUrl(),{
          headers : auth.apiHeader()
        }).then( res => {
               if(res.data.success){

                const data = res.data.data;
                console.log(data);
                let options_main = data.main.map(item => {
                    let option = {
                      value : "",
                      label : "",
                     };
                    option.value = item.id+','+item.purchase_price.price+','+item.quantity;
                    option.label =  item.product.name+' | '+  item.product.weight+' '+ item.product.weight_type +' | '+item.product.brand;
                    return option;
                });
        
                let options_temp = data.temp.map(item => {
                  let option = {
                    value : "",
                    label : "",
                   };
                   option.value = item.id+','+item.purchase_price.price+','+item.quantity;
                   option.label =  item.temp_product.name+' | '+  item.temp_product.weight+' '+ item.temp_product.weight_type + " ( Custom Product) ";
                  return option;
              });
        
            
                this.setState({
                  options :  options_temp.concat(options_main),
                  isLoader : false
                });
               }else{
                this.setState({
                  response : res.data.message,
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
        });  
    
      }


    


    render() {
        const { selectedOption,options } = this.state;
        return (
          <Layout  pathname={this.props.location.pathname} page="Purchase Return" >
                  {
                  (this.state.isLoader)
                  ?<PageLoader error={this.state.response}/>
                  :  
                  <div className="card card-info" style={{marginLeft:'5%',marginRight:'5%',padding:'10px'}}>
                  <div className="card-header">
                    <h3 className="card-title"><strong>Return Purchased Item </strong></h3>
                  </div>
                  
                  <div className={ this.state.responseClass } style={{ paddingTop:'5px' }}>  &nbsp; <strong> {this.state.response} </strong> </div>
                  <form className="form-horizontal"  onSubmit={this.handleSubmit} >
                    <div className="card-body">
                      <div className="form-group row">
                        <label htmlFor="stock" className="col-sm-4 col-form-label">Return Item</label>
                        <div className="col-sm-8" id="stock">
                        <Select
             value={selectedOption}
             onChange={this.handleChange}
             options={options}
          />
     
    
    
                        </div>
                      </div>
    
    
                
    
                      <div className="form-group row">
                      <label htmlFor="price" className="col-sm-4 col-form-label">Return Price</label>
                        <div className="col-sm-8">
                          <input value={this.state.price} type="number" className="form-control" id="price" name="price" placeholder="Enter Return Price "
                          onChange={this.handleInputChange}
                          />
                        </div>
    
                        </div>

                        <div className="form-group row">
                      <label htmlFor="return_quantity" className="col-sm-4 col-form-label">Return Quantity <strong>Max ( {this.state.max_quantity} ) </strong> </label>
                        <div className="col-sm-8">
                          <input value={this.state.return_quantity} type="number" className="form-control" id="return_quantity" name="return_quantity" placeholder="Enter Return Quantity"
                          onChange={this.handleInputChange}
                          />
                        </div>
    
                        </div>
                   
                    </div>
                    
                    <div className="card-footer">
                     
                      <button type="submit" className="btn btn-info float-right">Return</button>
                    </div>
                    
                  </form>
                </div>
                }  
         
          </Layout>
        );
    }
}

export default AddPurchaseReturn;