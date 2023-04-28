
import GameCard from '../components/GameCard';

export default function GamesList({ games, emptyMessage, maxItems }) {
    const displayedGames = maxItems ? games.slice(0, maxItems) : games;

    return (
        <section className='gameslist'>
            {displayedGames.length > 0 ? (
                displayedGames.map((game) => {
                    return (
                        <GameCard key={game.slug} gameObject={game}></GameCard>
                    );
                })
            ) : (
                <h3>{emptyMessage}</h3>
            )}
        </section>
    );
}
