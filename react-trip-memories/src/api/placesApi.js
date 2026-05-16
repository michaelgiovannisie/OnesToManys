const BASE_URL = "http://localhost:8080";

export function getPlaces() {
    return fetch(`${BASE_URL}/api/places`)
        .then(response => response.json());
}

export function createPlace(place) {
    return fetch(`${BASE_URL}/api/places`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(place)
    })
    .then(response => response.json());
}

export function deletePlace(id) {
    return fetch(`${BASE_URL}/api/places/${id}`, {
        method: "DELETE"
    });
}

export function updatePlace(id, place) {
    return fetch(`${BASE_URL}/api/places/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(place)
    })
    .then(response => response.json());
}

export function getPlacesByDestinationId(id) {
    return fetch(`${BASE_URL}/api/places/destination/${id}`)
        .then(response => response.json());
}