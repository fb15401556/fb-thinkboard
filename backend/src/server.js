import express from "express"
import notesRoutes from "./routes/notesRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middlewares/rateLimiter.js";
import cors from "cors"
import path from "path"
dotenv.config();

const __dirname = path.resolve()

// const express = require("express");
const app=express();

if(process.env.NODE_ENV !== "production"){
    app.use(cors({
    origin:"http://localhost:5173"
}));
}
app.use(express.json());
app.use(rateLimiter);





app.use("/api/notes",notesRoutes);
app.use("/api/products",productRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
})
}
const PORT = process.env.PORT || 5001;




connectDB().then(()=>{
    
    app.listen(PORT,()=>{
        console.log("Server started on PORT: http://localhost:",PORT,"/");
    });
});