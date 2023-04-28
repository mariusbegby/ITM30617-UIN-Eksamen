// Route: /gameshop
import React, { useState, useEffect } from 'react';

import GamesList from '../components/GamesList';
import { getRecentSteamGames } from '../services/rawgApiClient';

export default function GameShop() {
    const [recentGames, setRecentGames] = useState([]);

    useEffect(() => {
        const fetchRecentGames = async () => {
            let results = await getRecentSteamGames(10);
            setRecentGames(results);
        };
        fetchRecentGames();
    }, []);

    return (
        <main id='gameshop-page'>
            <header>
                <h1>Gameshop - Latest Updates</h1>
            </header>
            <GamesList
                    games={recentGames}
                    emptyMessage={'Could not retrieve any games at the moment.'} canPurchaseGames={true}
                />
        </main>
    );
}
