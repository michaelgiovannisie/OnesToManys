const params = new URLSearchParams(window.location.search);
const destinationId = params.get("id");

const destinationTitle = document.getElementById("destination-title");
const destinationDetail = document.getElementById("destination-detail");
const placeList = document.getElementById("place-list");

function loadDestination() {
    fetch(`/api/destinations/${destinationId}`)
        .then(response => response.json())
        .then(destination => {
            destinationTitle.textContent =
                `${destination.city}, ${destination.country}`;
            destinationDetail.innerHTML = `
                <p><strong>Status:</strong> ${destination.status}</p>
                <p><strong>Budget:</strong> $${destination.budget}</p>
                <p><strong>Arrival Date:</strong> ${destination.arrivalDate}</p>
                <p><strong>Departure Date:</strong> ${destination.departureDate}</p>
                <p><strong>Notes:</strong> ${destination.notes || ""}</p>
            `;
        });
}

function loadPlaces() {
    fetch(`/api/destinations/${destinationId}/places`)
        .then(response => response.json())
        .then(places => {
            placeList.innerHTML = "";
            places.forEach(place => {
                const div = document.createElement("div");
                div.classList.add("card", "p-3", "mb-3", "shadow-sm");
                div.innerHTML = `
                    <h3>${place.name}</h3>
                    <p><strong>Status:</strong> ${place.status}</p>
                    <p><strong>Budget:</strong> $${place.budget}</p>
                    <p><strong>Category:</strong> ${place.category}</p>
                    <p><strong>Arrival Time:</strong> ${place.arrivalTime}</p>
                    <p><strong>Departure Time:</strong> ${place.departureTime}</p>
                    <p><strong>Notes:</strong> ${place.notes || ""}</p>
                    <button class="btn btn-warning btn-sm" onclick="showPlaceEditForm(${place.id})">
                        Edit
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deletePlace(${place.id})">
                        Delete
                    </button>
                    <div id="place-edit-form-${place.id}" style="display:none;">
                        <h4>Edit Place</h4>
                        <input class="form-control mb-2" type="text" id="edit-name-${place.id}" value="${place.name}">
                        <input class="form-control mb-2" type="text" id="edit-category-${place.id}" value="${place.category}">
                        <input class="form-control mb-2" type="number" id="edit-place-budget-${place.id}" value="${place.budget}">
                        <input class="form-control mb-2" type="text" id="edit-place-status-${place.id}" value="${place.status}">
                        <input class="form-control mb-2" type="datetime-local" id="edit-arrivalTime-${place.id}" value="${place.arrivalTime}">
                        <input class="form-control mb-2" type="datetime-local" id="edit-departureTime-${place.id}" value="${place.departureTime}">
                        <textarea class="form-control mb-2" id="edit-place-notes-${place.id}">${place.notes || ""}</textarea>
                        <button class="btn btn-primary btn-sm me-2" onclick="savePlaceEdit(${place.id})">
                            Save
                        </button>
                        <button class="btn btn-secondary btn-sm" onclick="hidePlaceEditForm(${place.id})">
                            Cancel
                        </button>
                    </div>
                `;
                placeList.appendChild(div);
            });
        });
}

const placeForm = document.getElementById("place-form");

function togglePlaceForm() {
    const form = document.getElementById("place-form");
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}

placeForm.addEventListener("submit", event => {
    event.preventDefault();

    const newPlace = {
        name: document.getElementById("name").value,
        category: document.getElementById("category").value,
        budget: document.getElementById("place-budget").value,
        status: document.getElementById("place-status").value,
        arrivalTime: document.getElementById("arrivalTime").value,
        departureTime: document.getElementById("departureTime").value,
        notes: document.getElementById("place-notes").value,
        destination: {
            id: destinationId
        }
    };

    fetch("/api/places", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPlace)
    })
    .then(response => response.json())
    .then(() => {
        placeForm.reset();
        loadPlaces();
    });
});

function deletePlace(id) {
    fetch(`/api/places/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        loadPlaces();
    });
}

function showPlaceEditForm(id) {
    document.getElementById(`place-edit-form-${id}`).style.display = "block";
}

function hidePlaceEditForm(id) {
    document.getElementById(`place-edit-form-${id}`).style.display = "none";
}

function savePlaceEdit(id) {
    const updatedPlace = {
        name: document.getElementById(`edit-name-${id}`).value,
        category: document.getElementById(`edit-category-${id}`).value,
        budget: document.getElementById(`edit-place-budget-${id}`).value,
        status: document.getElementById(`edit-place-status-${id}`).value,
        arrivalTime: document.getElementById(`edit-arrivalTime-${id}`).value,
        departureTime: document.getElementById(`edit-departureTime-${id}`).value,
        notes: document.getElementById(`edit-place-notes-${id}`).value,
        destination: {
            id: destinationId
        }
    };

    fetch(`/api/places/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedPlace)
    })
    .then(response => response.json())
    .then(() => {
        loadPlaces();
    });
}

loadDestination();
loadPlaces();