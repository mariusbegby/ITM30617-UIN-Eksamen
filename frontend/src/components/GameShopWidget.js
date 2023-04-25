import GameCard from './GameCard';

const gameObject = {
    title: 'Grand Theft Auto V',
    slug: 'grand-theft-auto-v',
    tags: ['Action', 'RPG'],
    imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg?t=1678296348',
    bought: false
};

export default function GameShopWidget() {
    return (
        <section id='gameshop-widget'>
            <header>
                <h2>Gameshop</h2>
                <a href='/gameshop' className='link-button'>
                    Visit Shop
                </a>
            </header>
            <div id='gameshop-widget-gameslist' className='gameslist'>
                <GameCard key='1' gameObject={gameObject}></GameCard>
                <GameCard key='2' gameObject={gameObject}></GameCard>
                <GameCard key='3' gameObject={gameObject}></GameCard>
            </div>
        </section>
    );
}
