const {Router} = require("express")
const User = require("../models/user")

const router = Router();

router.get("/signin",(req,res)=>{
    return res.render("signin")
})

router.get("/signup",(req,res)=>{
    return res.render("signup")
})

router.post("/signup",async (req,res)=>{
    const {fullName,email,password} = req.body;
    try {
        await User.create({
            fullName,
            email,
            password
        });
        return res.redirect("/user/signin")
    } catch (error) {
        if (error.code === 11000) {
            return res.render("signup",{
                error:"Email already exists. Please try with a different email."
            });
        } else {
            return res.render("signup",{
                error:"Internal Server Error. Please try again later."
            });
        }
    }
})

router.post("/signin",async (req,res)=>{
    const {email,password} = req.body;
    try {
        const token =await User.matchPasswordAndGenerateToken(email,password)
        return res.cookie("token",token).redirect("/")
    } catch (error) {
        return res.render("signin",{
            error:"Incorrect email or password"
        });
    }
})

router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/")
})

module.exports = router;