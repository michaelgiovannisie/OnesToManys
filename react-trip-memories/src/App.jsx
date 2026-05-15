import { BrowserRouter, Routes, Route } from "react-router-dom";
import TripsPage from "./pages/TripsPage";
import DestinationsPage from "./pages/DestinationsPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TripsPage />} />
                <Route path="/trips/:id" element={<DestinationsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;