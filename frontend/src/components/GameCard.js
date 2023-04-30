import { Link } from 'react-router-dom';

export default function GameCard({ gameObject, canBePurchased = false }) {
    let gameImageUrl = gameObject.background_image
        ? gameObject.background_image
        : '/placeholder.png';

    function handleButtonClick(e) {
        e.preventDefault();
        window.location.href = `/game/${gameObject.slug}`;
    }

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
                <section>
                    <h3>{gameObject.name}</h3>
                    <ul className='genre-list'>
                        {gameObject.genres.slice(0, 5).map((genre, index) => (
                            <li key={index}>{genre.name}</li>
                        ))}
                    </ul>
                    {canBePurchased ? (
                        <button
                            className='link-button'
                            onClick={handleButtonClick}>
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
