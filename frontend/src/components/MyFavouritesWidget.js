export default function MyFavouritesWidget() {
    return (
        <section id='myfavourites-widget'>
            <header>
                <h2>My Favourites</h2>
            </header>
            <div id='myfavourites-widget-gameslist'>
                <article>
                    <figure>
                        <img
                            src='https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg?t=1678296348'
                            alt=''
                        />
                    </figure>
                    <section>
                        <h3>Grand Theft Auto V</h3>
                        <div className='tag-section'>
                            <p>Action</p>
                            <p>RPG</p>
                        </div>
                    </section>
                </article>
                <article>
                    <figure>
                        <img
                            src='https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg?t=1671485009'
                            alt=''
                        />
                    </figure>
                    <section>
                        <h3>Red Dead Redemption 2</h3>
                        <div className='tag-section'>
                            <p>RPG</p>
                            <p>Action</p>
                            <p>Fantasy</p>
                        </div>
                    </section>
                </article>
                <article>
                    <figure>
                        <img
                            src='https://cdn.akamai.steamstatic.com/steam/apps/1222670/header.jpg?t=1679000582'
                            alt=''
                        />
                    </figure>
                    <section>
                        <h3>The Sims&trade; 4</h3>
                        <div className='tag-section'>
                            <p>Simulation</p>
                            <p>Adventure</p>
                        </div>
                    </section>
                </article>
                <article>
                    <figure>
                        <img
                            src='https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg?t=1675178392'
                            alt=''
                        />
                    </figure>
                    <section>
                        <h3>The Witcher&reg; 3: Wild Hunt</h3>
                        <div className='tag-section'>
                            <p>Adventure</p>
                            <p>Action</p>
                            <p>Fantasy</p>
                        </div>
                    </section>
                </article>
                <article>
                    <figure>
                        <img
                            src='https://cdn.akamai.steamstatic.com/steam/apps/489830/header.jpg?t=1650909796'
                            alt=''
                        />
                    </figure>
                    <section>
                        <h3>The Elder Scrolls V: Skyrim Special Edition</h3>
                        <div className='tag-section'>
                            <p>Adventure</p>
                            <p>Action</p>
                            <p>Fantasy</p>
                        </div>
                    </section>
                </article>
                <article>
                    <figure>
                        <img
                            src='https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg?t=1680840402'
                            alt=''
                        />
                    </figure>
                    <section>
                        <h3>Resident Evil 4</h3>
                        <div className='tag-section'>
                            <p>RPG</p>
                            <p>Strategy</p>
                            <p>Horror</p>
                        </div>
                    </section>
                </article>
            </div>
        </section>
    );
}
