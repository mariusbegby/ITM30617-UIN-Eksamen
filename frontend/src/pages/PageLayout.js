import { Outlet } from 'react-router-dom';
import NavHeader from '../components/navigation/NavHeader';
import Footer from '../components/navigation/Footer';

export default function PageLayout() {
    return (
        <div id='grid-container'>
            <NavHeader></NavHeader>
            <Outlet />
            <Footer></Footer>
        </div>
    );
}
