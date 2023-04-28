import { apiKey } from '../apiKey';

const apiBaseURL = 'https://rawg.io/api';

const fetchData = async (endpoint) => {
    const response = await fetch(endpoint + `?key=${apiKey}`);
    const data = await response.json();
    return data;
};

export const fetchGameInfo = async (gameSlugOrId) => {
    const endpoint = `${apiBaseURL}/games/${gameSlugOrId}`;
    return fetchData(endpoint);
};

export const fetchSteamUrlForGame = async (gameSlugOrId) => {
    const endpoint = `${apiBaseURL}/games/${gameSlugOrId}/stores`;
    const data = await fetchData(endpoint);
    const steamStoreObject = data.results.find((store) => store.store_id === 1);
    const steamUrl = steamStoreObject.url;
    return steamUrl ? steamUrl : null;
};
