require('dotenv').config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser")
const {checkForAuthenticationCookie} = require("./middleware/authentication")
const Blog = require("./models/blog")

const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")

const app = express();
// const PORT = 8000;
const PORT = process.env.PORT;

//-------------------------------------------------------------
// 1. const PORT = process.env.PORT; //for deployment
// 2. connectMongoDb(process.env.MONGO_URL)
//     .then(()=>console.log("MongoDB connected"))
//     .catch(()=>console.log("DB Connection Failed"))
// 3. Change index.js to app.js for AWS
// 4. Create .env file
//       PORT = 3545
//       MONGO_URL=mongodb://127.0.0.1:27017/db_blog
//    Note:for locally use env varivable use pakage npm i dotenv
//-------------------------------------------------------------

//connection
const {connectMongoDb} = require("./connection")
// connectMongoDb("mongodb://127.0.0.1:27017/db_blog")
//     .then(()=>console.log("MongoDB connected"))
//     .catch(()=>console.log("DB Connection Failed"))

connectMongoDb(process.env.MONGO_URL)
    .then(()=>console.log("MongoDB connected"))
    .catch(()=>console.log("DB Connection Failed"))
    
//middle-ware
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.json())
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public")))

app.get("/",async (req,res)=>{
    const allBlogs = await Blog.find({})
    res.render("home",{
        user:req.user,
        blogs:allBlogs,
    });
});

app.use("/user",userRoute)
app.use("/blog",blogRoute)

app.listen(PORT,()=> console.log(`Server started at port : ${PORT}`))