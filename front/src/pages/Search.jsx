import React from "react";
import {Layout} from "./../components/Layout/Layout";
import { useSearch } from "../context/search";

export const Search = () => {
    const [values,setValues] = useSearch()
  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Result</h1>
          <h5>
            {values?.results.lenght < 1
              ? "No Products Found"
              : `Found ${values?.results.lenght}`}
          </h5>
          <div className="d-flex flex-wrap">
            {values?.results.map((p) => (
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
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-secondary ms-1">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};