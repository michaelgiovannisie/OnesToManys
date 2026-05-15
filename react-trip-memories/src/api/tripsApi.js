const BASE_URL = "http://localhost:8080";

export function getTrips() {
    return fetch(`${BASE_URL}/api/trips`)
        .then(response => response.json());
}

export function createTrip(trip) {
    return fetch(`${BASE_URL}/api/trips`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(trip)
    })
    .then(response => response.json());
}

export function deleteTrip(id) {
    return fetch(`${BASE_URL}/api/trips/${id}`, {
        method: "DELETE"
    });
}

export function updateTrip(id, trip) {
    return fetch(`${BASE_URL}/api/trips/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(trip)
    })
    .then(response => response.json());
}

export function getTripById(id) {
    return fetch(`${BASE_URL}/api/trips/${id}`)
        .then(response => response.json());
}