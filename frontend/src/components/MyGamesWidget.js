import React, { useEffect, useContext } from 'react';
import { MyGamesContext } from '../contexts/MyGamesContext';
import { getMyGames } from '../sanity/service';
import GameCard from './GameCard';
import { fetchGameInfo } from '../utilities/fetchGameInfo';

export default function MyGamesWidget({ loggedInUser }) {
    const { myGames, setMyGames } = useContext(MyGamesContext);

    useEffect(() => {
        const fetchMyGames = async () => {
            let myGamesResults = await getMyGames(loggedInUser);

            let completeGameObjects = await Promise.all(
                myGamesResults.map(async (game) => {
                    let gameInfoFromApi = await fetchGameInfo(
                        game.gameRef.gameSlug
                    );
                    return {
                        name: game.gameRef.gameTitle,
                        slug: game.gameRef.gameSlug,
                        genres: game.gameRef.gameGenres.map((genre) => {
                            return {
                                name: genre.genreRef.genreName
                            };
                        }),
                        background_image: gameInfoFromApi.background_image
                    };
                })
            );

            console.log('Logging complete game objects for My Games: ');
            console.log(completeGameObjects);

            setMyGames(completeGameObjects);
        };

        fetchMyGames();
    }, [loggedInUser, setMyGames]);

    return (
        <section id='mygames-widget'>
            <header>
                <h2>My Games-Library - {myGames.length} Games</h2>
                <a href='/mygames' className='link-button'>
                    View All
                </a>
            </header>
            <div className='gameslist'>
                {myGames.length > 0 ? (
                    myGames.map((game) => {
                        return (
                            <GameCard
                                key={game.slug}
                                gameObject={game}></GameCard>
                        );
                    })
                ) : (
                    <h3>You have no games in your library.</h3>
                )}
            </div>
        </section>
    );
}
