// Files
const {Videogame, Genre} = require("../db");
const {getApiGenres} = require("./getApi");


async function getDb()
{
    try
    {
        return await Videogame.findAll({
            include:
            {
                model: Genre,
                attributes: ["name"],
                through:
                {
                    attributes: [],
                },
            },
        });
    }
    catch(error)
    {
        console.log(error);
    };
};


async function getDbByName(name)
{
    try
    {
        return await Videogame.findOne({
            where:
            {
                name: name.toLowerCase(),
            },
            include:
            {
                model: Genre,
                attributes: ["name"],
                through:
                {
                    attributes: [],
                },
            },
        });
    }
    catch(error)
    {
        console.log(error);
    };
};


async function getDbGenres()
{
    try
    {
        const apiGenres = await getApiGenres();
        
        // Cargar a la base de datos
        // apiGenres.forEach(async e => {
        //     await Genre.findOrCreate({where: {name: e}});
        // });
        
        const gernes = await Genre.findAll();

        return gernes.map(e => e.name);
    }
    catch(error)
    {
        console.log(error);
    };
};


module.exports =
{
    getDb,
    getDbByName,
    getDbGenres,
};