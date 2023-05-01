/*
  Route: /favourites
*/

/* Import packages */
import React, { useContext, useEffect } from 'react';

/* Import services */
import { getMultipleGameInfo } from '../services/rawgApiClient';
import { getFavouritedGamesByUser } from '../services/sanityClient';

/* Import contexts */
import { LoginContext } from '../contexts/LoginContext';
import { FavouritesContext } from '../contexts/FavouritesContext';

/* Import components */
import RequireLoginPage from '../components/RequireLoginPage';
import GameListContainer from '../components/GameListContainer';

export default function MyFavourites() {
    const { loggedInUser } = useContext(LoginContext);
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

        // Only fetch favourites if user is logged in
        loggedInUser && fetchFavourites();
    }, [loggedInUser, setFavourites]);

    // If user is logged in, display their favourites
    return loggedInUser ? (
        <main id='myfavourites-page'>
            <header>
                <h1>My Favourites ({favourites.length})</h1>
            </header>
            <GameListContainer
                games={favourites}
                emptyMessage={'You have no favourites.'}
            />
        </main>
    ) : (
        <RequireLoginPage title='My Favourites' />
    );
}
