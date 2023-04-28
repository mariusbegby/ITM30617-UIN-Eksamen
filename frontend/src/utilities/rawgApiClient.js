import { apiKey } from '../apiKey';

const apiBaseURL = 'https://rawg.io/api';

// General method for sending request to the RAWG.io API
const fetchData = async (endpoint) => {
    const response = await fetch(endpoint + `?key=${apiKey}`);
    const data = await response.json();
    return data;
};

// Fetch information about a single game from the RAWG.io API using game slug or ID
export const fetchGameInfo = async (gameSlugOrId) => {
    const endpoint = `${apiBaseURL}/games/${gameSlugOrId}`;
    return fetchData(endpoint);
};

// Fetch a list of stores that list game with given slug or ID and return Steam store URL if exists
export const fetchSteamUrlForGame = async (gameSlugOrId) => {
    const endpoint = `${apiBaseURL}/games/${gameSlugOrId}/stores`;
    const data = await fetchData(endpoint);
    const steamStoreObject = data.results.find((store) => store.store_id === 1);
    const steamUrl = steamStoreObject.url;
    return steamUrl ? steamUrl : null;
};
