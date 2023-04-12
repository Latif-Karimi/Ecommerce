import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

export const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [similarProduct, setSimilarProduct] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get Similar  product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/product/similar-product/${pid}/${cid}`
      );
      setSimilarProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`http://localhost:3001/api/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Detail</h1>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: {product.price}</h6>
          <h6>Category: {product?.category?.name}</h6>
        </div>
      </div>

      <div className="row container similar-product">
        <h1>Similar Product</h1>
        {similarProduct.length < 1 && (
          <p className="text-center">No Similar Products Found</p>
        )}
        <div className="d-flex flex-wrap">
          {similarProduct?.map((p) => (
            <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`http://localhost:3001/api/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text">$ {p.price}</p>
                <button className="btn btn-secondary ms-1">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
