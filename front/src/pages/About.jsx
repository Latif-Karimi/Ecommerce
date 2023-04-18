import React from "react";
import { Layout } from "../components/Layout/Layout";

export const About = () => {
  return (
    <Layout title={"About Us"}>
      <div className="row contactus margin-top">
        <div className="col-md-6">
          <img
            src="/images/aboutus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4 ">
          <h1 className="bg-primary p-2  text-white text-center rounded">
            ABOUT US
          </h1>
          <p className="mt-3">
            {" "}
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet
            voluptate dignissimos maiores, eum numquam voluptatem dolorum
            consectetur unde voluptas, aspernatur debitis! Maiores provident
            nesciunt nobis magnam accusamus! Unde, alias aliquid?
          </p>
        </div>
      </div>
    </Layout>
  );
};
