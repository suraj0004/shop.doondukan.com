import React, { useState, useEffect } from "react";
import Layout from "../../layouts/RetailLayout";
import { Accordion, Card, Button } from "react-bootstrap";
import axios from "axios";
import auth from "../../services/AuthService";
import UrlService from "../../services/UrlService";
import { ToastContainer, toast } from "react-toastify";
import PageLoader from "../../components/PageLoader";

const Catalog = (props) => {
  const [loader, setLoader] = useState(false);
  const [activeKey, setActiveKey] = useState("0");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoader(true);
    axios
      .get(UrlService.getProductCatalogue(), {
        headers: auth.apiHeader(),
      })
      .then((response) => {
        if (response.data.success) {
          setCategories(response.data.data);
          let category_ids = [];
          let product_ids = [];
          response.data.data.forEach((category) => {
            category_ids.push(category.id);
            category.products.forEach((product) => {
              product_ids.push(product.id);
            });
          });
          setSelectedProducts(product_ids);
          setSelectedCategories(category_ids);
          // toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((err) => {
        toast.error("opps something went wrong");
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  const checkCategory = (id) => {
    let category = categories.find((category) => category.id === id);
    let product_ids = category.products.map((product) => product.id);

    if (selectedCategories.includes(id)) {
      setSelectedCategories(
        selectedCategories.filter((product_id) => product_id !== id)
      );
      setSelectedProducts(
        selectedProducts.filter(
          (product_id) => !product_ids.includes(product_id)
        )
      );
    } else {
      setSelectedCategories([...selectedCategories, id]);
      setSelectedProducts([...selectedProducts, ...product_ids]);
    }
  };
  const checkProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(
        selectedProducts.filter((product_id) => product_id !== id)
      );
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const importProduct = () => {
    if (!selectedProducts.length) {
      alert("Please select a product");
      return;
    }
    setLoader(true);
    axios
      .post(
        UrlService.addProductFromCatalogue(),
        {
          product_ids: selectedProducts,
        },
        {
          headers: auth.apiHeader(),
        }
      )
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setTimeout(() => {
            props.history.push("/stockList");
          }, 1000);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("opps something went wrong");
      }).finally(() => {
        setLoader(false);
      });
  };
  return (
    <Layout pathname={props.location.pathname} page="Catalogue Builder | Bulk Purchase">
      {loader ? (
        <PageLoader error=""/>
      ) : (
        <div className="container">
          <div className="">
            <Accordion onSelect={(key) => setActiveKey(key)}>
              {categories.map((category, index) => {
                return (
                  <Card key={index.toString()}>
                    <Card.Header>
                      <div className="row">
                        <div className="col-8 text-left">
                          <Accordion.Toggle
                            as={Button}
                            variant="button"
                            eventKey={index.toString()}
                          >
                            {index.toString() === activeKey ? (
                              <i className="fas fa-chevron-circle-down"></i>
                            ) : (
                              <i className="fas fa-chevron-circle-right"></i>
                            )}{" "}
                            {category.name}
                          </Accordion.Toggle>
                        </div>
                        <div className="col-4 text-right">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => checkCategory(category.id)}
                          />
                        </div>
                      </div>
                    </Card.Header>
                    <Accordion.Collapse eventKey={index.toString()}>
                      <Card.Body className="p-1">
                        {category.products.map((product, index) => {
                          return (
                            <div className="row pt-3">
                              <div className="col-md-2"></div>
                              <div className="col-md-10 row">
                                <div className="col-md-8 row">
                                  <div className="col-5">
                                    <img
                                      src={product.image}
                                      className="img-fluid"
                                      alt={product.name}
                                    />
                                  </div>

                                  <div className="col-7 pt-3">
                                    <p>{product.name}</p>
                                    <p>
                                      ₹{product.price} /{product.weight}{" "}
                                      {product.weight_type}
                                    </p>
                                  </div>
                                </div>
                                <div className="col-md-4 text-right">
                                  <input
                                    type="checkbox"
                                    checked={selectedProducts.includes(
                                      product.id
                                    )}
                                    onChange={() => checkProduct(product.id)}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                );
              })}
            </Accordion>
          </div>
          <div className="pb-5 pt-3">
            <button
              className="btn btn-success btn-block btn-large font-weight-bold"
              onClick={importProduct}
            >
              Bulk Import to Purchase
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </Layout>
  );
};

export default Catalog;
