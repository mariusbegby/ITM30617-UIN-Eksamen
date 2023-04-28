// Route: /game/[gametitle-as-slug]
import React, { useState, useEffect, useContext } from 'react';
import { FavouritesContext } from '../contexts/FavouritesContext';
import { MyGamesContext } from '../contexts/MyGamesContext';
import {
    updateFavouriteStatus,
    getSingleGameFromLibrary
} from '../sanity/service';
import { useParams } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContext';
import {
    fetchGameInfo,
    fetchSteamUrlForGame
} from '../utilities/rawgApiClient';
import { TagCloud } from 'react-tagcloud';

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
        const retrieveGameInfo = async () => {
            const inLibraryLocal = !!myGames.find((game) => game.slug === id);
            const isFavoritedLocal = !!favourites.find(
                (game) => game.slug === id
            );

            setInLibrary(inLibraryLocal);
            setIsFavorited(isFavoritedLocal);

            if (inLibraryLocal) {
                getSingleGameFromLibrary(loggedInUser, id).then(
                    async (gameObject) => {
                        let gameInfoFromApi = await fetchGameInfo(
                            gameObject.gameData.gameApiId
                        );
                        console.log(gameInfoFromApi);
                        let gameInfoObject = {
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
                let result = await fetchGameInfo(id);
                let steamUrl = await fetchSteamUrlForGame(id);
                result.steamUrl = steamUrl;
                setGameInfo(result);
            }
        };

        retrieveGameInfo();
    }, [id, favourites, myGames, loggedInUser]);

    const toggleFavourite = async () => {
        const existingGame = favourites.find((game) => game.id === gameInfo.id);

        if (existingGame) {
            setFavourites((prevFavourites) => {
                return prevFavourites.filter((game) => game.id !== gameInfo.id);
            });
            await updateFavouriteStatus(loggedInUser, gameInfo.id, false);
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

    useEffect(() => {
        if (gameInfo && gameInfo.tags) {
            const data = gameInfo.tags.map((tag) => {
                return { value: tag.name, count: tag.games_count };
            });
            setWordcloudData(data);
        }
    }, [gameInfo]);

    return (
        <main id='game-page'>
            {gameInfo ? (
                <>
                    <section>
                        <figure>
                            <img
                                src={
                                    gameInfo.background_image
                                        ? gameInfo.background_image
                                        : '/placeholder.png'
                                }
                                alt=''
                            />
                        </figure>
                    </section>
                    <section>
                        <header>
                            <h1>{gameInfo.name}</h1>
                            <div id='rating-favourite-section'>
                                <span className='textfont-strong rating-tag'>
                                    ★ {gameInfo.rating}
                                </span>
                                {loggedInUser && inLibrary ? (
                                    <button
                                        className={
                                            isFavorited
                                                ? 'textfont-strong favourite-button favourited'
                                                : 'textfont-strong favourite-button'
                                        }
                                        onClick={toggleFavourite}>
                                        {isFavorited
                                            ? '❤ Favourited'
                                            : '❤ Favourite'}
                                    </button>
                                ) : (
                                    <span className='textfont-strong notinlibrary-tag'>
                                        Not in library
                                    </span>
                                )}
                            </div>
                        </header>
                        <p className='margin-bottom'>
                            <i>{gameInfo.description_raw}</i>
                        </p>
                        <p className='margin-bottom'>
                            {inLibrary ? (
                                <span className='textfont-strong inlibrary-tag'>
                                    In Library{' '}
                                    {gameInfo.hoursPlayed
                                        ? ' - ' +
                                          gameInfo.hoursPlayed +
                                          ' hours'
                                        : ''}
                                </span>
                            ) : gameInfo.steamUrl ? (
                                <a
                                    href={gameInfo.steamUrl}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='link-button'>
                                    Buy
                                </a>
                            ) : (
                                <span className='textfont-strong notinlibrary-tag'>
                                    No store url
                                </span>
                            )}
                        </p>
                        <p>
                            <span className='textfont-strong'>Genres: </span>
                            {gameInfo.genres?.length > 0
                                ? gameInfo.genres
                                      .map((genre) => genre.name)
                                      .join(', ')
                                : 'Unknown'}
                        </p>
                        <p>
                            <span className='textfont-strong'>Published: </span>
                            {new Date(gameInfo.released).toLocaleDateString(
                                'en-US',
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }
                            )}
                        </p>
                        <p>
                            <span className='textfont-strong'>
                                Publishers:{' '}
                            </span>
                            {gameInfo.publishers?.length > 0
                                ? gameInfo.publishers
                                      .map((publisher) => publisher.name)
                                      .join(', ')
                                : 'Unknown'}
                        </p>
                        <p>
                            <span className='textfont-strong'>
                                Developers:{' '}
                            </span>
                            {gameInfo.developers?.length > 0
                                ? gameInfo.developers
                                      .map((developer) => developer.name)
                                      .join(', ')
                                : 'Unknown'}
                        </p>
                        <p>
                            <span className='textfont-strong'>Platforms: </span>
                            {gameInfo.platforms?.length > 0
                                ? gameInfo.platforms
                                      .map((platform) => platform.platform.name)
                                      .join(', ')
                                : 'Unknown'}
                        </p>
                        <p>
                            <span className='textfont-strong'>
                                Available in stores:{' '}
                            </span>{' '}
                            {gameInfo.stores?.length > 0
                                ? gameInfo.stores
                                      .map((store) => store.store.name)
                                      .join(', ')
                                : 'Unknown'}
                        </p>
                        <p>
                            <span className='textfont-strong'>Tags: </span>{' '}
                        </p>
                        {gameInfo.tags?.length > 0 ? (
                            <TagCloud
                                minSize={10}
                                maxSize={28}
                                tags={wordcloudData}
                                colorOptions={{ luminosity: 'dark' }}
                            />
                        ) : (
                            'None'
                        )}
                    </section>
                </>
            ) : (
                <></>
            )}
        </main>
    );
}
