// Route: /favourites
import React, { useContext, useEffect } from 'react';
import { FavouritesContext } from '../contexts/FavouritesContext';
import { LoginContext } from '../contexts/LoginContext';
import { getFavouritedGamesByUser } from '../services/sanityClient';
import RequiresLoginMessage from '../components/RequiresLoginMessage';
import GamesList from '../components/GamesList';
import { getGameInfo } from '../services/rawgApiClient';

export default function MyFavourites() {
    const { loggedInUser } = useContext(LoginContext);
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
        loggedInUser && fetchFavourites();
    }, [loggedInUser, setFavourites]);

    return loggedInUser ? (
        <main id='myfavourites-page'>
            <header>
                <h1>My Favourites ({favourites.length})</h1>
            </header>
            <GamesList games={favourites} emptyMessage={'You have no favourites.'}/>
        </main>
    ) : (
        <RequiresLoginMessage title='My Favourites' />
    );
}
