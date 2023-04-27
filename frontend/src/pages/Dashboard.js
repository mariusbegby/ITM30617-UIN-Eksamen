// Route: /
import React, { useContext } from 'react';
import GameShopWidget from '../components/GameShopWidget';
import MyGamesWidget from '../components/MyGamesWidget';
import MyFavouritesWidget from '../components/MyFavouritesWidget';
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
