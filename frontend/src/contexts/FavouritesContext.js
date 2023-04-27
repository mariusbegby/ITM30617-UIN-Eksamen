import React, { createContext, useState, useEffect, useContext } from 'react';
import { updateFavouriteStatus } from '../sanity/service';
import { LoginContext } from '../contexts/LoginContext';

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
    const { loggedInUser } = useContext(LoginContext);
    const [favourites, setFavourites] = useState(() => {
        const storedFavourites = localStorage.getItem('favourites');
        return storedFavourites ? JSON.parse(storedFavourites) : [];
    });

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

    useEffect(() => {
        if (loggedInUser) {
            favourites.forEach(async (favourite) => {
                const { gameId, isFavourite } = favourite;
                if (gameId && typeof isFavourite === 'boolean') {
                    await updateFavouriteStatus(
                        loggedInUser,
                        gameId,
                        isFavourite
                    );
                }
            });
        }
    }, [favourites, loggedInUser]);

    return (
        <FavouritesContext.Provider value={{ favourites, setFavourites }}>
            {children}
        </FavouritesContext.Provider>
    );
};
