import React, { createContext, useState, useEffect } from 'react';

export const MyGamesContext = createContext();

export const MyGamesProvider = ({ children }) => {
    const [myGames, setMyGames] = useState(() => {
        const storedMyGames = localStorage.getItem('myGames');
        return storedMyGames ? JSON.parse(storedMyGames) : [];
    });

    useEffect(() => {
        localStorage.setItem('myGames', JSON.stringify(myGames));
    }, [myGames]);

    return (
        <MyGamesContext.Provider value={{ myGames, setMyGames }}>
            {children}
        </MyGamesContext.Provider>
    );
};
