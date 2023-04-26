// Route: /mygames
import React, { useState, useMemo } from 'react';
import GameCard from '../components/GameCard';
import { apiKey } from '../apiKey';

const getMyGames = async () => {
    const response = await fetch(
        'https://rawg.io/api/games?page_size=20&genres=action&key=' + apiKey
    );
    const data = await response.json();

    return data.results;
};

export default function MyGames() {
    const [myGames, setMyGames] = useState([]);

    useMemo(async () => {
        let results = await getMyGames();
        setMyGames(results);
    }, []);

    return (
        <main id='mygames-page'>
            <header>
                <h1>My Games</h1>
            </header>
            <section className='gameslist'>
                {myGames.map((game) => {
                    return (
                        <GameCard key={game.id} gameObject={game}></GameCard>
                    );
                })}
            </section>
        </main>
    );
}
