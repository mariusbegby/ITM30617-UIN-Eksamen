export default function DesktopNav({ loggedInUser }) {
    return (
        <nav id='nav-desktop' aria-label='Desktop main navigation'>
            <div id='header-left'>
                <img
                    src='/logo192.png'
                    id='header-logo'
                    alt='MACs GameHub logo'
                    width={40}
                    height={40}
                />
                <a href='/' id='logo-title'>
                    <h2>MACs GameHub</h2>
                </a>
            </div>
            <div id='header-right'>
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
                            <li>
                                <a href='/login'>Account</a>
                            </li>
                        </>
                    ) : (
                        <li>
                            <a href='/login'>Login</a>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
