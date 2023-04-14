import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const CategoryProduct = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [products,setProducts] = useState([])
const [category,setCategory] = useState ([])

useEffect(()=>{
  if(params?.slug) getProductByCategory();
},[params?.slug])
  const getProductByCategory = async ()=>{
    try {
      const {data} = await axios.get(`http://localhost:3001/api/product/product-category/${params.slug}`)
      setProducts(data?.products)
      setCategory(data?.category)
    } catch (error) {
      console.log(error)
      
    }
  }
  return (
    <Layout>
      <div className="container">
        <h3 className="text-center"> {category?.name} - Category </h3>
        <h3 className="text-center">{products?.length}</h3>
        <div className="row">
        <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`http://localhost:3001/api/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">$ {p.price}</p>
                  <button className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                  <button className="btn btn-secondary ms-1">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div> */}
        </div>
      </div>
    </Layout>
  );
};
