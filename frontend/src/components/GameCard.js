import { Link } from 'react-router-dom';

export default function GameCard({ gameObject, canBePurchased = false }) {
    let gameImageUrl = gameObject.background_image
        ? gameObject.background_image
        : '/placeholder.png';

    return (
        <article className='gamecard'>
            <Link to={'/game/' + gameObject.slug}>
                <figure>
                    <img src={gameImageUrl} alt='' />
                </figure>
                <section>
                    <h3>{gameObject.name}</h3>
                    <div className='tag-section'>
                        {gameObject.genres.slice(0, 5).map((genre, index) => (
                            <p key={index}>{genre.name}</p>
                        ))}
                    </div>
                    {canBePurchased ? (
                        <button
                            className='link-button'
                            href={'/game/' + gameObject.slug}>
                            Buy
                        </button>
                    ) : (
                        ''
                    )}
                </section>
            </Link>
        </article>
    );
}
