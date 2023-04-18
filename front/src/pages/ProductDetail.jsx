import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../styles/ProductDetailsStyles.css";

export const ProductDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [cart, setCart] = useCart();
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
      <div className="row container product-details">
        <div className="col-md-6">
          <img
            src={`http://localhost:3001/api/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6 product-details-info ">
          <h1 className="text-center">Product Detail</h1>
          <h6 className="text-center mb-5" style={{}}>Category: {product?.category?.name}</h6>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6 style={{ color: "green", fontWeight: "bold" }}>
            Price: {product.price}
          </h6>

          <button
            className="btn btn-dark ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to cart");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      <div className="row container similar-products">
        <h1>Similar Product</h1>
        {similarProduct.length < 1 && (
          <h3 className="text-center text-danger ">
            No Similar Products Found!
          </h3>
        )}
        <div className="d-flex flex-wrap">
          {similarProduct?.map((p) => (
            <div key={p._id} className="card m-2">
              <img
                src={`http://localhost:3001/api/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-us", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
