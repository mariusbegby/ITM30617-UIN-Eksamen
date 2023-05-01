/*
  Route: / (index)
*/

/* Import packages */
import React, { useContext } from 'react';

/* Import contexts */
import { LoginContext } from '../contexts/LoginContext';

/* Import components */
import GameShopWidget from '../components/dashboard/GameShopWidget';
import MyGamesWidget from '../components/dashboard/MyGamesWidget';
import MyFavouritesWidget from '../components/dashboard/MyFavouritesWidget';

export default function Dashboard() {
    const { loggedInUser } = useContext(LoginContext);

    // Only render MyGames Widget and Favourites Widget if user is logged in
    return (
        <main id='dashboard-page'>
            <GameShopWidget></GameShopWidget>
            {loggedInUser && (
                <MyGamesWidget loggedInUser={loggedInUser}></MyGamesWidget>
            )}
            {loggedInUser && (
                <MyFavouritesWidget
                    loggedInUser={loggedInUser}></MyFavouritesWidget>
            )}
        </main>
    );
}
