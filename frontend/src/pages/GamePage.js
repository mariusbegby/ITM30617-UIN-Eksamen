// Route: /game/[gametitle-as-slug]

const gameObject = {
    title: 'Grand Theft Auto V',
    slug: 'grand-theft-auto-v',
    tags: ['Action', 'RPG', 'Multiplayer', 'Open World'],
    genres: ['Action', 'RPG'],
    imageUrl:
        'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg?t=1678296348',
    summary:
        'Summary lorem ipsum dolor sit amet lorem. Ipsum dolor sit amet lorem ipsum dolor sit amet.',
    published: '2013-09-17T00:00:00.000Z',
    publisher: 'Rockstar Games',
    platforms: ['PC', 'Xbox One', 'Playstation 4'],
    rating: 4.5,
    favorited: true,
    bought: true
};

export default function GamePage() {
    return (
        <main id='game-page'>
            <section>
                <figure>
                    <img src={gameObject.imageUrl} alt='' />
                </figure>
            </section>
            <section>
                <header>
                    <h1>{gameObject.title}</h1>
                    <div id="rating-favourite-section">
                        <span className='textfont-strong rating-tag'>★ {gameObject.rating}</span>
                        <button className={gameObject.favorited ? 'textfont-strong favourite-button favourited' : 'textfont-strong favourite-button'}>{gameObject.favorited ? '❤ Favourited' : '❤ Favourite'}</button>
                    </div>
                </header>
                <p className='textfont-strong'>{gameObject.summary}</p>
                <p>
                    <span className='textfont-strong'>Genres: </span>{' '}
                    {gameObject.genres.join(', ')}
                </p>
                <p>
                    <span className='textfont-strong'>Published: </span>
                    {new Date(gameObject.published).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p>
                    <span className='textfont-strong'>Publisher: </span>
                    {gameObject.publisher}
                </p>
                <p>
                    <span className='textfont-strong'>Platforms: </span>
                    {gameObject.platforms.join(', ')}
                </p>
                <div className='tag-section'>
                    <span className='textfont-strong'>Tags: </span>
                    {gameObject.tags.map((tag, index) => (
                        <p key={index}>{tag}</p>
                    ))}
                </div>
            </section>
        </main>
    );
}
