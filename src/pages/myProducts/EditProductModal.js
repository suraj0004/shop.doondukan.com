import React, { useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { ClipLoader } from "react-spinners";
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import auth from '../../services/AuthService';
import UrlService from '../../services/UrlService';
import { Modal } from 'react-bootstrap';

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

function EditProductModal(props) {

  
  const [loader, setLoader] = useState(false);
  const notify = (message) => toast.success(message);

  console.log(props.edit.data);

    const initialValues = {
        product: props.edit.data?.name?props.edit.data.name:'',
        weight_type: props.edit.data?.weight_type?props.edit.data.weight_type:'',
        weight: props.edit.data?.weight?props.edit.data.weight:''
      }

      const onSubmit = (values,actions) => {
        setLoader(true);
                console.log(values);
                axios.post(UrlService.EditCustomeProductUrl(props.edit.data.id),values,{
                  headers : auth.apiHeader()
                }).then(res=>{
                    const response = res.data;
                    if(response.success){
                      actions.resetForm();
                      notify(response.message);
                      props.handleEditProduct(response.data);
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
                props.hideEditModal()
                
              }
        
              const validationSchema = Yup.object({
                product: Yup.string().required("Product Name is Required !"),
                weight_type: Yup.mixed().oneOf(['kg','gm','L','ml'],"Weight Type must be one of the following values: kg, gm, l, ml"),
                // weight: Yup.number().typeError('Weight must be a number').required("Weight is Required !").positive("Weight must be Greater than 0"),
              });

  return (
    <>
      <Modal size="lg" show={props.edit.show} onHide={props.hideEditModal}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          onReset={onReset}
        >
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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

            </Modal.Body>
            <Modal.Footer className="justify-content-between">
              <button type="reset" className="btn btn-default">Cancel</button>
              {
                loader
                  ? <Loader />
                  : <button type="submit" className="btn btn-primary"> Save </button>
              }
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal>
    </>
  );
}

export default EditProductModal;