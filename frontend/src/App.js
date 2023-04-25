import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import GameShop from './pages/GameShop';
import GamePage from './pages/GamePage';
import MyGames from './pages/MyGames';
import MyFavourites from './pages/MyFavourites';
import Login from './pages/Login';
import './css/main.css';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path='/gameshop' element={<GameShop />} />
                <Route path='/game/:id' element={<GamePage />} />
                <Route path='/mygames' element={<MyGames />} />
                <Route path='/favourites' element={<MyFavourites />} />
                <Route path='/login' element={<Login />} />
            </Route>
        </Routes>
    );
}

export default App;
