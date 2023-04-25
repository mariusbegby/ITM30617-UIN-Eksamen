import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';

export default function Header() {
    return (
        <header id='navbar-header'>
            <nav id='nav-mobile'>
                <MobileNav></MobileNav>
            </nav>

            <nav id='nav-desktop'>
                <DesktopNav></DesktopNav>
            </nav>
        </header>
    );
}
