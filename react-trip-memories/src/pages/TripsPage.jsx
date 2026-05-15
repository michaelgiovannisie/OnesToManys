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
        <div>
            <h1>Trip Memories</h1>
            {trips.map(trip => (
                <div key={trip.id}>
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