/* Import RAWG.io API authentication key */
import { apiKey } from '../rawgApiKey';

// Base URL for all requests to the RAWG.io API
const apiBaseURL = 'https://rawg.io/api';

// General method for sending request to the RAWG.io API
const fetchData = async (endpoint, parameters) => {
    const response = await fetch(
        `${apiBaseURL}${endpoint}?key=${apiKey}${parameters ? parameters : ''}`
    );
    const data = await response.json();
    return data;
};

// Fetch information about a single game from the RAWG.io API using game slug or ID
export const getGameInfo = async (gameSlugOrId) => {
    const endpoint = `/games/${gameSlugOrId}`;
    return fetchData(endpoint);
};

// Fetch information about multiple games from the RAWG.io API using list of game slug or ID, and return array of game objects
export const getMultipleGameInfo = async (listOfGameSlugOrId) => {
    const listOfGameInfo = await Promise.all(
        listOfGameSlugOrId.map(async (id) => {
            let data = await getGameInfo(id);
            return data;
        })
    );
    return listOfGameInfo || [];
};

// Fetch a list of stores that list game with given slug or ID and return Steam store URL if exists
export const getSteamUrlForGame = async (gameSlugOrId) => {
    const endpoint = `/games/${gameSlugOrId}/stores`;
    const data = await fetchData(endpoint);
    const steamStoreObject = data.results.find((store) => store.store_id === 1);
    const steamUrl = steamStoreObject.url;
    return steamUrl ? steamUrl : null;
};

// Fetch a list of recently updated games with Steam as store from the RAWG.io API, limited by maxItems parameter
export const getRecentSteamGames = async (maxItems) => {
    const endpoint = `/games`;
    const parameters = `&stores=1&ordering=-updated&page_size=${maxItems}`;
    const response = await fetchData(endpoint, parameters);
    return response.results;
};
