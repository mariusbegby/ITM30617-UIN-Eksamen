// Route: /game/[gametitle-as-slug]
import React, { useState, useEffect, useContext } from 'react';
import { FavouritesContext } from '../contexts/FavouritesContext';
import { useParams } from 'react-router-dom';
import { apiKey } from '../apiKey';

const getGameInfo = async (slug) => {
    const response = await fetch(
        'https://rawg.io/api/games/' + slug + '?key=' + apiKey
    );
    const data = await response.json();

    return data;
};

export default function GamePage() {
    const { id } = useParams();

    const [gameInfo, setGameInfo] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);
    const { favourites, setFavourites } = useContext(FavouritesContext);

    useEffect(() => {
        setIsFavorited(!!favourites.find((game) => game.slug === id));

        const fetchGameInfo = async () => {
            let result = await getGameInfo(id);
            setGameInfo(result);
        };
    
        fetchGameInfo();
    }, [id, favourites]);

    const toggleFavourite = async () => {
        setFavourites((prevFavourites) => {
            if (prevFavourites.find((game) => game.id === gameInfo.id)) {
                return prevFavourites.filter((game) => game.id !== gameInfo.id);
            } else {
                return [...prevFavourites, gameInfo];
            }
        });
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
                            </div>
                        </header>
                        <p>
                            <i>{gameInfo.description_raw}</i>
                        </p>
                        <p>
                            <span className='textfont-strong'>Genres: </span>{' '}
                            {gameInfo.genres
                                .slice(0, 5)
                                .map((genre) => genre.name)
                                .join(', ')}
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
                        <div className='tag-section'>
                            <span className='textfont-strong'>Tags: </span>
                            {gameInfo.tags.slice(0, 5).map((tag, index) => (
                                <p key={index}>{tag.name}</p>
                            ))}
                        </div>

                        <a href={gameInfo.storeUrl} className='link-button'>
                            Buy
                        </a>
                    </section>
                </>
            ) : (
                <></>
            )}
        </main>
    );
}
