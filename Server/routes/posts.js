const router = require("express").Router();
const postmodel = require("../models/Posts");
const User = require("../models/User");
const Company = require("../models/Companymodel");

router.get("/getallposts", async (req, res) => {
    try {
        const allposts = await postmodel.find({})
            .populate({
                path: "company",
                select: "name logo"
            })
            .populate({
                path: "createdby",
                model: User,
                select: "email displayName image"
            });

        res.json({ success: true, data: allposts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;
