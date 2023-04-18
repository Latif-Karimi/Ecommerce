import React, { useState } from "react";
import "../Auth/auth.css";
import { Layout } from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  //form function submit
  const hundleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        { name, email, password, phone, address, answer }
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
    <Layout title={"Register"}>
      <div className="form-container" style={{ minHeight: "80vh" }}>
        <form onSubmit={hundleSubmit}>
          <h4 className="title">Register Page! </h4>

          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>

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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter Your Address"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhone"
              placeholder="Enter Your Phone Number"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputPhone"
              placeholder="What is your best friend name?"
              required
            />
          </div>

          <div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <div>
              <Link className="link" to="/login">
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};
