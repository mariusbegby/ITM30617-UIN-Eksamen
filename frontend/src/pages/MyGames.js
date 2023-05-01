/*
  Route: /mygames
*/

/* Import packages */
import React, { useEffect, useContext } from 'react';

/* Import services */
import { getMultipleGameInfo } from '../services/rawgApiClient';
import { getGamesByUser } from '../services/sanityClient';

/* Import contexts */
import { LoginContext } from '../contexts/LoginContext';
import { MyGamesContext } from '../contexts/MyGamesContext';

/* Import components */
import RequireLoginPage from '../components/RequireLoginPage';
import GameListContainer from '../components/GameListContainer';

export default function MyGames() {
    const { loggedInUser } = useContext(LoginContext);
    const { myGames, setMyGames } = useContext(MyGamesContext);

    useEffect(() => {
        const fetchMyGames = async () => {
            const myGamesResults = await getGamesByUser(loggedInUser.email);

            const completeGameObjects = await getMultipleGameInfo(
                myGamesResults.map((game) => game.gameRef.gameSlug)
            );

            setMyGames(completeGameObjects);
        };

        loggedInUser && fetchMyGames();
    }, [loggedInUser, setMyGames]);

    return loggedInUser ? (
        <main id='mygames-page'>
            <header>
                <h1>My Games-Library ({myGames.length})</h1>
            </header>
            <GameListContainer
                games={myGames}
                emptyMessage={'You have no games in your library.'}
            />
        </main>
    ) : (
        <RequireLoginPage title='My Games' />
    );
}
