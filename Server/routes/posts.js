const router = require("express").Router();
const postmodel = require("../models/Posts")



router.get("/getallposts",async(req,res)=>{
    const allposts = await postmodel.find({});
    res.json({success : true , data : allposts})
 })
 
 module.exports = router;