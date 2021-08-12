import React, { useRef, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Camera from "./Camera";

import auth from "../../services/AuthService";
import UrlService from "../../services/UrlService";

import { compressImgae } from "../../helpers/Helpers";

function ErrorMsg(props) {
  return <div className="text-danger">{props.children}</div>;
}

function Loader() {
  return <ClipLoader loading color="#0069d9" />;
}

function imageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function ImagePreview({ cameraImage, fileImage, removeImage }) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (cameraImage) {
      setSrc(cameraImage);
    } else {
      imageToBase64(fileImage).then((res) => {
        setSrc(res);
      });
    }
  }, [cameraImage, fileImage]);

  return (
    <div className="text-center">
      <div className="img-responsive">
        <img
          src={src}
          className="img-fluid"
          width="250px"
          alt="Product Preview"
        />
      </div>
      <button className="btn btn-danger mt-2" onClick={removeImage}>
        Remove Image <i className="fas fa-times"></i>
      </button>
    </div>
  );
}

function AddProductModal(props) {
  const [loader, setLoader] = useState(false);
  const [apiError, setApiError] = useState(props.categories_fetch_error);
  const [imageError, setImageError] = useState("");
  const [camera, setCamera] = useState(false);
  const [cameraImage, setCameraImage] = useState("");
  const closeModel = useRef(null);
  const notify = (message) => toast.success(message);

  const initialValues = {
    product: "",
    weight_type: "",
    weight: "",
    category: "",
    price: "",
    image: null,
  };

  const onSubmit = async (values, actions) => {
    setApiError("");
    setImageError("");
    let payload = {
      name: values.product,
      weight: values.weight,
      weight_type: values.weight_type,
      category_id: values.category,
      price: values.price,
    };
    if (values.image && !cameraImage) {
      const validImageExtension = ["image/jpeg", "image/jpg", "image/png"];
      if (!validImageExtension.includes(values.image.type)) {
        setImageError("Product image should be JPG or PNG.");
        actions.setSubmitting(false);
        return;
      }
      if (values.image.size > 52428800) {
        setImageError("Product image should less than 50 MB.");
        actions.setSubmitting(false);
        return;
      }
      setLoader(true);
      payload.image = await compressImgae(values.image);
      if (!payload.image) {
        setImageError(
          "Opps! Error while uploading image. please select different image."
        );
        actions.setSubmitting(false);
        setLoader(false);
        return;
      }
      payload.image = await imageToBase64(payload.image);
    } else if (cameraImage && !values.image) {
      payload.image = cameraImage;
    } else {
      setImageError("Product image is required!");
      actions.setFieldValue("image", null);
      setCameraImage("");
      actions.setSubmitting(false);
      return;
    }
    setLoader(true);
    axios
      .post(UrlService.AddCustomeProductUrl(), payload, {
        headers: auth.apiHeader(),
      })
      .then((res) => {
        const response = res.data;
        console.log(response);
        if (response.success) {
          actions.resetForm();
          notify(response.message);
          props.onSuccess();
        } else {
          setApiError(response.message);
        }
      })
      .catch((err) => {})
      .finally(() => {
        actions.setSubmitting(false);
        setLoader(false);
      });
  };

  const onReset = (values) => {
    closeModel.current.click();
    setCameraImage("");
  };

  const validationSchema = Yup.object({
    product: Yup.string().required("Product Name is Required !"),
    weight: Yup.number().required("Weight is Required !"),
    weight_type: Yup.string().required("Weight Type is Required !"),
    category: Yup.number().required("Category is Required !"),
  });

  const onImageCapture = (imageDataUri) => {
    setCameraImage(imageDataUri);
    setCamera(false);
  };

  return (
    <React.Fragment>
      {camera ? (
        <Camera
          closeCamera={() => setCamera(false)}
          onImageCapture={onImageCapture}
        />
      ) : null}
      <div
        className="modal fade"
        id="add_product"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-content">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                onReset={onReset}
              >
                {(formikProps) => {
                  return (
                    <React.Fragment>
                      <Form>
                        <div className="modal-header">
                          <h4 className="modal-title">Product Builder</h4>
                          <button
                            type="reset"
                            className="close"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>

                          <button
                            style={{ display: "none" }}
                            type="button"
                            data-dismiss="modal"
                            ref={closeModel}
                          ></button>
                        </div>

                        <div className="modal-body">
                          <div className="text-center p-2 text-danger">
                            {apiError}
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="product"
                              className="col-sm-3 col-form-label"
                            >
                              Product Name
                            </label>
                            <div className="col-sm-9">
                              <Field
                                type="text"
                                className="form-control"
                                placeholder="Enter Your Product Name"
                                name="product"
                                id="product"
                              />
                              <ErrorMessage
                                name="product"
                                component={ErrorMsg}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="weight"
                              className="col-sm-3 col-form-label"
                            >
                              Product Weight
                            </label>
                            <div className="col-sm-9">
                              <Field
                                type="number"
                                className="form-control"
                                placeholder="Enter Product weight"
                                name="weight"
                                id="weight"
                              />
                              <ErrorMessage
                                name="weight"
                                component={ErrorMsg}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="weight_type"
                              className="col-sm-3 col-form-label"
                            >
                              Weight Type
                            </label>
                            <div className="col-sm-9">
                              <Field
                                type="text"
                                className="form-control"
                                placeholder="eg. KG, L, Pcs.."
                                name="weight_type"
                                id="weight_type"
                              />
                              <ErrorMessage
                                name="weight_type"
                                component={ErrorMsg}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="category"
                              className="col-sm-3 col-form-label"
                            >
                              Product Category
                            </label>
                            <div className="col-sm-9">
                              <Field
                                as="select"
                                className="form-control"
                                placeholder="eg. KG, L, Pcs.."
                                name="category"
                                id="category"
                              >
                                <option value=""> Select Category </option>
                                {props.categories.map((category) => {
                                  return (
                                    <option
                                      value={category.id}
                                      key={category.id}
                                    >
                                      {" "}
                                      {category.category_name}{" "}
                                    </option>
                                  );
                                })}
                              </Field>
                              <ErrorMessage
                                name="category"
                                component={ErrorMsg}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="price"
                              className="col-sm-3 col-form-label"
                            >
                              Cost/Purchase Price
                            </label>
                            <div className="col-sm-9">
                              <Field
                                type="number"
                                className="form-control"
                                placeholder="Enter Purchase Price"
                                name="price"
                                id="price"
                              />
                              <small>
                                Note: Enter 0 ( zero ) in case of privacy.
                                <br />
                                This is not selling price. Purchase Price is the
                                amount you paid for the product. You can also
                                modify this later.
                              </small>
                              <ErrorMessage name="price" component={ErrorMsg} />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="image"
                              className="col-sm-3 col-form-label"
                            >
                              Product Image
                            </label>
                            <div className="col-sm-9">
                              {cameraImage || formikProps.values.image ? (
                                <ImagePreview
                                  cameraImage={cameraImage}
                                  fileImage={formikProps.values.image}
                                  removeImage={() => {
                                    setCameraImage("");
                                    formikProps.setFieldValue("image", null);
                                  }}
                                />
                              ) : (
                                <div className="row">
                                  <div className="col-lg-5">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="form-control"
                                      placeholder="Choose from gallery"
                                      name="image"
                                      id="image"
                                      onChange={(event) => {
                                        formikProps.setFieldValue(
                                          "image",
                                          event.currentTarget.files[0]
                                        );
                                      }}
                                    />
                                  </div>
                                  {/* <div className="text-center col-lg-2">
                                    {" "}
                                    Or
                                  </div>
                                  <div className="text-center col-lg-5">
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-block"
                                      onClick={() => setCamera(true)}
                                    >
                                      Open Camera{" "}
                                      <i className="fas fa-camera"></i>
                                    </button>
                                  </div>{" "} */}
                                </div>
                              )}
                              <div className="text-center">
                                <ErrorMsg>{imageError}</ErrorMsg>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="modal-footer justify-content-between">
                          <button type="reset" className="btn btn-default">
                            Cancel
                          </button>

                          {loader ? (
                            <Loader />
                          ) : (
                            <button type="submit" className="btn btn-primary">
                              {" "}
                              Add{" "}
                            </button>
                          )}
                        </div>
                      </Form>
                    </React.Fragment>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddProductModal;
