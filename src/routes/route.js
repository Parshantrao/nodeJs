const express=require("express");
const pythonScript = require("../controller/pythonController");
const router=express.Router()


router.get("/",pythonScript)


module.exports= router