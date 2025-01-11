const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios")
const port  = process.env.PORT || 3500;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.json({message:"welcome to the stock market API 👍👍"});
})


app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})