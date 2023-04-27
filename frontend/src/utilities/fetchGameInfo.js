import { apiKey } from '../apiKey';

export const fetchGameInfo = async (gameSlugOrId) => {
    const response = await fetch(
        'https://rawg.io/api/games/' + gameSlugOrId + '?key=' + apiKey
    );
    const data = await response.json();
    return data;
};
