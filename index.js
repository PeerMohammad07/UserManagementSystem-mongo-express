//mongoose
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/user_management_system")

//express
const express = require("express")
let app = express()

//route user
const userRoute = require("./routes/userRoute")
app.use('/',userRoute)

//route admin 
const adminRoute = require("./routes/adminRoute")
app.use('/admin',adminRoute)


//server
const port = 4000;
app.listen(port,()=>{console.log("http://localhost:4000")})

