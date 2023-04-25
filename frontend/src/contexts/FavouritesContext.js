import React, { createContext, useState, useEffect } from 'react';

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
    const [favourites, setFavourites] = useState(() => {
        const storedFavourites = localStorage.getItem('favourites');
        return storedFavourites ? JSON.parse(storedFavourites) : [];
    });

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

    return (
        <FavouritesContext.Provider value={{ favourites, setFavourites }}>
            {children}
        </FavouritesContext.Provider>
    );
};
