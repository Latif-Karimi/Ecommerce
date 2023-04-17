import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import { UserMenu } from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";


export const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();

  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  //form function submit
  const hundleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:3001/api/auth/profile",
        { name, email, password, phone, address }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let locStorage = localStorage.getItem("auth");
        locStorage = JSON.parse(locStorage);
        locStorage.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(locStorage));
        toast.success("Profile updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
    }
  };
  return (
    <Layout title={"Your-Profile"}>
      <div className="container-fluid mt-5 p-3">
        <div className="row">
          <div className="col-md-3 mt-5">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <form onSubmit={hundleSubmit}>
                <h4 className="title">User Profile! </h4>
                <div className="row mb-3">
                  <div className="col-sm-10 ">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                      id="exampleInputName"
                      placeholder="Enter YOur Name"
                    />
                  </div>
                </div>
                <div className="row mb-1">
                  <div className="col-sm-10">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail"
                      placeholder="Enter Your Email"
                      disabled
                    />
                  </div>
                </div>
                <div className="row mb-1">
                  <div className="col-sm-10">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Enter Your Password"
                    />
                  </div>
                </div>
                <div className="row mb-1">
                  <div className="col-sm-10">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control"
                      id="exampleInputAddress"
                      placeholder="Enter Your Address"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-10">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control"
                      id="exampleInputPhone"
                      placeholder="Enter Your Phone Number"
                    />
                  </div>
                </div>
                <div className="row mb-1">
                  <div>
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
