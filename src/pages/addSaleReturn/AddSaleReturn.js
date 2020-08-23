import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Layout from '../../layouts/RetailLayout';
import auth from '../../services/AuthService';
import UrlService from '../../services/UrlService';
import PageLoader from '../../components/PageLoader';

import ConfirmBill from './ConfirmBill';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddSaleReturn extends Component {

  constructor(props){
    super(props);
   this.state = {
      response : "",
      responseClass : "text-danger",
      rows : [],
      options : [],
      isLoader : true,
      total : 0,
      bill_id : "",
      show_bill_form : true,
      page : "Sales Return"
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
   
  }

  componentDidMount() {
    this.setState({
      isLoader : false
    });
    // axios.get(  UrlService.globalAvailableStockListUrl(),{
    //   headers : auth.apiHeader()
    // }).then( res => {
    //        if(res.data.success){
          //   const data = res.data.data;
          //   let options_main = data.main.map(item => {
          //       let option = {
          //         value : "",
          //         label : "",
          //        };
          //       option.value = item.id+','+item.price+','+item.quantity;
          //       option.label =  item.product.name+' | '+  item.product.weight+' '+ item.product.weight_type +' | '+item.product.brand;
          //       return option;
          //   });
    
          //   let options_temp = data.temp.map(item => {
          //     let option = {
          //       value : "",
          //       label : "",
          //      };
          //      option.value = item.id+','+item.price+','+item.quantity;
          //      option.label =  item.temp_product.name+' | '+  item.temp_product.weight+' '+ item.temp_product.weight_type + " ( Custom Product) ";
          //     return option;
          // });
    
          // var row =  { options : options_temp.concat(options_main),  selectedOption: null, stock_id : "", avaliable_quantity : "", price : "", sell_quantity : "" }
          //   this.setState({
          //     rows : [row],
          //     options :  options_temp.concat(options_main),
          //     isLoader : false
          //   });
    //        }else{
    //         this.setState({
    //           response : res.data.message,
    //       });
    //        }
    // } ).catch( err => {
    //   err = err.response;
    //   if(err.status === 401 || err.statusText === "Unauthorized" )
    //    {
    //          auth.afterLogout();
    //          this.props.history.push("/login");
    //    }else if(err.status === 404){
    //     this.setState({
    //       response : "Opps! Something went wrong, Please call to adminstrator at +91-8954836965",
    //   });
    //    }else{
    //     this.setState({
    //       response : err.data.message,
    //   });
    //    }
    // });  

  }



  handleChange = (index,selectedOption) => {
    const sale = selectedOption.value.split(",");
    var rows = this.state.rows;
    rows[index].selectedOption = selectedOption;
    rows[index].sale_id = Number(sale[0]);
    rows[index].price = Number(sale[1]);
    rows[index].avaliable_quantity = Number(sale[2]);
    this.setState({ 
       rows : rows,
       response : "",
    });

  };


  handleInputChange = (index,event) => {
    
    var rows = this.state.rows;
    rows[index].return_quantity = Number(event.target.value);
    if(rows[index].return_quantity > rows[index].avaliable_quantity){
      this.setState({
        response : `Only '${rows[index].avaliable_quantity}' Pcs of '${rows[index].selectedOption.label}' is Available `,
        responseClass : "text-danger",
        rows : rows,
      });

      return;
    }
    console.log(rows);
    var total = 0;
   for(var i = 0; i<rows.length; i++){
     console.log(rows[i]);
     total += rows[i].price * rows[i].return_quantity;
   }
    console.log(total);
    this.setState({
      rows : rows,
      response : "",
      total : total,
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
          sale_id : "",
          avaliable_quantity : "",
          price : "",
          return_quantity : "" 
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
         sale_id : "",
         avaliable_quantity : "",
         price : "",
         return_quantity : "" 
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
      if(row.return_quantity === "" || row.return_quantity === 0 || row.return_quantity === null){
        this.setState({
          response : "Please Enter Quantity for '"+ row.selectedOption.label +"'",
          responseClass : "text-danger",
        });
        return;
      }
      if (row.return_quantity > row.avaliable_quantity) {
        this.setState({
          response : `Only '${row.avaliable_quantity}' Pcs of '${row.selectedOption.label}' is Available `,
          responseClass : "text-danger",
        });
        return;
      }
    }

   this.handleSubmit();

  }

   handleSubmit() {
        this.setState({
          isLoader : true,
       
        }, () => {
          var postData = [];
          postData = this.state.rows.map( item => {
            return {
              sale_id : item.sale_id,
              return_quantity : item.return_quantity,
            };
          });
          postData = {
            returns : postData,
            bill_id : Number(this.state.bill_id),
          };
          axios.post(UrlService.returnSaleURL(), postData,
           {
             headers: auth.apiHeader(),
           })
           .then(res=>{
           
             if(res.data.success){
              this.props.history.push('/invoice/'+res.data.data);
             }else{
               this.setState({
                 response : res.data.message,
               });
             }
          })
          .catch(err=>{
            console.log(err);
          if(err.response){
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
          }
          });
        })

   }
 


 




  

 

handleConfirmBillChnage = (event) => {
  this.setState({
    bill_id : event.target.value
  });
}


handleConfirmBillSubmmit = (event) => {
event.preventDefault();

  this.setState({
    response : "",
    isLoader : true,
  },() => {
    axios.get(UrlService.getSaleForReturnUrl() + Number(this.state.bill_id), {
      headers : auth.apiHeader()
    } ).then( res => {

      if(res.data.success){

        const data = res.data.data;
        let options_main = data.main_sale_product.map(item => {
            let option = {
              value : "",
              label : "",
             };
            option.value = item.id+','+item.price+','+item.quantity;
            option.label =  item.product.name+' | '+  item.product.weight+' '+ item.product.weight_type ;
            return option;
        });

        let options_temp = data.temp_sale_product.map(item => {
          let option = {
            value : "",
            label : "",
           };
           option.value = item.id+','+item.price+','+item.quantity;
           option.label =  item.temp_product.name+' | '+  item.temp_product.weight+' '+ item.temp_product.weight_type + " ( Custom Product) ";
          return option;
      });

      var row =  { options : options_temp.concat(options_main),  selectedOption: null, stock_id : "", avaliable_quantity : "", price : "", sell_quantity : "" }
        this.setState({
          rows : [row],
          options :  options_temp.concat(options_main),
          isLoader : false,
          show_bill_form : false,
          response : "",
          page : ""
        });
         
      }else{
        toast.error(res.data.message);
        this.setState({
          isLoader : false,
          show_bill_form : true,
      });
      }

    } ).catch(err => {
    
      err = err.response;
      if(err.status === 401 || err.statusText === "Unauthorized" )
       {
             auth.afterLogout();
             this.props.history.push("/login");
       }else if(err.status === 404){
        this.setState({
          response : "Opps! Something went wrong, Please call to adminstrator at +91-8954836965",
          lock : true,
      });
       }else{
        this.setState({
          response : err.data.message,
          lock : true,
      });
       }
    });
  });
}

handleBackButtonClick = () => {
  this.setState({
    response : "",
    responseClass : "text-danger",
    rows : [],
    options : [],
    total : 0,
    bill_id : "",
    show_bill_form : true,
    page : "Sales Return"
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
                        value={item.return_quantity} 
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
        <Layout pathname={this.props.location.pathname}  page={this.state.page}>
          
          {
              (this.state.isLoader)
              ?<PageLoader error={this.state.response}/>
              : (this.state.show_bill_form)?<ConfirmBill
              bill_id = {this.state.bill_id}
              handleConfirmBillSubmmit = {this.handleConfirmBillSubmmit}
              handleConfirmBillChnage = {this.handleConfirmBillChnage}
             
              />: 
<React.Fragment>
  

  <button type="button" className="btn btn-outline-secondary" onClick={this.handleBackButtonClick} ><i className="fa fa-arrow-left"></i> Back  </button>
  <hr/>
  
 
         <div className="card card-info" style={{marginLeft:'5%',marginRight:'5%',padding:'10px'}}>
          <div className="card-header">
            <h3 className="card-title"><strong>Return Sold Item</strong></h3>
          </div>
          
            
          <div className="row" >
          <div className={ this.state.responseClass } style={{ paddingTop:'5px' }}>  &nbsp; <strong> {this.state.response} </strong> </div>

            <div className="col-12" style={{ paddingBottom: '115px' }}>
              <table className="table table-striped">
                <thead>
                <tr className="text-center">
          <th>#{this.state.bill_id}</th>
                  <th>Select Product</th>
                  <th>Sold Quantity</th>
                  <th>Product Price</th>
                  <th>Return Quantity</th>
                </tr>
                </thead>
                <tbody> 
                  {rows}
                </tbody>
              </table>

              <div className="text-right"> <button  onClick={this.handleNewRow} className="btn btn-sm btn-primary" type="button"> <i className="fa fa-plus"></i> </button> </div>
            </div>
           
          </div>

<div className="text-right">  <h2> Total Amount: Rs. {this.state.total} /- </h2> </div>
          <div className="text-center"> <button  className="btn btn-block btn-success" type="button" onClick={this.handleGenerateBill} > Generate </button> </div>
          <br/>

        </div>
</React.Fragment>
     

          }
       <ToastContainer />   
      </Layout>
    );
}
}

export default AddSaleReturn;