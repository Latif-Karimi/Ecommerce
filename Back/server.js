import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import cors from "cors"

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
app.use(morgan('dev'));

//rest API
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the E-commerce App</h1>');
});

//routes
app.use('/api/auth', authRoute);

app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
