import { BrowserRouter, Routes, Route } from "react-router-dom";
import TripsPage from "./pages/TripsPage";
import DestinationsPage from "./pages/DestinationsPage";
import PlacesPage from "./pages/PlacesPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TripsPage />} />
                <Route path="/trips/:id" element={<DestinationsPage />} />
                <Route path="/destinations/:id" element={<PlacesPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;