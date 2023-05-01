/* Import components */
import GameCard from './GameCard';

export default function GameListContainer({
    games,
    emptyMessage,
    maxItems,
    canPurchaseGames = false
}) {
    // If maxItems is set, only display the first x number of games defined by maxItems
    // Used to limit amount of games shown for different components
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
