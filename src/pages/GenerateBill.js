import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Layout from '../layouts/RetailLayout';
import auth from '../services/AuthService';
import UrlService from '../services/UrlService';
import PageLoader from '../components/PageLoader';
import BuyerDetailForm from './generateBill/BuyerDetailForm';

class GenerateBill extends Component {

    constructor(props){
        super(props);
       this.state = {
          response : "",
          responseClass : "text-danger",
          rows : [],
          options : [],
          model_show : false,
          model_response : "",
          buyer_name : "",
          buyer_email : "",
          buyer_mobile : "",
          isLoader : true,
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
       
      }

      componentDidMount() {
 

        // auth.isValidToken( (success) =>{
        //   if(success){
        //       auth.afterLogout();
        //      this.props.history.push("/login"); 
        //   }
        // });
        
        axios.get(  UrlService.globalAvailableStockListUrl(),{
          headers : auth.apiHeader()
        }).then( res => {
            const data = res.data.data;
            let options_main = data.main.map(item => {
                let option = {
                  value : "",
                  label : "",
                 };
                option.value = item.id+','+item.price+','+item.quantity;
                option.label =  item.product.name+' | '+  item.product.weight+' '+ item.product.weight_type +' | '+item.product.brand;
                return option;
            });
    
            let options_temp = data.temp.map(item => {
              let option = {
                value : "",
                label : "",
               };
               option.value = item.id+','+item.price+','+item.quantity;
               option.label =  item.temp_product.name+' | '+  item.temp_product.weight+' '+ item.temp_product.weight_type +' | '+item.temp_product.brand;
              return option;
          });
    
          var row =  { options : options_temp.concat(options_main),  selectedOption: null, stock_id : "", avaliable_quantity : "", price : "", sell_quantity : "" }
            this.setState({
              rows : [row],
              options :  options_temp.concat(options_main),
              isLoader : false
            });
        } ).catch( err => {
          console.log(err);
          this.setState({
            response : err.response.data.message
          });
        });  
    
      }



      handleChange = (index,selectedOption) => {
        const stock = selectedOption.value.split(",");
        var rows = this.state.rows;
        rows[index].selectedOption = selectedOption;
        rows[index].stock_id = Number(stock[0]);
        rows[index].price = Number(stock[1]);
        rows[index].avaliable_quantity = Number(stock[2]);
        this.setState({ 
           rows : rows,
           response : "",
        });
    
      };

      handleInputChange = (index,event) => {
        
        var rows = this.state.rows;
        rows[index].sell_quantity = Number(event.target.value);
        if(rows[index].sell_quantity > rows[index].avaliable_quantity){
          this.setState({
            response : `Only '${rows[index].avaliable_quantity}' Pcs of '${rows[index].selectedOption.label}' is Available `,
            responseClass : "text-danger",
            rows : rows,
          });

          return;
        }
        this.setState({
          rows : rows,
          response : "",
        });
      
      };

 


      handleNewRow = () => {

        var rows = this.state.rows;
        var options;
        var all_selected_options = rows.map( (item) => {
          return item.selectedOption;
        });

        if(all_selected_options.length === this.state.options.length){
          this.setState({ 
            response : "No More Stock is Available",
            responseClass : "text-danger",
          });
          return;
        }
        if(rows.length === 0){

             options = this.state.options;
             rows.push({
              options : options,
              selectedOption: null,
              stock_id : "",
              avaliable_quantity : "",
              price : "",
              sell_quantity : "" 
           });
   
           this.setState({ 
             rows : rows,
             response : "",
          });

        }else{

          const last_row = rows[rows.length - 1];
          const last_row_selected_option = last_row.selectedOption;
          if(last_row_selected_option === null){
            this.setState({ 
             response : "Please fill exisiting row before adding new row",
             responseClass : "text-danger",
           });
          }else{
            options = this.state.options.filter( (option) => {
              return !(all_selected_options.includes(option));
           });
 
           rows.push({
             options : options,
             selectedOption: null,
             stock_id : "",
             avaliable_quantity : "",
             price : "",
             sell_quantity : "" 
          });
  
          this.setState({ 
            rows : rows,
            response : "",
         });
          }
        
        }
     
   
      }



      handleDeleteRow = (index) =>{
        var rows = this.state.rows;
          
            rows = rows.filter( (item,i) => {
               return i !== index;
            });

        this.setState({ 
          rows : rows,
          response : "",
       });
      }

      handleGenerateBill = () => {

        var rows =  this.state.rows;
        if(rows.length === 0 ){
          this.setState({
            response : "Please Add some products",
            responseClass : "text-danger",
          });
          return;
        }
        for(let row of rows){
          if(row.selectedOption === null){
            this.setState({
              response : "Please Select Product",
              responseClass : "text-danger",
            });
            return;
          }
          if(row.sell_quantity === "" || row.sell_quantity === 0 || row.sell_quantity === null){
            this.setState({
              response : "Please Enter Quantity for '"+ row.selectedOption.label +"'",
              responseClass : "text-danger",
            });
            return;
          }
          if (row.sell_quantity > row.avaliable_quantity) {
            this.setState({
              response : `Only '${row.avaliable_quantity}' Pcs of '${row.selectedOption.label}' is Available `,
              responseClass : "text-danger",
            });
            return;
          }
        }

        this.setState({ 
          response : "",
          model_show : true,

       });

      }

       handleSubmit() {
            this.setState({
              isLoader : true,
              model_show : false,
            }, () => {
              var postData = [];
              postData = this.state.rows.map( item => {
                return {
                  stock_id : item.stock_id,
                  quantity : item.sell_quantity,
                };
              });
              postData = {
                sale : postData,
                buyer : {
                  name : this.state.buyer_name,
                  email : this.state.buyer_email,
                  mobile : this.state.buyer_mobile,
                }
              };
              axios.post(UrlService.generateBillUrl(), postData,
               {
                 headers: auth.apiHeader(),
               })
               .then(res=>{
                 if(res.data.success){
                  const row =  { options : this.state.options ,  selectedOption: null, stock_id : "", avaliable_quantity : "", price : "", sell_quantity : "" }
                   this.setState({
                     response : "Successfully Generated Bill",
                     responseClass : "text-success",
                     isLoader : false,
                     rows : [row],
                     buyer_name : "",
                     buyer_email : "",
                     buyer_mobile : "",
                   });
                 }else{
                   this.setState({
                     response : res.data.message,
                     responseClass : "text-danger",
                     isLoader : false,
                   });
                 }
              })
              .catch(e=>{
             
               this.setState({
                 response : "Opps Something went wrong, please contact to administrator at 8954836965",
                 responseClass : "text-danger",
                 isLoader : false,

               })
              });
            })

       }
     
      hideModal = () =>{
        this.setState({
          model_show : false,
        });
      }

      handleSaveSubmit = () => {
           if(this.state.buyer_name === "" ){
             this.setState({
              model_response : "Buyer Name is required"
             });
             return;
           }  
           if(this.state.buyer_email === "" ){
            this.setState({
             model_response : "Buyer Email is required"
            });
            return;
          } 
          if(this.state.buyer_mobile === "" ){
            this.setState({
             model_response : "Buyer Mobile Number is required"
            });
            return;
          } 

          this.handleSubmit();
           
      }

      handleSkipSubmit = () => {
        this.handleSubmit();
      }

      handleBuyerDetails = (event) => {
        
         this.setState({
           [event.target.name] : event.target.value
         })
      }
      

    render() {

        const rows = this.state.rows.map( (item,index) => {

         let deleteRow = <button style={{marginTop : '7px'}} onClick={ () => this.handleDeleteRow(index) } className="btn btn-block btn-outline-danger btn-xs" type="button"> <i className="fa fa-minus"></i> </button>;

         return <tr key={ (index+1).toString() } className="text-center">
                    <td>
                    { deleteRow }
                    </td>
                    <td style={{width: '35%'}}>
                        <div>
                           <Select
                           value={item.selectedOption}
                           onChange={ (e) => this.handleChange(index,e) }
                           options={item.options}
                           isDisabled={ (item.selectedOption === null) ? false : true }
                           />
                        </div>
                    </td>
                    <td> { (item.avaliable_quantity === "")?"----" : item.avaliable_quantity + "Pcs."  } </td>
                    <td> { (item.price === "")?"----" : "Rs. " + item.price + " /-" } </td>
                    <td> <input 
                            value={item.sell_quantity} 
                            type="text" 
                            className="form-control"
                            name="quantity" 
                            placeholder="Enter Quantity"  
                            onChange={ (e) => this.handleInputChange(index,e)}
                            disabled={ (item.selectedOption === null) ? true : false }
                        /> 
                    </td>
              </tr>
         
        });

        return (
            <Layout pathname={this.props.location.pathname}  page="Generate Bill">
              
              {
                  (this.state.isLoader)
                  ?<PageLoader error={this.state.response}/>
                  : 

            <div className="card card-info" style={{marginLeft:'5%',marginRight:'5%',padding:'10px'}}>
              <div className="card-header">
                <h3 className="card-title">Generate Bill</h3>
              </div>
              
                
              <div className="row" >
              <div className={ this.state.responseClass } style={{ paddingTop:'5px' }}>  &nbsp; <strong> {this.state.response} </strong> </div>

                <div className="col-12 table-responsive" style={{ paddingBottom: '80px' }}>
                  <table className="table table-striped">
                    <thead>
                    <tr className="text-center">
                      <th>#</th>
                      <th>Select Product</th>
                      <th>Avl Quantity</th>
                      <th>Product Price</th>
                      <th>Sell Quantity</th>
                    </tr>
                    </thead>
                    <tbody> 
                      {rows}
                    </tbody>
                  </table>

                  <div className="text-right"> <button  onClick={this.handleNewRow} className="btn btn-sm btn-primary" type="button"> <i className="fa fa-plus"></i> </button> </div>
                </div>
               
              </div>


              <div className="text-center"> <button  className="btn btn-block btn-success" type="button" onClick={this.handleGenerateBill} > Generate </button> </div>
              <br/>

            </div>
         

              }
                  <BuyerDetailForm 
                show={this.state.model_show} 
                hideModal={this.hideModal} 
                handleSaveSubmit={this.handleSaveSubmit}
                handleSkipSubmit={this.handleSkipSubmit}
                buyer_name={this.state.buyer_name}
                buyer_email={this.state.buyer_email}
                buyer_mobile={this.state.buyer_mobile}
                model_response={this.state.model_response}
                handleBuyerDetails = {this.handleBuyerDetails}
          />
          </Layout>
        );
    }
}

export default GenerateBill;