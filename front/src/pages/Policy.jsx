import React from "react";
import { Layout } from "../components/Layout/Layout";

export const Policy = () => {
  return (
    <Layout title={"Our privacy policy"}>
      <div className="row contactus">
        <div className="col-md-6 pt-3">
          <img
            src="/images/policy.webp"
            alt="contactus"
            style={{ width: "75%" }}
          />
        </div>
        <div className="col-md-4 pt-5">
          <h1 className="bg-primary p-2  text-white text-center rounded">
            OUR POLICY
          </h1>
          <p className="mt-3"> 1- </p>
          <p className="mt-3"> 2- </p>
          <p className="mt-3"> 3- </p>
          <p className="mt-3"> 4- </p>
          <p className="mt-3"> 5- </p>
          <p className="mt-3"> 6- </p>
        </div>
      </div>
    </Layout>
  );
};
