// Route: /login
import React, { useState, useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import { getUserByEmail } from '../utilities/sanityClient';

export default function Login() {
    const { loggedInUser, setLoggedInUser } = useContext(LoginContext);
    const [userEmail, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = await getUserByEmail(userEmail);

        if (user.userEmail) {
            const loggedInEmail = user.userEmail;
            setErrorMessage(``);
            setLoggedInUser(() => {
                return {
                    email: loggedInEmail
                };
            });
        } else {
            setErrorMessage('User not found with that email.');
            setLoggedInUser(() => {
                return null;
            });
        }
        setEmail('');
    };

    return (
        <main id='login-page'>
            <header>
                <img
                    src='/logo192.png'
                    id='header-logo'
                    alt='MACs GameHub logo'
                />
                <h1>GameHub Login</h1>
            </header>
            {loggedInUser && (
                <p className='form-message'>
                    Currently logged in as: {loggedInUser.email}.
                </p>
            )}
            {errorMessage && (
                <p className='form-message error-message'>{errorMessage}</p>
            )}
            <form onSubmit={handleLogin} id='login-form'>
                <label htmlFor='email'>Email:</label>
                <input
                    type='email'
                    id='email'
                    value={userEmail}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type='submit'>Login</button>
            </form>
        </main>
    );
}
