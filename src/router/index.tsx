import { Route, Routes, BrowserRouter } from 'react-router-dom'
import FavoritesRoute from './FavoritesRoute'

import HomeRoute from './HomeRoute'

export default function AppRouter() {
    return <BrowserRouter>
        <Routes>
            <Route path="/*" element={<HomeRoute />} />
            <Route path="/favorites" element={<FavoritesRoute />} />
        </Routes>

    </BrowserRouter>
}
