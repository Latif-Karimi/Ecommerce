import React, { useState } from "react";
import "../Auth/auth.css";
import { Layout } from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

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
        { email, newPassword, answer }
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
      <div className="form-container" style={{ minHeight: "80vh" }}>
        <form onSubmit={hundleSubmit}>
          <h4 className="title">Reset Password! </h4>

          <div className="mb-3">
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
          

            <div className="mb-3">
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
         
            <div className="mb-3">
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
         

          <button type="submit" className="btn btn-primary">
            Reset!
          </button>
          <div className="mb-4">
            <Link className="link" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};
