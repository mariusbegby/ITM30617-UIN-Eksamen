// Route: /favourites
import React, { useContext } from 'react';
import { FavouritesContext } from '../contexts/FavouritesContext';
import GameCard from '../components/GameCard';

export default function MyFavourites() {
    const { favourites, setFavourites } = useContext(FavouritesContext);

    return (
        <main id='myfavourites-page'>
            <header>
                <h1>My Favourites</h1>
            </header>
            <section class='gameslist'>
                {favourites.map((game) => {
                    return (
                        <GameCard key={game.id} gameObject={game}></GameCard>
                    );
                })}
            </section>
        </main>
    );
}
