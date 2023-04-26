import React, { useState, useMemo } from 'react';
import GameCard from './GameCard';
import { apiKey } from '../apiKey';

const getMyGames = async () => {
    const response = await fetch(
        'https://rawg.io/api/games?page_size=4&genres=action&key=' + apiKey
    );
    const data = await response.json();

    return data.results;
};

export default function MyGamesWidget() {
    const [myGames, setMyGames] = useState([]);

    useMemo(async () => {
        let results = await getMyGames();
        setMyGames(results);
    }, []);

    return (
        <section id='mygames-widget'>
            <header>
                <h2>My Games-Library - ? Games</h2>
                <a href='/mygames' className='link-button'>
                    View All
                </a>
            </header>
            <div className='gameslist'>
                {myGames.map((game) => {
                    return (
                        <GameCard key={game.id} gameObject={game}></GameCard>
                    );
                })}
            </div>
        </section>
    );
}
