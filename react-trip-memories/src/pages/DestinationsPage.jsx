import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTripById } from "../api/tripsApi";

function DestinationsPage() {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
        useEffect(() => {
            getTripById(id).then(data => {
                setTrip(data);
            });
        }, [id]);

    return (
        <div className="container mt-4">
            <Link className="btn btn-outline-secondary mb-3" to="/">
                ← Back to Trips
            </Link>

            {trip && (
                <>
                    <h1 className="mb-4 text-center">{trip.title}</h1>

                    <div className="card p-3 mb-4 shadow-sm">
                        <p><strong>Status:</strong> {trip.status}</p>
                        <p><strong>Budget:</strong> ${trip.budget}</p>
                        <p><strong>Start Date:</strong> {trip.startDate}</p>
                        <p><strong>End Date:</strong> {trip.endDate}</p>
                        <p><strong>Notes:</strong> {trip.notes || ""}</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default DestinationsPage;