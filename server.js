import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import authRoute from './Back/routes/authRoute.js';
import categoryRoutes from './Back/routes/categoryRoutes.js';
import cors from "cors"
import productRoutes from "./Back/routes/productRoute.js"
import bodyParser from'body-parser';
import path from "path"


//configure env
dotenv.config();

//database confiq
connectDB();

//port
const PORT = process.env.PORT || 3001;

//rest object
const app = express();

//middelwares
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())
app.use(express.json());
app.use(express.static(path.json(__filename, '../front/build')))


// //rest API
app.use('*',function(req,res){
  res.sendFile(path.json(__dirname,'./client/build/index.html'))
})

//routes
app.use('/api/auth', authRoute);
app.use('/api/category', categoryRoutes);
app.use("/api/product",productRoutes )

app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
