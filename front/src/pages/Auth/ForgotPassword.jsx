import React, { useState } from "react";
import "../Auth/auth.css";
import { Layout } from "../../components/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
 

  const navigate = useNavigate();
 

  //form function submit
  const hundleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/forgot-password",
        { email, newPassword,answer, }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
    }
  };
  return (
    <Layout title={"Reset-Password"}>
      <div className="form-container">
        <form onSubmit={hundleSubmit}>
          <h4 className="title">Reset Password! </h4>

          <div className="row mb-3">
            <div className="col-sm-10">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail"
                placeholder="Enter Your Email"
                required
              />
            </div>
          </div>
          
          <div className="row mb-3">
            <div className="col-sm-10">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="What is your best friend name?"
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-10">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter New Password"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Reset Password!
          </button>
        </form>
      </div>
    </Layout>
  );
};
