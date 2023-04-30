// Route: /login
import React, { useContext } from 'react';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import { LoginContext } from '../../contexts/LoginContext';

export default function NavHeader() {
    const { loggedInUser } = useContext(LoginContext);

    return (
        <header id='navbar-header'>
            <MobileNav loggedInUser={loggedInUser}></MobileNav>

            <DesktopNav loggedInUser={loggedInUser}></DesktopNav>
        </header>
    );
}
