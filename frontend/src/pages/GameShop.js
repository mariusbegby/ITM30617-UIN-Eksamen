// Route: /gameshop
import React, { useState, useMemo } from 'react';
import GameCard from '../components/GameCard';
import { apiKey } from '../apiKey';

const getRecentGames = async () => {
    const response = await fetch(
        'https://rawg.io/api/games?stores=1&page_size=10&ordering=-updated&key=' +
            apiKey
    );
    const data = await response.json();

    return data.results;
};

export default function GameShop() {
    const [recentGames, setRecentGames] = useState([]);

    useMemo(async () => {
        let results = await getRecentGames();
        setRecentGames(results);
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
