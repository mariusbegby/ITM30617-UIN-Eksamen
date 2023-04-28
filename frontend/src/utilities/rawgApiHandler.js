import { apiKey } from '../apiKey';

export const fetchGameInfo = async (gameSlugOrId) => {
    const response = await fetch(
        'https://rawg.io/api/games/' + gameSlugOrId + '?key=' + apiKey
    );
    const data = await response.json();
    return data;
};

export const fetchSteamUrlForGame = async (gameSlugOrId) => {
    const response = await fetch(
        'https://rawg.io/api/games/' + gameSlugOrId + '/stores?key=' + apiKey
    );
    const data = await response.json();
    const steamStoreObject = data.results.find((store) => store.store_id === 1);
    const steamUrl = steamStoreObject.url;
    return steamUrl ? steamUrl : null;
};
