import React, { useContext, useEffect } from 'react';
import { FavouritesContext } from '../contexts/FavouritesContext';
import { getFavouritedGamesByUser } from '../services/sanityClient';
import GamesList from '../components/GamesList';
import { getGameInfo } from '../services/rawgApiClient';

export default function MyFavouritesWidget({ loggedInUser }) {
    const { favourites, setFavourites } = useContext(FavouritesContext);
    const { email } = loggedInUser;

    useEffect(() => {
        const fetchFavourites = async () => {
            const favouriteList = await getFavouritedGamesByUser(email);

            let completeGameObjects = await Promise.all(
                favouriteList.map(async (game) => {
                    let gameInfoFromApi = await getGameInfo(
                        game.gameRef.gameSlug
                    );
                    return gameInfoFromApi;
                })
            );

            setFavourites(completeGameObjects);
        };
        fetchFavourites();
    }, [email, setFavourites]);

    return (
        <section id='myfavourites-widget' aria-labelledby='myfavourites-widget-title'>
            <header className='widget-header'>
                <h2 id='myfavourites-widget-title'>My Favourites ({favourites.length})</h2>
                <a href='/favourites' className='link-button'>
                    View All
                </a>
            </header>
            <GamesList
                games={favourites}
                emptyMessage={'You have no favourites.'}
                maxItems={2}
            />
        </section>
    );
}
