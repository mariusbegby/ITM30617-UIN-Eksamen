// Route: /
import React, { useContext } from 'react';
import GameShopWidget from '../components/dashboard/GameShopWidget';
import MyGamesWidget from '../components/dashboard/MyGamesWidget';
import MyFavouritesWidget from '../components/dashboard/MyFavouritesWidget';
import { LoginContext } from '../contexts/LoginContext';

export default function Dashboard() {
    const { loggedInUser } = useContext(LoginContext);
    return (
        <main id='dashboard-page'>
            <GameShopWidget></GameShopWidget>
            {loggedInUser && <MyGamesWidget loggedInUser={loggedInUser}></MyGamesWidget>}
            {loggedInUser && <MyFavouritesWidget loggedInUser={loggedInUser}></MyFavouritesWidget>}
        </main>
    );
}
