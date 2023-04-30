import { Link } from 'react-router-dom';

export default function GameCard({ gameObject, canBePurchased = false }) {
    let gameImageUrl = gameObject.background_image
        ? gameObject.background_image
        : '/placeholder.png';

    return (
        <article className='gamecard'>
            <Link to={'/game/' + gameObject.slug}>
                <figure>
                    <img
                        src={gameImageUrl}
                        alt={`Video game poster for ${gameObject.name}`}
                    />
                </figure>
                <section>
                    <h3>{gameObject.name}</h3>
                    <div className='genre-list'>
                        {gameObject.genres.slice(0, 5).map((genre, index) => (
                            <p key={index}>{genre.name}</p>
                        ))}
                    </div>
                    {canBePurchased ? (
                        <button
                            className='link-button'
                            href={'/game/' + gameObject.slug}>
                            View or buy
                        </button>
                    ) : (
                        ''
                    )}
                </section>
            </Link>
        </article>
    );
}
