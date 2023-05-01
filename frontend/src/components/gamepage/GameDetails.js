/* Import packages */
import { TagCloud } from 'react-tagcloud';

export default function GameDetails({
    gameInfo,
    inLibrary,
    isFavorited,
    toggleFavourite,
    loggedInUser,
    wordcloudData
}) {
    return (
        <>
            <section>
                <figure>
                    <img
                        src={gameInfo.background_image ?? '/placeholder.png'}
                        alt={`Video game poster for ${gameInfo.name}`}
                        width={900}
                        height={500}
                    />
                </figure>
            </section>
            <section id='game-details-section'>
                <header>
                    <h1>{gameInfo.name}</h1>
                    <div id='rating-favourite-section'>
                        <span className='text-bold rating-tag'>
                            ★ {gameInfo.rating}
                        </span>
                        {loggedInUser && inLibrary ? (
                            <button
                                className={
                                    isFavorited
                                        ? 'text-bold favourite-button favourited'
                                        : 'text-bold favourite-button'
                                }
                                onClick={toggleFavourite}>
                                {isFavorited ? '❤ Favourited' : '❤ Favourite'}
                            </button>
                        ) : loggedInUser ? (
                            <span className='text-bold info-tag'>
                                Not in library
                            </span>
                        ) : (
                            <span className='text-bold info-tag'>
                                Not logged in
                            </span>
                        )}
                    </div>
                </header>
                <p>
                    <i>{gameInfo.description_raw}</i>
                </p>
                <p>
                    {inLibrary ? (
                        <span className='text-bold info-tag'>
                            In Library{' '}
                            {gameInfo.hoursPlayed
                                ? ' - ' + gameInfo.hoursPlayed + ' hours'
                                : ''}
                        </span>
                    ) : gameInfo.steamUrl ? (
                        <a
                            href={gameInfo.steamUrl}
                            target='_blank'
                            rel='noreferrer'
                            className='buy-button'>
                            Buy
                        </a>
                    ) : (
                        <span className='text-bold info-tag'>No store url</span>
                    )}
                </p>
                <p>
                    <span className='text-bold'>Genres: </span>
                    {gameInfo.genres?.length > 0
                        ? gameInfo.genres.map((genre) => genre.name).join(', ')
                        : 'Unknown'}
                </p>
                <p>
                    <span className='text-bold'>Published: </span>
                    {new Date(gameInfo.released).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>
                <p>
                    <span className='text-bold'>Publishers: </span>
                    {gameInfo.publishers?.length > 0
                        ? gameInfo.publishers
                              .map((publisher) => publisher.name)
                              .join(', ')
                        : 'Unknown'}
                </p>
                <p>
                    <span className='text-bold'>Developers: </span>
                    {gameInfo.developers?.length > 0
                        ? gameInfo.developers
                              .map((developer) => developer.name)
                              .join(', ')
                        : 'Unknown'}
                </p>
                <p>
                    <span className='text-bold'>Platforms: </span>
                    {gameInfo.platforms?.length > 0
                        ? gameInfo.platforms
                              .map((platform) => platform.platform.name)
                              .join(', ')
                        : 'Unknown'}
                </p>
                <p>
                    <span className='text-bold'>Available in stores: </span>{' '}
                    {gameInfo.stores?.length > 0
                        ? gameInfo.stores
                              .map((store) => store.store.name)
                              .join(', ')
                        : 'Unknown'}
                </p>
                <p>
                    <span className='text-bold'>Tags: </span>{' '}
                </p>
                {gameInfo.tags?.length > 0 ? (
                    <TagCloud
                        minSize={10}
                        maxSize={28}
                        tags={wordcloudData}
                        colorOptions={{ luminosity: 'dark' }}
                    />
                ) : (
                    'None'
                )}
            </section>
        </>
    );
}
