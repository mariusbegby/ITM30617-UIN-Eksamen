import React, { createContext, useState, useEffect, useContext } from 'react';
import { updateFavouriteStatus } from '../services/sanityClient';
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

    // Update favourites for logged in user in Sanity when favourites state changes
    useEffect(() => {
        if (loggedInUser) {
            favourites.forEach(async (favourite) => {
                const { gameId, isFavourite } = favourite;
                if (gameId && typeof isFavourite === 'boolean') {
                    await updateFavouriteStatus(
                        loggedInUser.email,
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
