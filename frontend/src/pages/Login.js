/*
  Route: /login
*/

/* Import packages */
import React, { useState, useContext } from 'react';

/* Import services */
import { getUserByEmail } from '../services/sanityClient';

/* Import contexts */
import { LoginContext } from '../contexts/LoginContext';

export default function Login() {
    const { loggedInUser, setLoggedInUser } = useContext(LoginContext);

    const [userEmail, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        // Get user from Sanity from email provided in form
        const user = await getUserByEmail(userEmail);

        // If a user is found, set the loggedInUser context to user with provided email
        if (user.userEmail) {
            const loggedInEmail = user.userEmail;
            setErrorMessage(``);
            setLoggedInUser({
                email: loggedInEmail
            });
        } else {
            setErrorMessage('User not found with that email.');
            setLoggedInUser(null);
        }

        // Empty email field in form (clear input)
        setEmail('');
    };

    return (
        <main id='login-page'>
            <header>
                <img
                    src='/logo192.png'
                    id='header-logo'
                    alt='MACs GameHub logo'
                    width={64}
                    height={64}
                />
                <h1>GameHub Login</h1>
            </header>
            {loggedInUser && (
                <p className='form-message' aria-live='polite'>
                    Currently logged in as: {loggedInUser.email}.
                </p>
            )}
            {errorMessage && (
                <p className='form-message error-message' aria-live='polite'>
                    {errorMessage}
                </p>
            )}
            <form onSubmit={handleLogin} id='login-form'>
                <label htmlFor='email'>Email:</label>
                <input
                    type='email'
                    id='email'
                    value={userEmail}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label='Input for entering your email address.'
                />
                <button type='submit' className='link-button'>
                    Login
                </button>
            </form>
        </main>
    );
}
