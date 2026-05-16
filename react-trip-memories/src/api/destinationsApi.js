const BASE_URL = "http://localhost:8080";

export function getDestinations() {
    return fetch(`${BASE_URL}/api/destinations`)
        .then(response => response.json());
}

export function createDestination(destination) {
    return fetch(`${BASE_URL}/api/destinations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(destination)
    })
    .then(response => response.json());
}

export function deleteDestination(id) {
    return fetch(`${BASE_URL}/api/destinations/${id}`, {
        method: "DELETE"
    });
}

export function updateDestination(id, destination) {
    return fetch(`${BASE_URL}/api/destinations/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(destination)
    })
    .then(response => response.json());
}

export function getDestinationsByTripId(id) {
    return fetch(`${BASE_URL}/api/trips/${id}/destinations`)
        .then(response => response.json());
}