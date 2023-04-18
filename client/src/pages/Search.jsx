import React from "react";
import { Layout } from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  return (
    <Layout title={"Search Results"}>
      <div className="container home-page">
        <div>
          <h1 className="text-center">Search Result</h1>
          <h5>
            {values?.results.lenght < 1
              ? "No Products Found"
              : `Found ${values?.results.lenght}`}
          </h5>
          <div className="d-flex flex-wrap mt-4">
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
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1 more"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-outline-success ms-1 cart"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
