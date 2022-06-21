// Files
const {getApi} = require("./getApi");
const {getDb} = require("./getDb");


async function getAll()
{
    try
    {
        const api = await getApi();
        const db = await getDb();
        // const dbGenres = db[0].dataValues.Genres.map(e => e.name);
        // console.log(db.concat(dbGenres));
        const all = api.concat(db).sort((a, b) => {
            if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 0;
        });
        return all;
    }
    catch(error)
    {
        console.log(error);
    };
};


module.exports =
{
    getAll,
};