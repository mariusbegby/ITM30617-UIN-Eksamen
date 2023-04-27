import { apiKey } from '../apiKey';

export const fetchGameInfo = async (gameSlug) => {
    const response = await fetch(
        'https://rawg.io/api/games/' + gameSlug + '?key=' + apiKey
    );
    const data = await response.json();
    return data;
};
