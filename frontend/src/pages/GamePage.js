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
    // Get game slug from URL
    const { id } = useParams();

    const { loggedInUser } = useContext(LoginContext);
    const { myGames } = useContext(MyGamesContext);
    const { favourites, setFavourites } = useContext(FavouritesContext);

    const [inLibrary, setInLibrary] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const [gameInfo, setGameInfo] = useState(null);
    const [wordcloudData, setWordcloudData] = useState([]);

    useEffect(() => {
        // Local variable to check if game is in user's game library
        const inLibraryLocal = !!myGames.find((game) => game.slug === id);

        const retrieveGameInfo = async () => {
            if (inLibraryLocal) {
                // If game is in library, get game info from Sanity and supplement with data from API.
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
                // If game is not in library, get all game info API
                const gameInfoObject = await getGameInfo(id);

                // Retrieve Steam store url for buy button.
                const steamUrl = await getSteamUrlForGame(id);
                gameInfoObject.steamUrl = steamUrl;
                setGameInfo(gameInfoObject);
            }
        };

        retrieveGameInfo();
    }, [id, favourites, myGames, loggedInUser]);

    useEffect(() => {
        // Return if gameInfo does not have a value yet (e.g. still loading)
        if (!gameInfo) return;

        // Local variables to check if game is in users game library and favourites
        const inLibraryLocal = !!myGames.find((game) => game.slug === id);
        const isFavoritedLocal = !!favourites.find((game) => game.slug === id);

        // Set status of inLibrary and isFavorited used to conditionally displaying information
        setInLibrary(inLibraryLocal);
        setIsFavorited(isFavoritedLocal);

        // If gameInfo has tags, create data for wordcloud
        if (gameInfo.tags) {
            const data = gameInfo.tags.map((tag) => {
                return { value: tag.name, count: tag.games_count };
            });
            setWordcloudData(data);
        }
    }, [gameInfo, myGames, favourites, id]);

    // Method to toggle favourite status of game for user
    const toggleFavourite = async () => {
        // Check if game is already in user's favourites list
        const inFavourites = favourites.find((game) => game.id === gameInfo.id);

        // Toggle favourite status based on current status
        if (inFavourites) {
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
