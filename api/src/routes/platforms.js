// Dependencies
const axios = require("axios");
const {Router} = require("express");
const router = Router();
// Files
const {getApiPlatforms} = require("../controllers/getApi");


router.get("/platforms", async (req, res) => {
    const platforms = await getApiPlatforms();
    
    try
    {
        if(platforms.length)
        {
            res.send(platforms);
        }
        else
        {
            res.status(404).send("Sorry! We can not load the platforms. Try again later.");
        };
    }
    catch(error)
    {
        console.log(error);
    };
});


module.exports = router;