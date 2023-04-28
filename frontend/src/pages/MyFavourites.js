// Route: /favourites
import React, { useContext, useEffect } from 'react';
import { FavouritesContext } from '../contexts/FavouritesContext';
import { LoginContext } from '../contexts/LoginContext';
import { getFavouritedGamesByUser } from '../services/sanityClient';
import RequiresLoginMessage from '../components/RequiresLoginMessage';
import GamesList from '../components/GamesList';
import { getMultipleGameInfo } from '../services/rawgApiClient';

export default function MyFavourites() {
    const { loggedInUser } = useContext(LoginContext);
    const { favourites, setFavourites } = useContext(FavouritesContext);

    useEffect(() => {
        const fetchFavourites = async () => {
            const favouriteList = await getFavouritedGamesByUser(
                loggedInUser.email
            );

            const completeGameObjects = await getMultipleGameInfo(
                favouriteList.map((game) => game.gameRef.gameSlug)
            );

            setFavourites(completeGameObjects);
        };
        loggedInUser && fetchFavourites();
    }, [loggedInUser, setFavourites]);

    return loggedInUser ? (
        <main id='myfavourites-page'>
            <header>
                <h1>My Favourites ({favourites.length})</h1>
            </header>
            <GamesList
                games={favourites}
                emptyMessage={'You have no favourites.'}
            />
        </main>
    ) : (
        <RequiresLoginMessage title='My Favourites' />
    );
}
