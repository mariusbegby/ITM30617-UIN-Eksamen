
import GameCard from '../components/GameCard';

export default function GamesList({ games, emptyMessage }) {
    return (
        <section className='gameslist'>
            {games.length > 0 ? (
                games.map((game) => {
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
