import React,{useState,useEffect} from "react";
import { Layout } from "../../components/Layout/Layout";
import { AdminMenu } from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/auth";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useAuth();
  //Get All users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/api/auth/all-users"
      );
      setUsers(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Error in geting all users");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <Layout title={"All-Users"}>
        <div className="container-fluid margin-top ">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>All Users</h1>
          {users?.map((u, i) => {
            return (
              <div className="border shadow" key={u._id}>
                <table className="table">
                  <thead className="bg-black text-white">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Create Date</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Address</th>
                      <th scope="col">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{u?.name}</td>
                      <td>{moment(u?.updatedAt).fromNow()}</td>
                      <td>{u?.phone }</td>
                      <td>{u?.address }</td>
                      <td>{u?.role === 1 ? 'Admin' : 'User'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </Layout>
  );
};
