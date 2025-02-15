const companymodel = require("../models/Companymodel");
const router = require("express").Router();

router.get("/getallcomapnies",async(req,res)=>{
   const companies = await companymodel.find({});
   res.json({success : true , data : companies})
})

module.exports = router;