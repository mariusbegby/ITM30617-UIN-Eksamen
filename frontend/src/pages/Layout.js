import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Layout() {
    return (
        <div id='grid-container'>
            <Header></Header>
            <Outlet />
            <Footer></Footer>
        </div>
    );
}
