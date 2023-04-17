import React from "react";
import { Layout } from "../components/Layout/Layout";
import { useCategory } from "../hooks/useCategory";
import { Link } from "react-router-dom";

export const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container"style={{ marginTop: "120px" }}>
      <h1 className="text-center" style={{color:"gray",fontFamily: "Playfair Display,serif"}}>All Catigories!</h1>
        <div className="row container">
          {categories.map((c) => (
              <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                <div className="card">
                <Link to={`/category/${c.slug}`} className="btn cat-btn">
                  {c.name}
                </Link>
              </div>
              </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
