import { useEffect, useState } from "react";
import { getDestinationsByTripId, createDestination, deleteDestination, updateDestination } from "../api/destinationsApi";
import { Link, useParams } from "react-router-dom";

function DestinationsPage() {
    const { id } = useParams();
    const [destinations, setDestinations] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newDestination, setNewDestination] = useState({
        city: "",
        country: "",
        budget: "",
        arrivalDate: "",
        departureDate: "",
        status: "",
        notes: ""
    });
    const [editingDestinationId, setEditingDestinationId] = useState(null);

    const [editDestination, setEditDestination] = useState({
        city: "",
        country: "",
        budget: "",
        arrivalDate: "",
        departureDate: "",
        status: "",
        notes: ""
    });

    useEffect(() => {
        getDestinationsByTripId(id).then(data => {
            setDestinations(
                data.sort((a, b) =>
                    new Date(a.arrivalDate) - new Date(b.arrivalDate)
                )
            );
        });
    }, [id]);

    function handleCreateDestination(event) {
        event.preventDefault();
        createDestination({
        ...newDestination,
        trip: {
            id: id
        }}).then(() => {
            getDestinationsByTripId(id).then(data => {
            setDestinations(
                data.sort((a, b) =>
                    new Date(a.arrivalDate) - new Date(b.arrivalDate)
                )
            );
            });
            setNewDestination({
                city: "",
                country: "",
                budget: "",
                arrivalDate: "",
                departureDate: "",
                status: "",
                notes: ""
            });
            setShowCreateForm(false);
        });
    }

    function handleDeleteDestination(destinationId) {
        deleteDestination(destinationId).then(() => {
            getDestinationsByTripId(id).then(data => {
                setDestinations(
                    data.sort((a, b) =>
                        new Date(a.arrivalDate) - new Date(b.arrivalDate)
                    )
                );
            });
        });
    }

    function handleUpdateDestination() {
        updateDestination(editingDestinationId, {
            ...editDestination,
            trip: {
                id: id
            }
        }).then(() => {
            getDestinationsByTripId(id).then(data => {
                setDestinations(
                    data.sort((a, b) =>
                        new Date(a.arrivalDate) - new Date(b.arrivalDate)
                    )
                );
            });

            setEditingDestinationId(null);
        });
    }

    return (
        <div className="container mt-4">
            <Link className="btn btn-outline-secondary mb-3" to="/">
                ← Back to Trips
            </Link>
            <h1 className="mb-4 text-center">Destinations</h1>
            <button
                className="btn btn-success mb-3"
                onClick={() => setShowCreateForm(!showCreateForm)}
            >
                Add Destination
            </button>
            {showCreateForm && (
    <form className="card p-3 mb-4 shadow-sm" onSubmit={handleCreateDestination}>
            <input
                className="form-control mb-3"
                placeholder="City"
                value={newDestination.city}
                onChange={event => setNewDestination({ ...newDestination, city: event.target.value })}
            />
            <input
                className="form-control mb-3"
                placeholder="Country"
                value={newDestination.country}
                onChange={event => setNewDestination({ ...newDestination, country: event.target.value })}
            />
            <input
                className="form-control mb-3"
                type="number"
                placeholder="Budget"
                value={newDestination.budget}
                onChange={event =>
                    setNewDestination({
                        ...newDestination,
                        budget: event.target.value
                    })
                }
            />
            <input
                className="form-control mb-3"
                type="date"
                value={newDestination.arrivalDate}
                onChange={event =>
                    setNewDestination({
                        ...newDestination,
                        arrivalDate: event.target.value
                    })
                }
            />
            <input
                className="form-control mb-3"
                type="date"
                value={newDestination.departureDate}
                onChange={event =>
                    setNewDestination({
                        ...newDestination,
                        departureDate: event.target.value
                    })
                }
            />
            <input
                className="form-control mb-3"
                placeholder="Status"
                value={newDestination.status}
                onChange={event =>
                    setNewDestination({
                        ...newDestination,
                        status: event.target.value
                    })
                }
            />
            <textarea
                className="form-control mb-3"
                placeholder="Notes"
                value={newDestination.notes}
                onChange={event =>
                    setNewDestination({
                        ...newDestination,
                        notes: event.target.value
                    })
                }
            />
            <button className="btn btn-primary" type="submit">
                Add Destination
            </button>
        </form>
    )}
            {destinations.map(destination => (
                <div className="card p-3 mb-3 shadow-sm" key={destination.id}>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <h2 className="mb-0">
                            <Link to={`/destinations/${destination.id}?tripId=${id}`}>
                                {destination.city}, {destination.country}
                            </Link>
                        </h2>

                        <div>
                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => {
                                    setEditingDestinationId(destination.id);
                                    setEditDestination({
                                        city: destination.city || "",
                                        country: destination.country || "",
                                        budget: destination.budget || "",
                                        arrivalDate: destination.arrivalDate || "",
                                        departureDate: destination.departureDate || "",
                                        status: destination.status || "",
                                        notes: destination.notes || ""
                                    });
                                }}
                            >
                                Edit
                            </button>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteDestination(destination.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <p><strong>Arrival Date:</strong> {destination.arrivalDate}</p>
                            <p><strong>Departure Date:</strong> {destination.departureDate}</p>
                        </div>

                        <div className="col-md-6">
                            <p><strong>Budget:</strong> ${destination.budget}</p>
                            <p><strong>Status:</strong> {destination.status}</p>
                        </div>
                    </div>

                    <p><strong>Notes:</strong> {destination.notes || ""}</p>
                    {editingDestinationId === destination.id && (
                        <form className="card p-3 mt-3">
                            <input
                                className="form-control mb-2"
                                value={editDestination.city}
                                onChange={event =>
                                    setEditDestination({
                                        ...editDestination,
                                        city: event.target.value
                                    })
                                }
                            />

                            <input
                                className="form-control mb-2"
                                value={editDestination.country}
                                onChange={event =>
                                    setEditDestination({
                                        ...editDestination,
                                        country: event.target.value
                                    })
                                }
                            />

                            <input
                                className="form-control mb-2"
                                value={editDestination.status}
                                onChange={event =>
                                    setEditDestination({
                                        ...editDestination,
                                        status: event.target.value
                                    })
                                }
                            />

                            <input
                                className="form-control mb-2"
                                type="number"
                                value={editDestination.budget}
                                onChange={event =>
                                    setEditDestination({
                                        ...editDestination,
                                        budget: event.target.value
                                    })
                                }
                            />

                            <input
                                className="form-control mb-2"
                                type = "date"
                                value={editDestination.arrivalDate}
                                onChange={event =>
                                    setEditDestination({
                                        ...editDestination,
                                        arrivalDate: event.target.value
                                    })
                                }
                            />

                            <input
                                className="form-control mb-2"
                                type = "date"
                                value={editDestination.departureDate}
                                onChange={event =>
                                    setEditDestination({
                                        ...editDestination,
                                        departureDate: event.target.value
                                    })
                                }
                            />

                            <textarea
                                className="form-control mb-2"
                                value={editDestination.notes}
                                onChange={event =>
                                    setEditDestination({
                                        ...editDestination,
                                        notes: event.target.value
                                    })
                                }
                            />

                            <button
                                className="btn btn-primary btn-sm me-2"
                                type="button"
                                onClick={handleUpdateDestination}
                            > Save
                            </button>

                            <button
                                className="btn btn-secondary btn-sm"
                                type="button"
                                onClick={() => setEditingDestinationId(null)}
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



export default DestinationsPage;