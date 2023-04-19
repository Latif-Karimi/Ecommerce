import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cors from "cors"
import productRoutes from "./routes/productRoute.js"
import bodyParser from'body-parser';

// import path from "path"
// import {fileURLToPath} from 'url';



//configure env
dotenv.config();

//esmodeule fix
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

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

// //rest API
// app.get('/', (req, res) => {
//   res.send('<h1>Welcome to the E-commerce App</h1>');
// });

//routes
app.use('/api/auth', authRoute);
app.use('/api/category', categoryRoutes);
app.use("/api/product",productRoutes )

app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});