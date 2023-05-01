/* Import packages */
import React, { useEffect, useContext } from 'react';

/* Import services */
import { getGameInfo } from '../../services/rawgApiClient';
import { getGamesByUser } from '../../services/sanityClient';

/* Import contexts */
import { MyGamesContext } from '../../contexts/MyGamesContext';

/* Import components */
import GameListContainer from '../GameListContainer';

export default function MyGamesWidget({ loggedInUser }) {
    const { myGames, setMyGames } = useContext(MyGamesContext);

    useEffect(() => {
        const fetchMyGames = async () => {
            let myGamesResults = await getGamesByUser(loggedInUser.email);

            let completeGameObjects = await Promise.all(
                myGamesResults.map(async (game) => {
                    let gameInfoFromApi = await getGameInfo(
                        game.gameRef.gameSlug
                    );
                    return {
                        apiId: game.gameRef.gameApiId,
                        name: game.gameRef.gameTitle,
                        slug: game.gameRef.gameSlug,
                        genres: game.gameRef.gameGenres.map((genre) => ({
                            name: genre.genreRef.genreName
                        })),
                        background_image: gameInfoFromApi.background_image
                    };
                })
            );

            setMyGames(completeGameObjects);
        };

        fetchMyGames();
    }, [loggedInUser, setMyGames]);

    return (
        <section id='mygames-widget' aria-labelledby='mygames-widget-title'>
            <header className='widget-header'>
                <h2 id='mygames-widget-title'>
                    My Games-Library - {myGames.length} Games
                </h2>
                <a href='/mygames' className='link-button'>
                    View All
                </a>
            </header>
            <GameListContainer
                games={myGames}
                emptyMessage={'You have no games in your library.'}
                maxItems={4}
            />
        </section>
    );
}
