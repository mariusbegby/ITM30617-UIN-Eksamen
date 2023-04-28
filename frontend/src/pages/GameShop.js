// Route: /gameshop
import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
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
            <section className='gameslist'>
                {recentGames.map((game) => {
                    return (
                        <GameCard key={game.id} gameObject={game} canBePurchased={true}></GameCard>
                    );
                })}
            </section>
        </main>
    );
}
