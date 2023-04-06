import React, { useEffect, useState } from "react";
import { AdminMenu } from "../../components/Layout/AdminMenu";
import {Layout} from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

export const Products = () => {
  const [products, setProducts] = useState([]);

  //Get All products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/api/product/get-product"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Error in geting all products");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout title="All products">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9"></div>
        <h1 className="text-center"> All Products List</h1>
        <div className="d-flex">
        {products?.map((p) => (
          <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}
          className="product-link"
          >
          <div className="card m-2" style={{ width: "18rem" }} >
            <img src={`http://localhost:3001/api/product/product-photo/${p._id}`} 
            className="card-img-top" alt={p.name} />
            <div className="card-body">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">{p.description}</p>
            </div>
          </div>
          </Link>
        ))}
        
        </div>
      </div>
    </Layout>
  );
};
