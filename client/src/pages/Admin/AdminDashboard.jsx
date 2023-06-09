import React from "react";
import { Layout } from "../../components/Layout/Layout";
import { AdminMenu } from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

export const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Admin-Dashboard"}>
      <div className="container-fluid admin-dash">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-70 p-3">
              <h3>Name: {auth?.user?.name}</h3>
              <h3>Email: {auth?.user?.email}</h3>
              <h3>Phone: {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
