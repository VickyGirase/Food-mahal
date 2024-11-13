const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("./user")
const cookieParser = require("cookie-parser")
const authRouter = express.Router()

authRouter.use(cookieParser())
 


authRouter.post("/signup" , async(req,res) => {

    try{

        const {firstName,password,emailId} = req.body

        if (!firstName || !password || !emailId) { return res.status(400).send("All fields are required"); }

        const hashPassword = await bcrypt.hash(password,10)

        const user = new User ({
            firstName,
            emailId,
            password : hashPassword,
        })

        await user.save()
        res.send("user added successfully")


    }
    catch(err) {
        res.status(500).send("error",err)
    }
})


authRouter.post("/login", async(req,res) => {
    try {

        const {emailId,password} = req.body

        if (!emailId || !password)
             { return res.status(400).send("Email and password are required"); }

        const user = await User.findOne({emailId : emailId})

        if(!user) {
            res.send("user not found with this email id")
        }

        const passwordValid = await bcrypt.compare(password,user.password)

        if(passwordValid) {
            const token = jwt.sign({_id: user._id }, "vicky@123" , { expiresIn: '1h' })

            res.cookie("token",token)
            res.send("login Successfully")
        }
        else{
            res.send("password not match")
        }

    }
    catch(err) {

        res.send("error",err)

    }
})


authRouter.post("/logout", async(req,res) => {
    res.cookie("token", null , {
        expires: new Date(Date.now())
    })
    res.send("logout successfully")
})

module.exports = authRouter;
