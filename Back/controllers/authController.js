import userModel from "../models/userModel.js"
import { comparePassword, hashPassword } from "../utils/authUtils.js"
import JWT from "jsonwebtoken"

export const registerControler = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body
        //validation
        if (!name) {
            return res.send({ error: "Name is Required" })
        }
        if (!email) {
            return res.send({ error: "Email is Required" })
        }
        if (!password) {
            return res.send({ error: "password is Required" })
        }
        if (!address) {
            return res.send({ error: "Address is Required" })
        }
        if (!phone) {
            return res.send({ error: "Phone number is Required" })
        }

        const exitingUser = await userModel.findOne({ email })
        //existing user
        if (exitingUser) {
            return res.status(200).send({
                success: true,
                message: "User already exist please login"
            })
        }
        //register user
        const hashedPassword = await hashPassword(password)

        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword }).save()
        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })
    }
}

//Post Login
export const loginControler = async (req,res)=>{
    try {
        const {email,password} = req.body
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid Email or Password"
            })
        }
        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registered"
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"

            })
        }
        //WebToken
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:"5d",
        })
        res.status(200).send({
            success:true,
            message: "Login Successfull",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
            },
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Login Error",
            error
        })
        
    }

}
//test route
export const testController = (req,res)=>{
   res.send("protected route")
}