//* packages
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios")
const port  = process.env.PORT || 3500;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
//* CORS
app.use(cors({
    origin: ' http://localhost:5173', // Change this to match your frontend
    credentials: true, // Allow cookies/authentication
}));

app.use((req, res, next) => {
    const allowedOrigins = [
        'https://stockmarket-frontend-ebon.vercel.app',
        'http://localhost:5173',
        "http://localhost:5174",
        'https://stockmarket-backend.vercel.app'
    ];
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '86400');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

//* values
let Authintacated = false
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

//* middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

//* database
//mongodb://localhost:27017/stockmarket
mongoose.connect('mongodb://localhost:27017/stockmarket', {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 5000,
    connectTimeoutMS: 10000,
    maxPoolSize: 10,
    minPoolSize: 5,
    family: 4
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));


const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    Password: { type: String, required: true },
    token: { type: String }
});
const User = mongoose.model('User', userSchema);


//* Routes
app.get("/",(req,res)=>{
    res.json({message:"welcome to the stock market API 👍👍"});
})
//* signup 
app.post("/signup", async(req,res)=>{
    try {
        console.log("Starting signup process")
        const {Username,name,Email, Password} = req.body
        console.log("Got user data:", {Username,name,Email})

        const existingUser = await User.findOne({ email: Email });

        if (existingUser) {
            return res.status(409).json({
                message: "This email is already registered",
                AUTH: false
            });
        }
        console.log("Checking if user exists")
        const token = jwt.sign(Email,JWT_SECRET)
        const HasashPassword = await bcrypt.hash(Password,10)

        const newUser = new User({
            username: Username,
            name: name,
            email: Email,
            Password: HasashPassword,
            token: token
        })
        console.log("About to save user")
        
        await newUser.save()
        console.log("User saved successfully")

        Authintacated = true
        console.log("Authentication set to true")
        res.json({token:newUser.token,AUTH:Authintacated}) 
    } catch(error) {
        console.log("Error details:", error)
        Authintacated = false
        res.status(400).send("failed to signup please try agian")
    }
})

//* login
app.post("/login", async(req,res)=>{
    try {
        const {Email,Password} = await req.body
        const user = await User.findOne({email:Email})
        const isValidPassword = await bcrypt.compare(Password, user.Password)
        
        if (user && isValidPassword) {
            Authintacated = true
            res.json({ 
                token: user.token, 
                message: "Login successful",
                AUTH: Authintacated
            });
        } else {
            Authintacated = false
            res.status(401).json({ 
                message: "Invalid credentials please enter password and email correctly",
                AUTH: Authintacated 
            });
        }
    } catch(error) {
        Authintacated = false
        res.status(400).json({ 
            message: "Invalid credentials please enter password and email correctly",
            error: error.message,
            AUTH: Authintacated
        });
    }
})

//* isAuth
app.get("/isAUTH", async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Received token:', token);

    if (!token) {
        console.log("No token provided");
        return res.json({ AUTH: false });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // Use decoded directly since it contains the email string
        const user = await User.findOne({ email: decoded });
        
        console.log('Decoded token:', decoded);
        console.log('User search result:', user);

        if (user) {
            console.log('User found:', user);
            res.json({ AUTH: true });
        } else {
            console.log('User not found');
            res.json({ AUTH: false });
        }
    } catch (error) {
        console.log('Error:', error);
        res.json({ AUTH: false });
    }
});

app.get("/Stock", async (req, res) => {
    try {
        // const stocksPath = path.join(__dirname, 'data', 'Stocks.json');
        console.log('Stock endpoint called');
        // console.log('Current directory:', __dirname);
        // const data = fs.readFileSync(stocksPath, "utf-8");
        const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/AAPL,MSFT,GOOGL,AMZN,TSLA,FB,NFLX,NVDA,AMD,INTC,BA,DIS,UBER,LYFT,PYPL,SQ,SHOP,TWTR,ORCL,IBM,SPOT,PLTR,CRM,CSCO,ADBE?apikey=yEctLteSSCQR6nh6VsjKkkXsA7K93dkl`);
        const stocks = await response.json();
        res.json(stocks);
    } catch (error) {
        console.log('Stock endpoint error:', error);
        // Return a structured error response
        res.status(500).json({
            error: true,
            message: error.message,
            path: __dirname
        });
    }
});

// app.get('/health', (req, res) => {
//     res.json({
//         status: 'ok',
//         timestamp: new Date().toISOString(),
//         cors: {
//             origin: req.headers.origin,
//             method: req.method
//         }
//     });
// });


app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})
