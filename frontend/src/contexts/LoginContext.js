/* Import packages */
import React, { createContext, useState, useEffect } from 'react';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    }, [loggedInUser]);

    return (
        <LoginContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </LoginContext.Provider>
    );
};
