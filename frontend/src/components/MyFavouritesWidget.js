import React, { useContext, useEffect } from 'react';
import { FavouritesContext } from '../contexts/FavouritesContext';
import { getFavouritedGames } from '../sanity/service';
import GameCard from '../components/GameCard';
import { fetchGameInfo } from '../utilities/rawgApiHandler';

export default function MyFavouritesWidget({ loggedInUser }) {
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
    return (
        <section id='myfavourites-widget'>
            <header>
                <h2>My Favourites ({favourites.length})</h2>
                <a href='/favourites' className='link-button'>
                    View All
                </a>
            </header>
            <div id='myfavourites-widget-gameslist'>
                {favourites.length > 0 ? (
                    favourites.slice(0, 2).map((game) => {
                        return (
                            <GameCard
                                key={game.slug}
                                gameObject={game}></GameCard>
                        );
                    })
                ) : (
                    <h3>You have no favourites.</h3>
                )}
            </div>
        </section>
    );
}
