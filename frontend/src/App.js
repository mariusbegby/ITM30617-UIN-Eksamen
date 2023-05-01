/* Import packages */
import { Route, Routes } from 'react-router-dom';

/* Import contexts */
import { MyGamesProvider } from './contexts/MyGamesContext';
import { FavouritesProvider } from './contexts/FavouritesContext';
import { LoginProvider } from './contexts/LoginContext';

/* Import components */
import PageLayout from './pages/PageLayout';
import Dashboard from './pages/Dashboard';
import MyFavourites from './pages/MyFavourites';
import GameShop from './pages/GameShop';
import MyGames from './pages/MyGames';
import GamePage from './pages/GamePage';
import Login from './pages/Login';

// Import compiled CSS
import './css/main.css';

function App() {
    return (
        <LoginProvider>
            <MyGamesProvider>
                <FavouritesProvider>
                    <Routes>
                        <Route element={<PageLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path='/gameshop' element={<GameShop />} />
                            <Route path='/game/:id' element={<GamePage />} />
                            <Route path='/mygames' element={<MyGames />} />
                            <Route
                                path='/favourites'
                                element={<MyFavourites />}
                            />
                            <Route path='/login' element={<Login />} />
                        </Route>
                    </Routes>
                </FavouritesProvider>
            </MyGamesProvider>
        </LoginProvider>
    );
}

export default App;
