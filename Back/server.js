import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cors from "cors"
import productRoutes from "./routes/productRoute.js"

//configure env
dotenv.config();

//database confiq
connectDB();

//port
const PORT = process.env.PORT || 3001;

//rest object
const app = express();

//middelwares
app.use(cors())
app.use(express.json());


// //rest API
// app.get('/', (req, res) => {
//   res.send('<h1>Welcome to the E-commerce App</h1>');
// });

//routes
app.use('/api/auth', authRoute);
app.use('/api/category', categoryRoutes);
app.use("/api/product",productRoutes )

app.listen(PORT, () => {
  // console.log(`Server is Running on Port ${PORT}`);
});
