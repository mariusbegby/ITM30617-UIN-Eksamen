// Route: /game/[gametitle-as-slug]
import React, { useState, useEffect, useContext } from 'react';
import { FavouritesContext } from '../contexts/FavouritesContext';
import { updateFavouriteStatus, gameExistsInLibrary } from '../sanity/service';
import { useParams } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContext';

import { fetchGameInfo } from '../utilities/fetchGameInfo';

export default function GamePage() {
    const { loggedInUser } = useContext(LoginContext);
    const { id } = useParams();

    const [gameInfo, setGameInfo] = useState(null);
    const [inLibrary, setInLibrary] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const { favourites, setFavourites } = useContext(FavouritesContext);

    useEffect(() => {
        setIsFavorited(!!favourites.find((game) => game.slug === id));

        const initializeGameInfo = async () => {
            let result = await fetchGameInfo(id);
            setGameInfo(result);
        };

        initializeGameInfo();
    }, [id, favourites]);

    useEffect(() => {
        const checkIfGameInLibrary = async () => {
            if (gameInfo) {
                let result = await gameExistsInLibrary(
                    loggedInUser,
                    gameInfo.id
                );
                console.log('result: ', result);
                setInLibrary(result);
            }
        };

        checkIfGameInLibrary();
    }, [loggedInUser, gameInfo]);

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
                        <p>
                            <i>{gameInfo.description_raw}</i>
                        </p>
                        <div className='tag-section'>
                            <span className='textfont-strong'>Genres: </span>
                            {gameInfo.genres.map((genre, index) => (
                                <p key={index}>{genre.name}</p>
                            ))}
                        </div>
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
                            <span className='textfont-strong'>Publisher: </span>
                            {gameInfo.publishers[0]?.name
                                ? gameInfo.publishers[0].name
                                : 'Unknown'}
                        </p>
                        <p>
                            <span className='textfont-strong'>Platforms: </span>
                            {gameInfo.platforms
                                .map((platform) => platform.platform.name)
                                .join(', ')}
                        </p>
                        <p>
                            <span className='textfont-strong'>Tags: </span>{' '}
                            {gameInfo.tags.map((tag) => tag.name).join(', ')}
                        </p>
                        {inLibrary ? (
                            <span className='textfont-strong inlibrary-tag'>In Game Library</span>
                        ) : (
                            <a href={gameInfo.storeUrl} className='link-button'>
                                Buy
                            </a>
                        )}
                    </section>
                </>
            ) : (
                <></>
            )}
        </main>
    );
}
