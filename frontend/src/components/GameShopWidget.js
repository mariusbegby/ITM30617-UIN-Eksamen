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
                <article>
                    <figure>
                        <img src='https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg?t=1668125812' alt='' />
                    </figure>
                    <section>
                        <h3>Counter-Strike: Global Offensive</h3>
                        <div className="tag-section">
                            <p>Action</p>
                            <p>RPG</p>
                        </div>
                        <a className='link-button' href='/'>
                            Buy
                        </a>
                    </section>
                </article>
                <article>
                    <figure>
                        <img src='https://cdn.akamai.steamstatic.com/steam/apps/1774580/header.jpg?t=1681406818' alt='' />
                    </figure>
                    <section>
                        <h3>STAR WARS Jedi: Survivor&trade;</h3>
                        <div className="tag-section">
                            <p>Action</p>
                            <p>Adventure</p>
                        </div>
                        <a className='link-button' href='/'>
                            Buy
                        </a>
                    </section>
                </article>
                <article>
                    <figure>
                        <img src='https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg?t=1680026109' alt='' />
                    </figure>
                    <section>
                        <h3>Cyberpunk 2077</h3>
                        <div className="tag-section">
                            <p>Cyberpunk</p>
                            <p>RPG</p>
                            <p>Action</p>
                        </div>
                        <a className='link-button' href='/'>
                            Buy
                        </a>
                    </section>
                </article>
            </div>
        </section>
    );
}
