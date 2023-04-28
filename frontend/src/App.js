// Import routes and page components
import { Route, Routes } from 'react-router-dom';
import PageLayout from './pages/PageLayout';
import Dashboard from './pages/Dashboard';
import MyFavourites from './pages/MyFavourites';
import GameShop from './pages/GameShop';
import MyGames from './pages/MyGames';
import GamePage from './pages/GamePage';
import Login from './pages/Login';

// Import contexts for global state
import { MyGamesProvider } from './contexts/MyGamesContext';
import { FavouritesProvider } from './contexts/FavouritesContext';
import { LoginProvider } from './contexts/LoginContext';

// Import compiled CSS
import './css/main.css';

function App() {
    const providers = [LoginProvider, MyGamesProvider, FavouritesProvider];

    const AppRoutes = (
        <Routes>
            <Route element={<PageLayout />}>
                <Route index element={<Dashboard />} />
                <Route path='/gameshop' element={<GameShop />} />
                <Route path='/game/:id' element={<GamePage />} />
                <Route path='/mygames' element={<MyGames />} />
                <Route path='/favourites' element={<MyFavourites />} />
                <Route path='/login' element={<Login />} />
            </Route>
        </Routes>
    );

    return providers.reduce(
        (children, Provider) => <Provider>{children}</Provider>,
        AppRoutes
    );
}

export default App;
