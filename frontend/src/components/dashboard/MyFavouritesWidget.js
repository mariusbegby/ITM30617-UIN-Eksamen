/* Import packages */
import React, { useContext, useEffect } from 'react';

/* Import services */
import { getMultipleGameInfo } from '../../services/rawgApiClient';
import { getFavouritedGamesByUser } from '../../services/sanityClient';

/* Import contexts */
import { FavouritesContext } from '../../contexts/FavouritesContext';

/* Import components */
import GameListContainer from '../GameListContainer';

export default function MyFavouritesWidget({ loggedInUser }) {
    const { favourites, setFavourites } = useContext(FavouritesContext);

    useEffect(() => {
        const fetchFavourites = async () => {
            // Get list of favourited games from Sanity
            const favouriteList = await getFavouritedGamesByUser(
                loggedInUser.email
            );

            // Get data about games in favourites from API
            const favouritesGameDataFromApi = await getMultipleGameInfo(
                favouriteList.map((game) => game.gameRef.gameSlug)
            );

            setFavourites(favouritesGameDataFromApi);
        };

        fetchFavourites();
    }, [loggedInUser, setFavourites]);

    return (
        <section
            id='myfavourites-widget'
            aria-labelledby='myfavourites-widget-title'>
            <header className='widget-header'>
                <h2 id='myfavourites-widget-title'>
                    My Favourites ({favourites.length})
                </h2>
                <a href='/favourites' className='link-button'>
                    View All
                </a>
            </header>
            <GameListContainer
                games={favourites}
                emptyMessage={'You have no favourites.'}
                maxItems={2}
            />
        </section>
    );
}
