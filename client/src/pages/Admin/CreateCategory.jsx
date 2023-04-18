import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import { AdminMenu } from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { CategoryForm } from "../../components/Form/CategoryForm";
import { Modal } from "antd";



export const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState("");

  //hundle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/category/create-category",
        {
          name
        }
      );
      if (data?.success) {
        toast.success(`${name} is created Successfully!`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error("Somthing Wrong in input Form");
    }
  };

  //Get All Categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/api/category/all-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in geting Categories");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:3001/api/category/update-category/${selected._id}`,
        { name: updateName }
      );
      if (data.success) {
        toast.success(`updated ${updateName}`);
        setSelected(null);
        setUpdateName("");
        setVisible(false);
        getAllCategory();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Somthing went Wrong!");
    }
  };
  //Delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3001/api/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success('Deleted Category!');
        getAllCategory();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Somthing went Wrong!");
    }
  };
  return (
    <Layout title={"Create-Category"}>
      <div className="container-fluid p-3 margin-top">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Categories!</h1>
            <div className="col-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                     <React.Fragment key={c._id}>
                      <tr>
                        <td >{c.name}</td>
                        <td>
                          <button
                            className="btn btn-warning ms-2"
                            onClick={() => {
                              setVisible(true);
                              setUpdateName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                      </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updateName}
                setValue={setUpdateName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};
