import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Layout from '../layouts/RetailLayout';
import auth from '../services/AuthService';
import UrlService from '../services/UrlService';
import PageHeader from '../components/PageHeader';
class AddPurchase extends Component {
 
  constructor(props){
    super(props);
   this.state = {
      selectedOption: null,
      options : [],
      price_type : "lumsum",
      price : "",
      quantity : "",
      total : 0,
      response : "",
      responseClass : "text-danger",
      isLoader : true,
    };

   
  }
  componentDidMount() {
 

    auth.isValidToken( (success) =>{
      if(success){
          auth.afterLogout();
         this.props.history.push("/login"); 
      }
    });
    
    axios.get(  UrlService.globalProductListUrl(),{
      headers : auth.apiHeader()
    }).then( res => {
        //  console.log(res.data);
        const data = res.data.data;
        console.log(data);
        let options_main = data.main.map(item => {
            let option = {
              value : "",
              label : "",
             };
            option.value = item.id+',main';
            option.label =  item.name+' | '+  item.weight+' '+ item.weight_type +' | '+item.brand;
            return option;
        });

        let options_temp = data.temp.map(item => {
          let option = {
            value : "",
            label : "",
           };
          option.value = item.id+',temp';
          option.label =  item.name+' | '+  item.weight+' '+ item.weight_type +' | '+item.brand;
          return option;
      });

        this.setState({
          options : options_temp.concat(options_main),
          isLoader : false,
        });
    } ).catch( err => {
      console.log(err);
      this.setState({
        isLoader:false
      });
    });

    

  }

   calculateTotalPrice(price_type,price,quantity) {
     
     var total = 0;
     if(price_type === "lumsum" && price !== "" && quantity !== ""){
       total = price;
     }
     if(price_type === "per_piece" && price !== "" && quantity !== ""){
       total = price * quantity;
     }

     return total;
  }

 

  handleChange = selectedOption => {
    console.log(`Option selected:`, selectedOption);

    this.setState({ selectedOption }, () => {
        const {price_type,price,quantity} = this.state;
        const total = this.calculateTotalPrice(price_type,price,quantity);
        this.setState({
          total : total
        });
    });
    


  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    } , () => {
      const {price_type,price,quantity} = this.state;
      const total = this.calculateTotalPrice(price_type,price,quantity);
      this.setState({
        total : total
      });
    });
  
  };

  handleSubmit = event =>{
    event.preventDefault();
    var { selectedOption, price_type, price, quantity } = this.state;

    if(selectedOption === null){
      this.setState({
        response : "Please Select Product.",
        responseClass : "text-danger",
      });
    }else if(quantity === null || quantity === 0 || quantity === ""){
      this.setState({
        response : "Please Enter Quantity.",
        responseClass : "text-danger",
      });
    }else if(price === null || price === 0 || price === ""){
      this.setState({
        response : "Please Enter Price.",
        responseClass : "text-danger",
      });
    }else{
      this.setState({
        response : "",
        isLoader : true,
      }, () => {
        const product = (selectedOption.value).split(",");
        const postData = {
         product_id : Number(product[0]),
         product_source : product[1],
         price :  Number((price_type === "lumsum")?( price/quantity ):price) ,
         quantity : Number(quantity),
        }
  
        axios.post( UrlService.addPurchaseUrl(), postData, {
          headers : auth.apiHeader()
        }).then( res => {
          this.setState({
            response : "Successfully Added Product, Check your product list for details.",
            responseClass : "text-success",
            selectedOption: null,
            price_type : "lumsum",
            price : "",
            quantity : "",
            total : 0,
            isLoader : false,
          });
        } ).catch( err => {
          this.setState({
            response : "Opps something went wrong, please call to administrator at 8954836965",
            responseClass : "text-danger",
            selectedOption: null,
            price_type : "lumsum",
            price : "",
            quantity : "",
            total : 0,
            isLoader : false,
          });
        } );
      }  );

     



    }
   
  };

    render() {
       
      const { selectedOption,options } = this.state;
        return (
          <Layout pathname={this.props.location.pathname} isLoader={this.state.isLoader} >
                    <PageHeader page="Add Purchase"/>
            <div className="card card-info col-md-6 offset-3">
              <div className="card-header">
                <h3 className="card-title">Add Stock Purchase</h3>
              </div>
              
              <div className={ this.state.responseClass } style={{ paddingTop:'5px' }}>  &nbsp; <strong> {this.state.response} </strong> </div>
              <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="card-body">
                  <div className="form-group row">
                    <label htmlFor="prduct" className="col-sm-3 col-form-label">Select Product</label>
                    <div className="col-sm-9" id="prduct">
         <Select
         value={selectedOption}
         onChange={this.handleChange}
         options={options}
      />
 


                    </div>
                  </div>


                  <div className="form-group row">
                  <label htmlFor="quantity" className="col-sm-3 col-form-label">Quantity</label>
                    <div className="col-sm-9">
                      <input value={this.state.quantity} type="text" className="form-control" name="quantity" placeholder="Enter Quantity"  onChange={this.handleInputChange}/>
                    </div>

                    </div>


                  <div className="form-group row">
                  <label htmlFor="price_type" className="col-sm-3 col-form-label">Price Type</label>
                    <div className="col-sm-9">
                    <select value={this.state.price_type} name="price_type" className="form-control" onChange={this.handleInputChange} >
                    <option value="lumsum" >Lumsum</option>
                    <option value="per_piece">Per Piece</option>
                  </select>
                    </div>

                   
                  </div>

                  <div className="form-group row">
                  <label htmlFor="price" className="col-sm-3 col-form-label">Price</label>
                    <div className="col-sm-9">
                      <input value={this.state.price} type="text" className="form-control" name="price" placeholder="Enter Price"  onChange={this.handleInputChange}/>
                    </div>

                    </div>


                   

                    <div className="text-right h3"> <strong> Total: RS. {this.state.total} /-  </strong> </div>
               
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

export default AddPurchase;