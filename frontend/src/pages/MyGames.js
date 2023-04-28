// Route: /mygames
import React, { useEffect, useContext } from 'react';
import { MyGamesContext } from '../contexts/MyGamesContext';
import GamesList from '../components/GamesList';
import RequiresLoginMessage from '../components/RequiresLoginMessage';
import { getMyGames } from '../sanity/service';
import { LoginContext } from '../contexts/LoginContext';
import { fetchGameInfo } from '../utilities/rawgApiClient';

export default function MyGames() {
    const { loggedInUser } = useContext(LoginContext);
    const { myGames, setMyGames } = useContext(MyGamesContext);

    useEffect(() => {
        const fetchMyGames = async () => {
            let myGamesResults = await getMyGames(loggedInUser.email);

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

        loggedInUser && fetchMyGames();
    }, [loggedInUser, setMyGames]);

    return loggedInUser ? (
        <main id='mygames-page'>
            <header>
                <h1>My Games-Library ({myGames.length})</h1>
            </header>
            <GamesList games={myGames} emptyMessage={'You have no games in your library.'}/>
        </main>
    ) : (
        <RequiresLoginMessage title='My Games' />
    );
}
