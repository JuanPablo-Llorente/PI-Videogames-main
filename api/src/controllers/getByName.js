// Files
const {getApiByName} = require("./getApi");
const {getDbByName} = require("./getDb");


async function getByName(name)
{
    try
    {
        const api = await getApiByName(name);
        const db = await getDbByName(name);
        
        if(db === null || db === undefined)
        {
            return api.sort((a, b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
            });
        }
        else
        {
            const all = api.concat(db).sort((a, b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
            });
            return all;
        };
    }
    catch(error)
    {
        console.log(error);
    };
};


module.exports =
{
    getByName,
};