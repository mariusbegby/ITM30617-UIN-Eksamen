import React, { useContext, useEffect } from 'react';
import { FavouritesContext } from '../contexts/FavouritesContext';
import { getFavouritedGamesByUser } from '../utilities/sanityClient';
import GamesList from '../components/GamesList';
import { getGameInfo } from '../utilities/rawgApiClient';

export default function MyFavouritesWidget({ loggedInUser }) {
    const { favourites, setFavourites } = useContext(FavouritesContext);

    useEffect(() => {
        const fetchFavourites = async () => {
            const favouriteList = await getFavouritedGamesByUser(loggedInUser.email);

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
    }, [loggedInUser, setFavourites]);
    return (
        <section id='myfavourites-widget'>
            <header>
                <h2>My Favourites ({favourites.length})</h2>
                <a href='/favourites' className='link-button'>
                    View All
                </a>
            </header>
            <GamesList games={favourites} emptyMessage={'You have no favourites.'} maxItems={2} />
        </section>
    );
}
