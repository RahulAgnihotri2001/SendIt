
import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoute from './routes/message.route.js'
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { connectDB } from "./lib/db.js";
const app =express();
app.use(express.json());  // To extract the Json data out of body
app.use(cookieParser());
dotenv.config()
const PORT = process.env.PORT;

app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoute);

app.listen(PORT,()=>{
    console.log("Server running on port : "+ PORT);
    connectDB()
})