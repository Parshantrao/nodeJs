const express = require("express");
const  route  = require("./routes/route");

const app = express();
app.use(express.json())
app.use("/",route)
app.listen("3000",function(){
    console.log("App is running on port:3000")
})