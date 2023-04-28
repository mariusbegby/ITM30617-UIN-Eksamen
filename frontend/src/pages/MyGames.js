// Route: /mygames
import React, { useEffect, useContext } from 'react';
import { MyGamesContext } from '../contexts/MyGamesContext';
import GamesList from '../components/GamesList';
import RequiresLoginMessage from '../components/RequiresLoginMessage';
import { getGamesByUser } from '../services/sanityClient';
import { LoginContext } from '../contexts/LoginContext';
import { getMultipleGameInfo } from '../services/rawgApiClient';

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
            <GamesList
                games={myGames}
                emptyMessage={'You have no games in your library.'}
            />
        </main>
    ) : (
        <RequiresLoginMessage title='My Games' />
    );
}
