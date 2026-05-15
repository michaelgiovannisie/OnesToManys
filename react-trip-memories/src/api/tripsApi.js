const BASE_URL = "http://localhost:8080";

export function getTrips() {
    return fetch(`${BASE_URL}/api/trips`)
        .then(response => response.json());
}