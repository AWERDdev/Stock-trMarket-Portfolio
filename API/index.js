//* packages
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios")
const port  = process.env.PORT || 3500;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
//* values
let Authintacated = false
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

//** cors */
app.use(cors({
    origin: ['https://stockMarket-frontend.vercel.app', 'http://localhost:5173', 'https://stockMarket-backend.vercel.app'],
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

//* database
mongoose.connect('mongodb://localhost:27017/stockmarket')
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
    try{
        const userData = await req.body
        const {Username,name,Email, Password} = await req.body
        if(!userData){
            Authintacated = false
            console.log("user isn't Authanticated")
            res.json({AUTH:Authintacated})   
        }else{
            const token = jwt.sign(Email,"KEY")
            const HasashPassword = await bcrypt.hash(Password,10)
            console.log(HasashPassword)
            const newUser = new User ({
                token,
                Username,
                name,
                Email,
                Password:HasashPassword
            })
            await newUser.save();
            Authintacated = true
            console.log("is Authanticated")
            res.json({AUTH:Authintacated})  
        }
    }catch(Error){
        Authintacated = false
        res.status(400).send("failed to signup please try agian")
        console.Error('failed to recive data ')
    }
    
})
//* login
app.post("/login", async(req,res)=>{
    try{
        const {Email,Password} = await req.body
        const user = await User.findOne({email:Email})
        const isValidPassword = await bcrypt.compare(Password, user.Password);
        
        //* valad user
        if (user && isValidPassword) {
            Authintacated = true
            res.json({ token: user.token, message: "Login successful",AUTH:Authintacated});
        }
         else {
            Authintacated = false
            res.status(401).json({ message: "Invalid credentials",AUTH:Authintacated });
        }
    }catch(error){
        Authintacated = false
        res.status(400).send(`failed to login ${error}`)
    }
})

//* logout
app.get("/logout",(req,res)=>{
    Authintacated = false
    res.json({AUTH:Authintacated})
})
//* isAuth
app.get("/isAUTH",(req,res)=>{
    res.json({AUTH:Authintacated})
})


app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})
