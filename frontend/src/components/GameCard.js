import { Link } from 'react-router-dom';

export default function GameCard({ gameObject }) {
    return (
        <article className='gamecard'>
            <Link to={'/game/' + gameObject.slug}>
                <figure>
                    <img src={gameObject.imageUrl} alt='' />
                </figure>
                <section>
                    <h3>{gameObject.title}</h3>
                    <div className='tag-section'>
                        {gameObject.tags.map((tag, index) => (
                            <p key={index}>{tag}</p>
                        ))}
                    </div>
                    {gameObject.bought ? (
                        ''
                    ) : (
                        <a className='link-button' href='/'>
                            Buy
                        </a>
                    )}
                </section>
            </Link>
        </article>
    );
}
