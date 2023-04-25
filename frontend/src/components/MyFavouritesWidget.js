import GameCard from './GameCard';

const gameObject = {
    title: 'Grand Theft Auto V',
    slug: 'grand-theft-auto-v',
    tags: ['Action', 'RPG'],
    imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg?t=1678296348',
    bought: true
};

export default function MyFavouritesWidget() {
    return (
        <section id='myfavourites-widget'>
            <header>
                <h2>My Favourites</h2>
            </header>
            <div id='myfavourites-widget-gameslist'>
                <GameCard key='1' gameObject={gameObject}></GameCard>
                <GameCard key='2' gameObject={gameObject}></GameCard>
                <GameCard key='3' gameObject={gameObject}></GameCard>
                <GameCard key='4' gameObject={gameObject}></GameCard>
                <GameCard key='5' gameObject={gameObject}></GameCard>
                <GameCard key='6' gameObject={gameObject}></GameCard>
                <GameCard key='7' gameObject={gameObject}></GameCard>
                <GameCard key='8' gameObject={gameObject}></GameCard>
                <GameCard key='9' gameObject={gameObject}></GameCard>
            </div>
        </section>
    );
}
