export default function MobileNav() {
    return (
        <section id='header-centered'>
            <ul>
                <li>
                    <a href='/'>
                        <img
                            src='/logo192.png'
                            id='header-logo'
                            alt='MACs GameHub logo'
                        />
                    </a>
                </li>
                <li>
                    <a href='/gameshop'>Shop</a>
                </li>
                <li>
                    <a href='/mygames'>My Games</a>
                </li>
                <li>
                    <a href='/favourites'>Favourites</a>
                </li>
                <li>
                    <a href='/login'>Login</a>
                </li>
            </ul>
        </section>
    );
}
