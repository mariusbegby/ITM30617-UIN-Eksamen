import React, { useEffect, useContext } from 'react';
import { MyGamesContext } from '../contexts/MyGamesContext';
import { getGamesByUser } from '../services/sanityClient';
import GamesList from '../components/GamesList';
import { getGameInfo } from '../services/rawgApiClient';

export default function MyGamesWidget({ loggedInUser }) {
    const { myGames, setMyGames } = useContext(MyGamesContext);

    useEffect(() => {
        const fetchMyGames = async () => {
            let myGamesResults = await getGamesByUser(loggedInUser.email);

            let completeGameObjects = await Promise.all(
                myGamesResults.map(async (game) => {
                    let gameInfoFromApi = await getGameInfo(
                        game.gameRef.gameSlug
                    );
                    return {
                        apiId: game.gameRef.gameApiId,
                        name: game.gameRef.gameTitle,
                        slug: game.gameRef.gameSlug,
                        genres: game.gameRef.gameGenres.map((genre) => ({
                            name: genre.genreRef.genreName
                        })),
                        background_image: gameInfoFromApi.background_image
                    };
                })
            );

            setMyGames(completeGameObjects);
        };

        fetchMyGames();
    }, [loggedInUser, setMyGames]);

    return (
        <section id='mygames-widget'>
            <header className='widget-header'>
                <h2>My Games-Library - {myGames.length} Games</h2>
                <a href='/mygames' className='link-button'>
                    View All
                </a>
            </header>
            <GamesList
                games={myGames}
                emptyMessage={'You have no games in your library.'}
                maxItems={4}
            />
        </section>
    );
}
