// Route: /login
import React, { useState, useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import client from '../sanity/client';

export default function Login() {
    const { loggedInUser, setLoggedInUser } = useContext(LoginContext);
    const [userEmail, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const query = `*[_type == "user" && userEmail == "${userEmail}"]{_id, userEmail}`;
        const result = await client.fetch(query);

        console.log(result);

        if (result.length > 0) {
            const loggedInEmail = result[0].userEmail;
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
                <h1>GameHub Login</h1>
            </header>
            {loggedInUser && <p className='form-message'>Currently logged in as: {loggedInUser.email}.</p>}
            {errorMessage && <p className='form-message error-message'>{errorMessage}</p>}
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
