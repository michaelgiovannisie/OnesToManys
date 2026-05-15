import { useEffect, useState } from "react";
import { getTrips, createTrip, deleteTrip, updateTrip } from "../api/tripsApi";
import { Link } from "react-router-dom";

function TripsPage() {
    const [trips, setTrips] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newTrip, setNewTrip] = useState({
        title: "",
        budget: "",
        startDate: "",
        endDate: "",
        status: "",
        notes: ""
    });
    const [editingTripId, setEditingTripId] = useState(null);

    const [editTrip, setEditTrip] = useState({
        title: "",
        budget: "",
        startDate: "",
        endDate: "",
        status: "",
        notes: ""
    });

    useEffect(() => {
        getTrips().then(data => {
            setTrips(data);
        });
    }, []);

    function handleCreateTrip(event) {
        event.preventDefault();
        createTrip(newTrip).then(() => {
            getTrips().then(data => {
                setTrips(data);
            });
            setNewTrip({
                title: "",
                budget: "",
                startDate: "",
                endDate: "",
                status: "",
                notes: ""
            });
            setShowCreateForm(false);
        });
    }

    function handleDeleteTrip(id) {
        deleteTrip(id).then(() => {
            getTrips().then(data => {
                setTrips(data);
            });
        });
    }

    function handleUpdateTrip() {
        updateTrip(editingTripId, editTrip).then(() => {
            getTrips().then(data => {
                setTrips(data);
            });

            setEditingTripId(null);
        });
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center">Memento</h1>
            <button
                className="btn btn-success mb-3"
                onClick={() => setShowCreateForm(!showCreateForm)}
            >
                Create Trip
            </button>
            {showCreateForm && (
    <form className="card p-3 mb-4 shadow-sm" onSubmit={handleCreateTrip}>
            <input
                className="form-control mb-3"
                placeholder="Trip Title"
                value={newTrip.title}
                onChange={event => setNewTrip({ ...newTrip, title: event.target.value })}
            />
            <input
                className="form-control mb-3"
                type="number"
                placeholder="Budget"
                value={newTrip.budget}
                onChange={event =>
                    setNewTrip({
                        ...newTrip,
                        budget: event.target.value
                    })
                }
            />
            <input
                className="form-control mb-3"
                type="date"
                value={newTrip.startDate}
                onChange={event =>
                    setNewTrip({
                        ...newTrip,
                        startDate: event.target.value
                    })
                }
            />
            <input
                className="form-control mb-3"
                type="date"
                value={newTrip.endDate}
                onChange={event =>
                    setNewTrip({
                        ...newTrip,
                        endDate: event.target.value
                    })
                }
            />
            <input
                className="form-control mb-3"
                placeholder="Status"
                value={newTrip.status}
                onChange={event =>
                    setNewTrip({
                        ...newTrip,
                        status: event.target.value
                    })
                }
            />
            <textarea
                className="form-control mb-3"
                placeholder="Trip Notes"
                value={newTrip.notes}
                onChange={event =>
                    setNewTrip({
                        ...newTrip,
                        notes: event.target.value
                    })
                }
            />
            <button className="btn btn-primary" type="submit">
                Add Trip
            </button>
        </form>
    )}
            {trips.map(trip => (
                <div className="card p-3 mb-3 shadow-sm" key={trip.id}>
                    <h2>
                        <Link to={`/trips/${trip.id}`}>
                            {trip.title}
                        </Link>
                    </h2>
                    <p>Status: {trip.status}</p>
                    <p>Budget: ${trip.budget}</p>
                    <p>Start Date: {trip.startDate}</p>
                    <p>End Date: {trip.endDate}</p>
                    <p>Notes: {trip.notes || ""}</p>
                    
                    <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => {
                            setEditingTripId(trip.id);
                            setEditTrip({
                                title: trip.title,
                                budget: trip.budget,
                                startDate: trip.startDate,
                                endDate: trip.endDate,
                                status: trip.status,
                                notes: trip.notes || ""
                            });
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteTrip(trip.id)}
                    >
                        Delete
                    </button>
                    {editingTripId === trip.id && (
                        <form className="card p-3 mt-3">
                            <input
                                className="form-control mb-2"
                                value={editTrip.title}
                                onChange={event =>
                                    setEditTrip({
                                        ...editTrip,
                                        title: event.target.value
                                    })
                                }
                            />

                            <input
                                className="form-control mb-2"
                                value={editTrip.status}
                                onChange={event =>
                                    setEditTrip({
                                        ...editTrip,
                                        status: event.target.value
                                    })
                                }
                            />

                            <input
                                className="form-control mb-2"
                                type="number"
                                value={editTrip.budget}
                                onChange={event =>
                                    setEditTrip({
                                        ...editTrip,
                                        budget: event.target.value
                                    })
                                }
                            />

                            <input
                                className="form-control mb-2"
                                type = "date"
                                value={editTrip.startDate}
                                onChange={event =>
                                    setEditTrip({
                                        ...editTrip,
                                        startDate: event.target.value
                                    })
                                }
                            />

                            <input
                                className="form-control mb-2"
                                type = "date"
                                value={editTrip.endDate}
                                onChange={event =>
                                    setEditTrip({
                                        ...editTrip,
                                        endDate: event.target.value
                                    })
                                }
                            />

                            <textarea
                                className="form-control mb-2"
                                value={editTrip.notes}
                                onChange={event =>
                                    setEditTrip({
                                        ...editTrip,
                                        notes: event.target.value
                                    })
                                }
                            />

                            <button
                                className="btn btn-primary btn-sm me-2"
                                type="button"
                                onClick={handleUpdateTrip}
                            > Save
                            </button>

                            <button
                                className="btn btn-secondary btn-sm"
                                type="button"
                                onClick={() => setEditingTripId(null)}
                            >
                                Cancel
                            </button>
                        </form>
                    )}
                </div>
            ))}
        </div>
    );
}



export default TripsPage;