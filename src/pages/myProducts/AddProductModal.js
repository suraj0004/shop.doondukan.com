import React, {useRef, useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { ClipLoader } from "react-spinners";
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import auth from '../../services/AuthService';
import UrlService from '../../services/UrlService';

function ErrorMsg(props) {
    return <div className="text-danger">
      {
        props.children
      }
    </div>
  }

  function Loader() {
    return (<ClipLoader loading color="#0069d9" />) 
  }

function AddProductModal(props) {

  const [loader, setLoader] = useState(false);
  const closeModel = useRef(null);
  const notify = (message) => toast.success(message);

    const initialValues = {
        product: "",
        weight_type: "gm",
        weight: ""
      }

      const onSubmit = (values,actions) => {
setLoader(true);
        console.log(values);
        axios.post(UrlService.AddCustomeProductUrl(),values,{
          headers : auth.apiHeader()
        }).then(res=>{
            const response = res.data;
            if(response.success){
              actions.resetForm();
              notify(response.message);
              props.handleAddProduct(response.data);
            }else{
           
              actions.setFieldError('product',response.message);
             
            }
            
        }).catch(err=>{
         
        }).finally(() => {
          actions.setSubmitting(false);
          setLoader(false);
        });
        
      }

      const onReset = (values) => {
        console.log(values);
        closeModel.current.click();
        
      }

      const validationSchema = Yup.object({
        product: Yup.string().required("Product Name is Required !"),
        weight_type: Yup.mixed().oneOf(['kg','gm','L','ml'],"Weight Type must be one of the following values: kg, gm, l, ml"),
        // weight: Yup.number().typeError('Weight must be a number').required("Weight is Required !").positive("Weight must be Greater than 0"),
      });

    return (

    <React.Fragment>
          <div className="modal fade" id="add_product" data-backdrop="static" data-keyboard="false">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">

          <div className="modal-content">
             <Formik
                   initialValues={initialValues}
                   validationSchema={validationSchema}
                   onSubmit={onSubmit}
                   onReset={onReset}
             >
               <React.Fragment>
                
                <Form>
                <div className="modal-header">
              <h4 className="modal-title">Default Modal</h4>
              <button type="reset" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>

              <button style={{display:'none'}} type="button" data-dismiss="modal" ref={closeModel}>
              </button>
            </div>


            <div className="modal-body">



            <ErrorMessage name="product" component={ErrorMsg} />
            <div className="form-group row">
                    <label htmlFor="product" className="col-sm-3 col-form-label">Product Name</label>
                    <div className="col-sm-9">
                    <Field
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Product Name"
                    name="product"
                    id="product"
                  />
                    </div>
                    
                  </div>



                  <ErrorMessage name="weight" component={ErrorMsg} />
                  <ErrorMessage name="weight_type" component={ErrorMsg} />
            <div className="form-group row">
                    <label htmlFor="weight" className="col-sm-3 col-form-label">Weight</label>

                    <div className="col-sm-6">
                    <Field
                    type="number"
                    className="form-control"
                    placeholder="Enter Your Product weight"
                    name="weight"
                    id="weight"
                  />
                    </div>
                    <div className="col-sm-3">
                    <Field
                    as="select"
                    className="form-control"
                    placeholder="Enter Weight Type"
                    name="weight_type"
                    id="weight_type"
                  >
                       <option value="kg">Kg</option>
                    <option value="L">liter</option>
                    <option value="gm">gm</option>
                    <option value="ml">ml</option>
                      </Field>
                    </div>
                    
                  </div>


       

        


            </div>


            <div className="modal-footer justify-content-between">
              <button type="reset" className="btn btn-default">Cancel</button>

              {
                loader
                ?<Loader/>
                :<button type="submit" className="btn btn-primary"> Add </button>
              }
              
            </div>

                </Form>

            
               </React.Fragment>
             </Formik>
          </div>

          </div>
        
        </div>
    
      </div>

<ToastContainer />
    </React.Fragment>

    );
}

export default AddProductModal;