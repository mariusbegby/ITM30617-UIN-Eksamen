// Route: /login
import React, { useState, useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';
import client from '../sanity/client';

export default function Login() {
    const { setLoggedInUser } = useContext(LoginContext);
    const [userEmail, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const query = `*[_type == "user" && userEmail == "${userEmail}"]{_id, userEmail}`;
        const result = await client.fetch(query);

        console.log(result);

        if (result.length > 0) {
            setMessage('Login successful');
            setLoggedInUser(() => {
                return {
                    email: result[0].userEmail
                };
            });
        } else {
            setMessage('Email not found');
            setLoggedInUser(() => {
                return null;
            });
        }
    };

    return (
        <main id='login-page'>
            <header>
                <h1>Login</h1>
            </header>
            <section id='login-form'>
                <div>
                    <form onSubmit={handleLogin}>
                        <label htmlFor='email'>Email:</label>
                        <input
                            type='email'
                            id='email'
                            value={userEmail}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button type='submit'>Login</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </section>
        </main>
    );
}
