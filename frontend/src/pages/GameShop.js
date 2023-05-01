/*
  Route: /gameshop
*/

/* Import packages */
import React, { useState, useEffect } from 'react';

/* Import services */
import { getRecentSteamGames } from '../services/rawgApiClient';

/* Import components */
import GameListContainer from '../components/GameListContainer';

export default function GameShop() {
    const [recentGames, setRecentGames] = useState([]);

    useEffect(() => {
        const fetchRecentGames = async () => {
            const results = await getRecentSteamGames(10);
            setRecentGames(results);
        };
        fetchRecentGames();
    }, []);

    return (
        <main id='gameshop-page'>
            <header>
                <h1>Gameshop - Latest Updates</h1>
            </header>
            <GameListContainer
                games={recentGames}
                emptyMessage={'Loading...'}
                canPurchaseGames={true}
            />
        </main>
    );
}
