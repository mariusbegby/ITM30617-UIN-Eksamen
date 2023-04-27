export default function DesktopNav({ loggedInUser }) {
    return (
        <>
            <section id='header-left'>
                <ul>
                    <img
                        src='/logo192.png'
                        id='header-logo'
                        alt='MACs GameHub logo'
                    />
                    <li>
                        <a href='/' id='logo-title'>
                            <h2>MACs GameHub</h2>
                        </a>
                    </li>
                </ul>
            </section>
            <section id='header-right'>
                <ul>
                    <li>
                        <a href='/gameshop'>Shop</a>
                    </li>

                    {loggedInUser ? (
                        <>
                            <li>
                                <a href='/mygames'>My Games</a>
                            </li>
                            <li>
                                <a href='/favourites'>Favourites</a>
                            </li>
                        </>
                    ) : (
                        <li>
                            <a href='/login'>Login</a>
                        </li>
                    )}
                </ul>
            </section>
        </>
    );
}
