import React, { useState } from "react";
import "../pages/auth.css"
import { Layout } from "../components/Layout";  
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();


  //form function submit
  const hundleSubmit = async (e)=>{
    e.preventDefault()
   try {
    const response = await axios.post(
      "http://localhost:3001/api/auth/register",
      {name,email,password,phone,address}
    );
    if(response.data.success){
      toast.success(response.data.message)
      navigate('/login');
    }else{
      toast.error(response.data.message)
    }
   } catch (error) {
    console.log(error)
    toast.error("Somthing went wrong")
    
   }

  }
  return (
    <Layout title={"Register"}>
      <div className="form-container">
        <form onSubmit={hundleSubmit}>
        <h4 className="title">Register Page! </h4>
          <div className="row mb-3">
            
            <div className="col-sm-10">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id="exampleInputName"
                placeholder="Enter YOur Name"
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            
            <div className="col-sm-10">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail"
                placeholder="Enter YOur Email"
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            
            <div className="col-sm-10">
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
          </div>
          <div className="row mb-3">
            
            <div className="col-sm-10">
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
          </div>
          <div className="row mb-3">
            
            <div className="col-sm-10">
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                id="exampleInputPhone"
                placeholder="Enter Your Phone Number"
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};