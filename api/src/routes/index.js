const {Router} = require("express");
const router = Router();
// Importar todos los routers;
const videogames = require("./videogames");
const videogame = require("./videogame");
const genres = require("./genres");
const platforms = require("./platforms");

// Configurar los routers
router.use(videogames);
router.use(videogame);
router.use(genres);
router.use(platforms);


module.exports = router;