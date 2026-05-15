import { useEffect, useState } from "react";
import { getTrips } from "../api/tripsApi";

function TripsPage() {
    const [trips, setTrips] = useState([]);
    useEffect(() => {
        getTrips().then(data => {
            setTrips(data);
        });
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center">Trip Memories</h1>
            {trips.map(trip => (
                <div className="card p-3 mb-3 shadow-sm" key={trip.id}>
                    <h2>{trip.title}</h2>
                    <p>Status: {trip.status}</p>
                    <p>Budget: ${trip.budget}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default TripsPage;