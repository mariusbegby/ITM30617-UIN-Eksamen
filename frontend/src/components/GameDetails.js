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
                        alt=''
                    />
                </figure>
            </section>
            <section>
                <header>
                    <h1>{gameInfo.name}</h1>
                    <div id='rating-favourite-section'>
                        <span className='textfont-strong rating-tag'>
                            ★ {gameInfo.rating}
                        </span>
                        {loggedInUser && inLibrary ? (
                            <button
                                className={
                                    isFavorited
                                        ? 'textfont-strong favourite-button favourited'
                                        : 'textfont-strong favourite-button'
                                }
                                onClick={toggleFavourite}>
                                {isFavorited ? '❤ Favourited' : '❤ Favourite'}
                            </button>
                        ) : (
                            <span className='textfont-strong notinlibrary-tag'>
                                Not in library
                            </span>
                        )}
                    </div>
                </header>
                <p className='margin-bottom'>
                    <i>{gameInfo.description_raw}</i>
                </p>
                <p className='margin-bottom'>
                    {inLibrary ? (
                        <span className='textfont-strong inlibrary-tag'>
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
                            className='link-button'>
                            Buy
                        </a>
                    ) : (
                        <span className='textfont-strong notinlibrary-tag'>
                            No store url
                        </span>
                    )}
                </p>
                <p>
                    <span className='textfont-strong'>Genres: </span>
                    {gameInfo.genres?.length > 0
                        ? gameInfo.genres.map((genre) => genre.name).join(', ')
                        : 'Unknown'}
                </p>
                <p>
                    <span className='textfont-strong'>Published: </span>
                    {new Date(gameInfo.released).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </p>
                <p>
                    <span className='textfont-strong'>Publishers: </span>
                    {gameInfo.publishers?.length > 0
                        ? gameInfo.publishers
                              .map((publisher) => publisher.name)
                              .join(', ')
                        : 'Unknown'}
                </p>
                <p>
                    <span className='textfont-strong'>Developers: </span>
                    {gameInfo.developers?.length > 0
                        ? gameInfo.developers
                              .map((developer) => developer.name)
                              .join(', ')
                        : 'Unknown'}
                </p>
                <p>
                    <span className='textfont-strong'>Platforms: </span>
                    {gameInfo.platforms?.length > 0
                        ? gameInfo.platforms
                              .map((platform) => platform.platform.name)
                              .join(', ')
                        : 'Unknown'}
                </p>
                <p>
                    <span className='textfont-strong'>
                        Available in stores:{' '}
                    </span>{' '}
                    {gameInfo.stores?.length > 0
                        ? gameInfo.stores
                              .map((store) => store.store.name)
                              .join(', ')
                        : 'Unknown'}
                </p>
                <p>
                    <span className='textfont-strong'>Tags: </span>{' '}
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
