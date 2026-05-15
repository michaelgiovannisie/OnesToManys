const params = new URLSearchParams(window.location.search);
const tripId = params.get("id");

const tripTitle = document.getElementById("trip-title");
const tripDetail = document.getElementById("trip-detail");
const destinationList = document.getElementById("destination-list");

function loadTrip() {
    fetch(`/api/trips/${tripId}`)
        .then(response => response.json())
        .then(trip => {
            tripTitle.textContent = trip.title;
            tripDetail.innerHTML = `
                <p><strong>Status:</strong> ${trip.status}</p>
                <p><strong>Budget:</strong> $${trip.budget}</p>
                <p><strong>Start Date:</strong> ${trip.startDate}</p>
                <p><strong>End Date:</strong> ${trip.endDate}</p>
                <p><strong>Notes:</strong> ${trip.notes || ""}</p>
            `;
        });
}

function loadDestinations() {
    fetch(`/api/trips/${tripId}/destinations`)
        .then(response => response.json())
        .then(destinations => {
            destinationList.innerHTML = "";
            destinations.forEach(destination => {
                const div = document.createElement("div");
                div.innerHTML = `
                    <h3>
                        <a href="destination.html?id=${destination.id}">
                            ${destination.city}, ${destination.country}
                        </a>
                    </h3>
                    <p><strong>Status:</strong> ${destination.status}</p>
                    <p><strong>Budget:</strong> $${destination.budget}</p>
                    <p><strong>Arrival:</strong> ${destination.arrivalDate}</p>
                    <p><strong>Departure:</strong> ${destination.departureDate}</p>
                    <p><strong>Notes:</strong> ${destination.notes || ""}</p>
                    <button onclick="showDestinationEditForm(${destination.id})">
                        Edit
                    </button>
                    <button onclick="deleteDestination(${destination.id})">
                        Delete
                    </button>
                    <div id="destination-edit-form-${destination.id}" style="display:none;">
                        <h4>Edit Destination</h4>
                        <input type="text" id="edit-city-${destination.id}" value="${destination.city}">
                        <input type="text" id="edit-country-${destination.id}" value="${destination.country}">
                        <input type="number" id="edit-destination-budget-${destination.id}" value="${destination.budget}">
                        <input type="text" id="edit-destination-status-${destination.id}" value="${destination.status}">
                        <input type="date" id="edit-arrivalDate-${destination.id}" value="${destination.arrivalDate}">
                        <input type="date" id="edit-departureDate-${destination.id}" value="${destination.departureDate}">
                        <textarea id="edit-destination-notes-${destination.id}">${destination.notes || ""}</textarea>
                        <button onclick="saveDestinationEdit(${destination.id})">
                            Save
                        </button>
                        <button onclick="hideDestinationEditForm(${destination.id})">
                            Cancel
                        </button>
                    </div>

                    <hr>
                `;
                destinationList.appendChild(div);
            });
        });
}

const destinationForm = document.getElementById("destination-form");

function toggleDestinationForm() {
    const form = document.getElementById("destination-form");
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}

destinationForm.addEventListener("submit", event => {
    event.preventDefault();

    const newDestination = {
        city: document.getElementById("city").value,
        country: document.getElementById("country").value,
        budget: document.getElementById("destination-budget").value,
        status: document.getElementById("destination-status").value,
        arrivalDate: document.getElementById("arrivalDate").value,
        departureDate: document.getElementById("departureDate").value,
        notes: document.getElementById("destination-notes").value,
        trip: {
            id: tripId
        }
    };

    fetch("/api/destinations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newDestination)
    })
    .then(response => response.json())
    .then(() => {
        destinationForm.reset();
        loadDestinations();
    });
});

function deleteDestination(id) {
    fetch(`/api/destinations/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        loadDestinations();
    });
}

function showDestinationEditForm(id) {
    document.getElementById(`destination-edit-form-${id}`).style.display = "block";
}

function hideDestinationEditForm(id) {
    document.getElementById(`destination-edit-form-${id}`).style.display = "none";
}

function saveDestinationEdit(id) {
    const updatedDestination = {
        city: document.getElementById(`edit-city-${id}`).value,
        country: document.getElementById(`edit-country-${id}`).value,
        budget: document.getElementById(`edit-destination-budget-${id}`).value,
        status: document.getElementById(`edit-destination-status-${id}`).value,
        arrivalDate: document.getElementById(`edit-arrivalDate-${id}`).value,
        departureDate: document.getElementById(`edit-departureDate-${id}`).value,
        notes: document.getElementById(`edit-destination-notes-${id}`).value,
        trip: {
            id: tripId
        }
    };

    fetch(`/api/destinations/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedDestination)
    })
    .then(response => response.json())
    .then(() => {
        loadDestinations();
    });
}

loadTrip();
loadDestinations();