const express = require("express")
const connectDB = require("./database")
const app  = express()
const cookieParser = require("cookie-parser")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()


const PORT = process.env.PORT || 5000;
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(cors({
    origin : 'http://localhost:5000'
}))

const authRouter = require("./auth")
app.use("/", authRouter)


connectDB()
.then(() => {
    console.log("success");
    app.listen(PORT,()=> {
        console.log(`server listening on port ${PORT}`);       
    })
    
}).catch((err) => {
    console.error("error",err);
   
})