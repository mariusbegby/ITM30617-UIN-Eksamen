import React, { useContext } from 'react';
import { FavouritesContext } from '../contexts/FavouritesContext';
import GameCard from './GameCard';

export default function MyFavouritesWidget() {
    const { favourites, setFavourites } = useContext(FavouritesContext);

    return (
        <section id='myfavourites-widget'>
            <header>
                <h2>My Favourites</h2>
            </header>
            <div id='myfavourites-widget-gameslist'>
                {favourites.map((game) => {
                    return (
                        <GameCard key={game.id} gameObject={game}></GameCard>
                    );
                })}
            </div>
        </section>
    );
}
