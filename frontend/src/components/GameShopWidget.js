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
            <header className='widget-header'>
                <h1>Gameshop - Latest updates</h1>
                <a href='/gameshop' className='link-button'>
                    Visit Shop
                </a>
            </header>
            <GamesList
                games={recentGames}
                emptyMessage={'Loading...'}
                canPurchaseGames={true}
            />
        </section>
    );
}
