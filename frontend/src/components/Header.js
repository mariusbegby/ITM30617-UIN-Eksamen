// Route: /login
import React, { useContext } from 'react';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import { LoginContext } from '../contexts/LoginContext';

export default function Header() {
    const { loggedInUser } = useContext(LoginContext);

    return (
        <header id='navbar-header'>
            <nav id='nav-mobile'>
                <MobileNav loggedInUser={loggedInUser}></MobileNav>
            </nav>

            <nav id='nav-desktop'>
                <DesktopNav loggedInUser={loggedInUser}></DesktopNav>
            </nav>
        </header>
    );
}
