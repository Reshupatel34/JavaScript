import express from 'express';
import path from 'path';
import { fileURLToPath } from "url";import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import connectDb from './config/Db.js'; 
import userRoute from './Routes/userRoute.js';
import productRoute from './Routes/productRoute.js';
import ownerRoute from './Routes/ownerRoute.js';


const app = express();
connectDb();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());


app.get('/',(req ,res)=>{
    res.send("WELCOME");
   console.log("WELCOME")
});


// routes for owner
app.use('/api/owner',ownerRoute);

// routes for user
app.use('/api/user',userRoute);

// routes for product
app.use('/api/product',productRoute);




app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});