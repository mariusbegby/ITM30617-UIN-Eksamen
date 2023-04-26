import React, { useState, useMemo } from 'react';
import GameCard from './GameCard';
import { apiKey } from '../apiKey';

const getRecentGames = async () => {
    const response = await fetch(
        'https://rawg.io/api/games?stores=1&page_size=3&ordering=-updated&key=' + apiKey
    );
    const data = await response.json();

    return data.results;
};

export default function GameShopWidget() {
    const [recentGames, setRecentGames] = useState([]);

    useMemo(async () => {
        let results = await getRecentGames();
        setRecentGames(results);
    }, []);

    return (
        <section id='gameshop-widget'>
            <header>
                <h2>Gameshop - Latest releases</h2>
                <a href='/gameshop' className='link-button'>
                    Visit Shop
                </a>
            </header>
            <div id='gameshop-widget-gameslist' className='gameslist'>
                {recentGames.map((game) => {
                    return (
                        <GameCard key={game.id} gameObject={game} canBePurchased={true}></GameCard>
                    );
                })}
            </div>
        </section>
    );
}
