// Route: /favourites
import React, { useContext, useEffect } from 'react';
import { FavouritesContext } from '../contexts/FavouritesContext';
import { LoginContext } from '../contexts/LoginContext';
import { getFavouritedGames } from '../sanity/service';
import GameCard from '../components/GameCard';
import { fetchGameInfo } from '../utilities/rawgApiHandler';

export default function MyFavourites() {
    const { loggedInUser } = useContext(LoginContext);
    const { favourites, setFavourites } = useContext(FavouritesContext);

    useEffect(() => {
        const fetchFavourites = async () => {
            const favouriteList = await getFavouritedGames(loggedInUser);

            let completeGameObjects = await Promise.all(
                favouriteList.map(async (game) => {
                    let gameInfoFromApi = await fetchGameInfo(
                        game.gameRef.gameSlug
                    );
                    return gameInfoFromApi;
                })
            );

            setFavourites(completeGameObjects);
        };
        fetchFavourites();
    }, [loggedInUser, setFavourites]);

    return loggedInUser ? (
        <main id='myfavourites-page'>
            <header>
                <h1>My Favourites ({favourites.length})</h1>
            </header>
            <section className='gameslist'>
                {favourites.length > 0 ? (
                    favourites.map((game) => {
                        return (
                            <GameCard
                                key={game.slug}
                                gameObject={game}></GameCard>
                        );
                    })
                ) : (
                    <h3>You have no favourites.</h3>
                )}
            </section>
        </main>
    ) : (
        <main>
            <header>
                <h1>My Favourites</h1>
            </header>
            <section>
                <h3>You must be logged in to view this page.</h3>
            </section>
        </main>
    );
}
