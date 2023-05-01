/* Import packages */
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
                        width={425}
                        height={225}
                    />
                </figure>
                <h3>{gameObject.name}</h3>
                <ul className='genre-list'>
                    {gameObject.genres.slice(0, 5).map((genre, index) => (
                        <li key={index}>{genre.name}</li>
                    ))}
                </ul>
                {canBePurchased ? (
                    <span className='link-button'>View or buy</span>
                ) : (
                    ''
                )}
            </Link>
        </article>
    );
}
