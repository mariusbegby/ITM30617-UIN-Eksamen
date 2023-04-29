import React, { useState, useEffect } from 'react';
import GamesList from '../components/GamesList';
import { getRecentSteamGames } from '../services/rawgApiClient';

export default function GameShopWidget() {
    const [recentGames, setRecentGames] = useState([]);

    useEffect(() => {
        const fetchRecentGames = async () => {
            let results = await getRecentSteamGames(3);
            setRecentGames(results);
        };
        fetchRecentGames();
    }, []);

    return (
        <section id='gameshop-widget'>
            <header>
                <h1>Gameshop - Latest updates</h1>
                <a href='/gameshop' className='link-button'>
                    Visit Shop
                </a>
            </header>
            <div id='gameshop-widget-gameslist'>
                <GamesList
                    games={recentGames}
                    emptyMessage={'Loading...'}
                    canPurchaseGames={true}
                />
            </div>
        </section>
    );
}
