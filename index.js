const express=require("express")
const {connection}=require("./db")
const {blogRoute}=require('./routes/blogRoute')
const {userRoute}=require("./routes/userRoute")
const {authenticate}=require("./middleware/auth")
const app=express()
require("dotenv").config()

const cors=require("cors")
app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
    res.send("This server is basically for clients!");
});

app.use("/api",userRoute) 
app.use("/api/blogs",authenticate,blogRoute)

  
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log(`server is running at ${process.env.port}`)
    } catch (error) {
        console.log(error)
     }
    
})