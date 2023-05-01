/* Import packages */
import React, { useEffect, useContext } from 'react';

/* Import services */
import { getMultipleGameInfo } from '../../services/rawgApiClient';
import { getGamesByUser } from '../../services/sanityClient';

/* Import contexts */
import { MyGamesContext } from '../../contexts/MyGamesContext';

/* Import components */
import GameListContainer from '../GameListContainer';

export default function MyGamesWidget({ loggedInUser }) {
    const { myGames, setMyGames } = useContext(MyGamesContext);

    useEffect(() => {
        const fetchMyGames = async () => {
            // Get list of games in user library from Sanity
            let myGamesList = await getGamesByUser(loggedInUser.email);

            // Get data about games in library from API
            const myGamesGameDataFromApi = await getMultipleGameInfo(
                myGamesList.map((game) => game.gameRef.gameSlug)
            );

            setMyGames(myGamesGameDataFromApi);
        };

        fetchMyGames();
    }, [loggedInUser, setMyGames]);

    return (
        <section id='mygames-widget' aria-labelledby='mygames-widget-title'>
            <header className='widget-header'>
                <h2 id='mygames-widget-title'>
                    My Games-Library - {myGames.length} Games
                </h2>
                <a href='/mygames' className='link-button'>
                    View All
                </a>
            </header>
            <GameListContainer
                games={myGames}
                emptyMessage={'You have no games in your library.'}
                maxItems={4}
            />
        </section>
    );
}
