// Route: /mygames
import React, { useEffect, useContext } from 'react';
import { MyGamesContext } from '../contexts/MyGamesContext';
import GameCard from '../components/GameCard';
import { getMyGames } from '../sanity/service';
import { LoginContext } from '../contexts/LoginContext';
import { fetchGameInfo } from '../utilities/rawgApiHandler';

export default function MyGames() {
    const { loggedInUser } = useContext(LoginContext);
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
                        apiId: game.gameRef.gameApiId,
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

    return loggedInUser ? (
        <main id='mygames-page'>
            <header>
                <h1>My Games-Library ({myGames.length})</h1>
            </header>
            <section className='gameslist'>
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
            </section>
        </main>
    ) : ( 
        <main>
            <header>
                <h1>My Games</h1>
            </header>
            <section>
                <h3>You must be logged in to view this page.</h3>
            </section>
        </main>
    );
}
