// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {getAll} = require("../controllers/getAll");
const {getByName} = require("../controllers/getByName");


router.get("/videogames", async (req, res) => {
    const {name} = req.query;
    const videogames = await getAll();
    
    try
    {
        if(name)
        {
            const foundVideogame = await getByName(name);
            
            if(foundVideogame)
            {
                res.send(foundVideogame);
            }
            else
            {
                res.status(404).send("Sorry! We could not find the videogame. Check if it is well written.");
            };
        }
        else
        {
            if(videogames.length)
            {
                res.send(videogames);
            }
            else
            {
                res.status(404).send("Sorry! We can not load videogames. Try again later.");
            };
        };
    }
    catch(error)
    {
        console.log(error);
    };
});


module.exports = router;