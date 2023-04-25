// Route: /
import GameShopWidget from '../components/GameShopWidget';
import MyGamesWidget from '../components/MyGamesWidget';
import MyFavouritesWidget from '../components/MyFavouritesWidget';

export default function Dashboard() {
    return (
        <main id='dashboard-page'>
            <GameShopWidget></GameShopWidget>
            <MyGamesWidget></MyGamesWidget>
            <MyFavouritesWidget></MyFavouritesWidget>
        </main>
    );
}
