import React from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Helmet } from "react-helmet";

export const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <main style={{ flex: "1 0 auto" }}>{children}</main>
      <Footer />
    </div>
  );
  
};
Layout.defaultProps = {
  title: "E-commerce",
  description: "MERN stack project",
  keywords: "MongoDB,Express,React,Node,",
  author: "Karimi",
};
