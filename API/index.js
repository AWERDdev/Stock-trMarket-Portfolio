const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios")
const port  = process.env.PORT || 3500;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

//** cors */
app.use(cors({
    origin: ['https://bin2dec-frontend.vercel.app', 'http://localhost:5173', 'https://bin2dec-backend.vercel.app'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
    maxAge: 86400
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins for testing
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


//* middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//* Routes
app.get("/",(req,res)=>{
    res.json({message:"welcome to the stock market API 👍👍"});
})


app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})