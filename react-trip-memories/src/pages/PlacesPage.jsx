import { useEffect, useState } from "react";
import { getPlacesByDestinationId, createPlace, deletePlace, updatePlace } from "../api/placesApi";
import { Link, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function PlacesPage() {
    const { id } = useParams();
    const [places, setPlaces] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [searchParams] = useSearchParams();
    const tripId = searchParams.get("tripId");
    const [newPlace, setNewPlace] = useState({
        name: "",
        category: "",
        budget: "",
        arrivalTime: "",
        departureTime: "",
        status: "",
        notes: ""
    });
    const [editingPlaceId, setEditingPlaceId] = useState(null);

    const [editPlace, setEditPlace] = useState({
        name: "",
        category: "",
        budget: "",
        arrivalTime: "",
        departureTime: "",
        status: "",
        notes: ""
    });

    useEffect(() => {
        getPlacesByDestinationId(id).then(data => {
            setPlaces(data);
        });
    }, [id]);

    function handleCreatePlace(event) {
        event.preventDefault();
        createPlace({
        ...newPlace,
        destination: {
            id: id
        }}).then(() => {
            getPlacesByDestinationId(id).then(data => {
                setPlaces(data);
            });
            setNewPlace({
                name: "",
                category: "",
                budget: "",
                arrivalTime: "",
                departureTime: "",
                status: "",
                notes: ""
            });
            setShowCreateForm(false);
        });
    }

    function handleDeletePlace(placeId) {
        deletePlace(placeId).then(() => {
            getPlacesByDestinationId(id).then(data => {
                setPlaces(data);
            });
        });
    }

    function handleUpdatePlace() {
        updatePlace(editingPlaceId, editPlace).then(() => {
            getPlacesByDestinationId(id).then(data => {
                setPlaces(data);
            });

            setEditingPlaceId(null);
        });
    }

    return (
        <div className="container mt-4">
            <Link className="btn btn-outline-secondary mb-3" to={`/trips/${tripId}`}>
                ← Back to Destinations
            </Link>
            <h1 className="mb-4 text-center">Places</h1>
            <button
                className="btn btn-success mb-3"
                onClick={() => setShowCreateForm(!showCreateForm)}
            >
                Add Destination
            </button>
            {showCreateForm && (
    <form className="card p-3 mb-4 shadow-sm" onSubmit={handleCreatePlace}>
            <input
                className="form-control mb-3"
                placeholder="Name"
                value={newPlace.name}
                onChange={event => setNewPlace({ ...newPlace, name: event.target.value })}
            />
            <input
                className="form-control mb-3"
                placeholder="Category"
                value={newPlace.category}
                onChange={event => setNewPlace({ ...newPlace, category: event.target.value })}
            />
            <input
                className="form-control mb-3"
                type="number"
                placeholder="Budget"
                value={newPlace.budget}
                onChange={event =>
                    setNewPlace({
                        ...newPlace,
                        budget: event.target.value
                    })
                }
            />
            <input
                className="form-control mb-3"
                type="datetime-local"
                value={newPlace.arrivalTime}
                onChange={event =>
                    setNewPlace({
                        ...newPlace,
                        arrivalTime: event.target.value
                    })
                }
            />
            <input
                className="form-control mb-3"
                type="datetime-local"
                value={newPlace.departureTime}
                onChange={event =>
                    setNewPlace({
                        ...newPlace,
                        departureTime: event.target.value
                    })
                }
            />
            <input
                className="form-control mb-3"
                placeholder="Status"
                value={newPlace.status}
                onChange={event =>
                    setNewPlace({
                        ...newPlace,
                        status: event.target.value
                    })
                }
            />
            <textarea
                className="form-control mb-3"
                placeholder="Notes"
                value={newPlace.notes}
                onChange={event =>
                    setNewPlace({
                        ...newPlace,
                        notes: event.target.value
                    })
                }
            />
            <button className="btn btn-primary" type="submit">
                Add Destination
            </button>
        </form>
    )}
            {places.map(place => (
                <div className="card p-3 mb-3 shadow-sm" key={place.id}>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                    <h2 className="mb-0">
                        <Link to={`/places/${place.id}`}>
                            {place.name}
                        </Link>
                    </h2>

                    <div>
                        <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => {
                                setEditingPlaceId(place.id);
                                setEditPlace({
                                    name: place.name || "",
                                    category: place.category || "",
                                    budget: place.budget || "",
                                    arrivalTime: place.arrivalTime || "",
                                    departureTime: place.departureTime || "",
                                    status: place.status || "",
                                    notes: place.notes || ""
                                });
                            }}
                        >
                            Edit
                        </button>

                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeletePlace(place.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <p><strong>Arrival Time:</strong> {place.arrivalTime?.replace("T", " ").slice(0, 16)}</p>
                        <p><strong>Departure Time:</strong> {place.departureTime?.replace("T", " ").slice(0, 16)}</p>
                    </div>

                    <div className="col-md-6">
                        <p><strong>Budget:</strong> ${place.budget}</p>
                        <p><strong>Status:</strong> {place.status}</p>
                    </div>
                </div>

                <p><strong>Category:</strong> {place.category}</p>
                <p><strong>Notes:</strong> {place.notes || ""}</p>
                    {editingPlaceId === place.id && (
                        <form className="card p-3 mt-3">
                            <input
                                className="form-control mb-2"
                                value={editPlace.name}
                                onChange={event =>
                                    setEditPlace({
                                        ...editPlace,
                                        name: event.target.value
                                    })
                                }
                            />

                            <input
                                className="form-control mb-2"
                                value={editPlace.category}
                                onChange={event =>
                                    setEditPlace({
                                        ...editPlace,
                                        category: event.target.value
                                    })
                                }
                            />

                            <input
                                className="form-control mb-2"
                                value={editPlace.status}
                                onChange={event =>
                                    setEditPlace({
                                        ...editPlace,
                                        status: event.target.value
                                    })
                                }
                            />

                            <input
                                className="form-control mb-2"
                                type="number"
                                value={editPlace.budget}
                                onChange={event =>
                                    setEditPlace({
                                        ...editPlace,
                                        budget: event.target.value
                                    })
                                }
                            />

                            <input
                                className="form-control mb-2"
                                type = "datetime-local"
                                value={editPlace.arrivalTime}
                                onChange={event =>
                                    setEditPlace({
                                        ...editPlace,
                                        arrivalTime: event.target.value
                                    })
                                }
                            />

                            <input
                                className="form-control mb-2"
                                type = "datetime-local"
                                value={editPlace.departureTime}
                                onChange={event =>
                                    setEditPlace({
                                        ...editPlace,
                                        departureTime: event.target.value
                                    })
                                }
                            />

                            <textarea
                                className="form-control mb-2"
                                value={editPlace.notes}
                                onChange={event =>
                                    setEditPlace({
                                        ...editPlace,
                                        notes: event.target.value
                                    })
                                }
                            />

                            <button
                                className="btn btn-primary btn-sm me-2"
                                type="button"
                                onClick={handleUpdatePlace}
                            > Save
                            </button>

                            <button
                                className="btn btn-secondary btn-sm"
                                type="button"
                                onClick={() => setEditingPlaceId(null)}
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



export default PlacesPage;