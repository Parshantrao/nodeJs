const express=require("express");
const pythonScript = require("../controller/pythonController");
const router=express.Router()

router.get("/",(req,res)=>{
    res.send("running")
})
router.get("/read",pythonScript)


module.exports= router