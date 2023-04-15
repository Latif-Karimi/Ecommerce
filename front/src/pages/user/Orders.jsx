import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import { UserMenu } from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment"

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  //Get User Orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/api/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your-Orders"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Your All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow" key={o._id}>
                  <table className="table">
                  <thead className="bg-black text-white">
                    <tr>
                      <td scope="col">#</td>
                      <td scope="col">Status</td>
                      <td scope="col">Buyer</td>
                      <td scope="col">Orders</td>
                      <td scope="col">Payment</td>
                      <td scope="col">Quantity</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{i + 1}</th>
                      <th>{o?.status}</th>
                      <th>{o?.buyer?.name}</th>
                      <th>{moment(o?.createAt).fromNow()}</th>
                      <th>{o?.payment.success ? "Success" : "Failed"}</th>
                      <th>{o?.products?.length}</th>
                    </tr>
                  </tbody>
                  </table>
                  <div className="container">
                  {o.products?.map((p) => (
                <div className="row mb-2 p-3 card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`http://localhost:3001/api/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width={"100px"}
                      height={"100px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <h5>{p.name}</h5>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price: {p.price}</p>
                    
                  </div>
                </div>
              ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};
