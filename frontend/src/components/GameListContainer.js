import GameCard from './GameCard';

export default function GameListContainer({
    games,
    emptyMessage,
    maxItems,
    canPurchaseGames = false
}) {
    const displayedGames = maxItems ? games.slice(0, maxItems) : games;

    return (
        <div className='gameslist'>
            {displayedGames.length > 0 ? (
                displayedGames.map((game) => {
                    return (
                        <GameCard
                            key={game.slug}
                            gameObject={game}
                            canBePurchased={canPurchaseGames}></GameCard>
                    );
                })
            ) : (
                <h3>{emptyMessage}</h3>
            )}
        </div>
    );
}
