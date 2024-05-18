// Importing necessary libraries
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// // Load environment variables
// dotenv.config();

// // Creating the Express app
// export const app = express();

// // Middleware setup
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


//Routes

// Importing necessary libraries
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoute from '../routes/userRoute';
import cookieParser from 'cookie-parser';
import errorHandler from '../../usecaseLayer/handler/errorHandler';
// Load environment variables
dotenv.config();
console.log('app.ts')

// Creating the Express app
export const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_SERVER, credentials: true }));


//Routes 

app.use('/api/user',userRoute)

app.use(errorHandler)  