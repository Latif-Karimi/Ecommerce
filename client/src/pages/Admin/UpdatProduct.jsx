import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Layout } from "../../components/Layout/Layout";
import { AdminMenu } from "../../components/Layout/AdminMenu";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

export const UpdatProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //Get Single Product
  const getSingProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/product/get-product/${params.slug}`
      );
      setCategory(data.product.category._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setName(data.product.name);
      setId(data.product._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingProduct();
    //eslint-disable-next-line
  }, []);

  //Get All Category
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/api/category/all-category"
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in geting Categories");
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);

  //Update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const producData = new FormData();
      producData.append("name", name);
      producData.append("description", description);
      producData.append("price", price);
      producData.append("quantity", quantity);
      photo && producData.append("photo", photo);
      producData.append("category", category);
      producData.append('shipping', shipping)

      const { data } = await axios.put(
        `http://localhost:3001/api/product/update-product/${id}`,
        producData
      );
      if (data?.success) {
        toast.success("Product Updated Successfully!");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Error while Updating Product!");
        
      }
    } catch (error) {
      console.log(error);
      toast.error("Error on Updating product");
    }
  };

  //Delete Product
  const handleDelete = async ()=>{
    try {
        let answer = window.prompt('Are you sure to delete this product? Yes / No')
        if(!answer) return
        const {data} = await axios.delete(`http://localhost:3001/api/product/delete-product/${id}`)
        toast.success("Product Deleted Successfully!")
        navigate('/dashboard/admin/products')
    } catch (error) {
        console.log(error)
        toast.error("Error while Deleting Product")
        
    }
  }
  return (
    <Layout title={"Update-Producet"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3"> 
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select or search a Category"
                size="larg"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`http://localhost:3001/api/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text-area"
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Enter the price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter the Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Enter the shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Update Product
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
