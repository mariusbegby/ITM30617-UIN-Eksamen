/* Import packages */
import React, { useState, useEffect } from 'react';

/* Import services */
import { getRecentSteamGames } from '../../services/rawgApiClient';

/* Import components */
import GameListContainer from '../GameListContainer';

export default function GameShopWidget() {
    const [recentGames, setRecentGames] = useState([]);

    useEffect(() => {
        const fetchRecentGames = async () => {
            let results = await getRecentSteamGames(3);
            setRecentGames(results);
        };
        fetchRecentGames();
    }, []);

    return (
        <section id='gameshop-widget' aria-labelledby='gameshop-widget-title'>
            <header className='widget-header'>
                <h1 id='gameshop-widget-title'>Gameshop - Latest updates</h1>
                <a href='/gameshop' className='link-button'>
                    Visit Shop
                </a>
            </header>
            <GameListContainer
                games={recentGames}
                emptyMessage={'Loading...'}
                canPurchaseGames={true}
            />
        </section>
    );
}
