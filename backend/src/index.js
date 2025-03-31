
import express from "express"
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
const app =express();
app.use(express.json());  // To extract the Json data out of body
dotenv.config()
const PORT = process.env.PORT;

app.use('/api/auth',authRoutes)

app.listen(PORT,()=>{
    console.log("Server running on port : "+ PORT);
    connectDB()
})