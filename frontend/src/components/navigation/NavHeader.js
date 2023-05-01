/* Import packages */
import React, { useContext } from 'react';

/* Import contexts */
import { LoginContext } from '../../contexts/LoginContext';

/* Import components */
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';

export default function NavHeader() {
    const { loggedInUser } = useContext(LoginContext);

    return (
        <header id='navbar-header'>
            <MobileNav loggedInUser={loggedInUser}></MobileNav>
            <DesktopNav loggedInUser={loggedInUser}></DesktopNav>
        </header>
    );
}
