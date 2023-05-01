/*
  Route: /game/:id
*/

/* Import packages */
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

/* Import services */
import { getGameInfo, getSteamUrlForGame } from '../services/rawgApiClient';
import {
    updateFavouriteStatus,
    getSingleGameFromLibraryBySlug
} from '../services/sanityClient';

/* Import contexts */
import { LoginContext } from '../contexts/LoginContext';
import { MyGamesContext } from '../contexts/MyGamesContext';
import { FavouritesContext } from '../contexts/FavouritesContext';

/* Import components */
import GameDetails from '../components/gamepage/GameDetails';

export default function GamePage() {
    const { id } = useParams();
    const { loggedInUser } = useContext(LoginContext);
    const [gameInfo, setGameInfo] = useState(null);
    const [wordcloudData, setWordcloudData] = useState([]);
    const [inLibrary, setInLibrary] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const { favourites, setFavourites } = useContext(FavouritesContext);
    const { myGames } = useContext(MyGamesContext);

    useEffect(() => {
        const inLibraryLocal = !!myGames.find((game) => game.slug === id);

        const retrieveGameInfo = async () => {
            if (inLibraryLocal) {
                getSingleGameFromLibraryBySlug(loggedInUser.email, id).then(
                    async (gameObject) => {
                        const gameInfoFromApi = await getGameInfo(
                            gameObject.gameData.gameApiId
                        );

                        const gameInfoObject = {
                            id: gameObject.gameData.gameApiId,
                            name: gameObject.gameData.gameTitle,
                            slug: gameObject.gameData.gameSlug,
                            genres: gameObject.gameData.gameGenres.map(
                                (genre) => {
                                    return { name: genre.genreRef.genreName };
                                }
                            ),
                            background_image: gameInfoFromApi.background_image,
                            tags: gameInfoFromApi.tags,
                            description_raw: gameInfoFromApi.description_raw,
                            rating: gameInfoFromApi.rating,
                            publishers: gameInfoFromApi.publishers,
                            released: gameInfoFromApi.released,
                            platforms: gameInfoFromApi.platforms,
                            developers: gameInfoFromApi.developers,
                            stores: gameInfoFromApi.stores,
                            hoursPlayed: gameObject.hoursPlayed
                        };
                        setGameInfo(gameInfoObject);
                    }
                );
            } else {
                const result = await getGameInfo(id);
                const steamUrl = await getSteamUrlForGame(id);
                result.steamUrl = steamUrl;
                setGameInfo(result);
            }
        };

        retrieveGameInfo();
    }, [id, favourites, myGames, loggedInUser]);

    useEffect(() => {
        if (!gameInfo) return;

        const inLibraryLocal = !!myGames.find((game) => game.slug === id);
        const isFavoritedLocal = !!favourites.find((game) => game.slug === id);

        setInLibrary(inLibraryLocal);
        setIsFavorited(isFavoritedLocal);

        if (gameInfo.tags) {
            const data = gameInfo.tags.map((tag) => {
                return { value: tag.name, count: tag.games_count };
            });
            setWordcloudData(data);
        }
    }, [gameInfo, myGames, favourites, id]);

    const toggleFavourite = async () => {
        const existingGame = favourites.find((game) => game.id === gameInfo.id);

        if (existingGame) {
            setFavourites((prevFavourites) => {
                return prevFavourites.filter((game) => game.id !== gameInfo.id);
            });
            await updateFavouriteStatus(loggedInUser.email, gameInfo.id, false);
        } else {
            setFavourites((prevFavourites) => {
                return [
                    ...prevFavourites,
                    {
                        ...gameInfo,
                        gameId: gameInfo.id,
                        isFavourite: true
                    }
                ];
            });
        }
    };

    return (
        <main id='game-page'>
            {gameInfo ? (
                <GameDetails
                    gameInfo={gameInfo}
                    inLibrary={inLibrary}
                    isFavorited={isFavorited}
                    toggleFavourite={toggleFavourite}
                    loggedInUser={loggedInUser}
                    wordcloudData={wordcloudData}
                />
            ) : (
                <></>
            )}
        </main>
    );
}
