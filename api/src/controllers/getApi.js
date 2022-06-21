// Dependencies
require("dotenv").config();
const axios = require("axios");
// Files
const {API_KEY} = process.env;

const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
const genreURL = `https://api.rawg.io/api/genres?key=${API_KEY}`;


async function getApi()
{
    try
    {
        const apiAll = [];
        
        for(let i = 1; i <= 6; i++)
        {
            (await axios(`${URL}&page=${i}`)).data.results.map(async e => {
                const descriptionSearch = await getApiById(e.id);
                const data =
                {
                    id: e.id,
                    name: e.name,
                    description: descriptionSearch ? descriptionSearch : null,
                    Genres: e.genres.map(g => g.name).join(", "),
                    releaseDate: e.released,
                    rating: e.rating,
                    platforms: e.platforms.map(p => p.platform.name).join(", "),
                    image: e.background_image,
                };
                apiAll.push(data);
            });
        };
        return apiAll;
    }
    catch(error)
    {
        console.log(error);
    };
};


async function getApiByName(name)
{
    try
    {
        const apiSearch = [];
        
        // For porque sino no guarda data en apiSearch.
        for(let i = 0; i <= 1; i++)
        {
            (await axios(`${URL}&search=${name}`)).data.results.map(async e => {
                const descriptionSearch = await getApiById(e.id);
                const data =
                {
                    id: e.id,
                    name: e.name,
                    description: descriptionSearch ? descriptionSearch : null,
                    Genres: e.genres.map(g => g.name).join(", "),
                    releaseDate: e.released,
                    rating: e.rating,
                    platforms: e.platforms.map(p => p.platform.name).join(", "),
                    image: e.background_image,
                };
                apiSearch.push(data);
            });
        }
        return apiSearch;
    }
    catch(error)
    {
        console.log(error);
    };
};


// Para guardar las descripciones
async function getApiById(id)
{
    const idURL = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;7
    
    try
    {
        const data = (await axios(idURL)).data;
        const apiSearch = data.description_raw;
        
        return apiSearch;
    }
    catch(error)
    {
        console.log(error);
    };
};


async function getApiGenres()
{
    try
    {
        const apiGenres = (await axios(genreURL)).data.results.map(e => e.name);
        const genres = apiGenres.sort((a, b) => {
            if(a.toLowerCase() > b.toLowerCase()) return 1;
            if(a.toLowerCase() < b.toLowerCase()) return -1;
            return 0;
        });
        return genres;
    }
    catch(error)
    {
        console.log(error);
    };
};


async function getApiPlatforms()
{
    try
    {
        const apiAllPlatforms = (await axios(URL)).data.results.map(e => e.platforms.map(p => p.platform.name));
        const allPlatforms = [];
        const unsortedPlatforms = [];
        
        apiAllPlatforms.forEach(e => e.forEach(p => allPlatforms.push(p)));
        
        for (let i = 0; i < allPlatforms.length; i++)
        {
            const platform = allPlatforms[i];
            
            if(!unsortedPlatforms.includes(platform))
            {
                unsortedPlatforms.push(platform);
            };
        };
        
        const platforms = unsortedPlatforms.sort((a, b) => {
            if(a.toLowerCase() > b.toLowerCase()) return 1;
            if(a.toLowerCase() < b.toLowerCase()) return -1;
            return 0;
        });
        
        return platforms;
    }
    catch(error)
    {
        console.log(error);
    };
};


module.exports =
{
    getApi,
    getApiByName,
    getApiGenres,
    getApiPlatforms,
};