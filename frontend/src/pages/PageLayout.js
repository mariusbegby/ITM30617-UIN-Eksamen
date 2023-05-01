/* Import packages */
import { Outlet } from 'react-router-dom';

/* Import components */
import NavHeader from '../components/navigation/NavHeader';
import Footer from '../components/navigation/Footer';

// <Outlet /> component will render component based on route path (/, /mygames, /favourites, etc.) specified in App.js
export default function PageLayout() {
    return (
        <div id='grid-container'>
            <NavHeader></NavHeader>
            <Outlet />
            <Footer></Footer>
        </div>
    );
}
