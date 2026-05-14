console.log("JS loaded");

const tripList = document.getElementById("trip-list");
const tripForm = document.getElementById("trip-form");

let currentEditId = null;

function loadTrips() {

    fetch("/api/trips")
        .then(response => response.json())
        .then(trips => {

            renderTrips(trips);

        });

}

function renderTrips(trips) {
    tripList.innerHTML = "";
    trips.forEach(trip => {
        const div = document.createElement("div");
        div.classList.add("trip-card");
        div.innerHTML = `
            <h2>${trip.title}</h2>
            <p><strong>Status:</strong> ${trip.status}</p>
            <p><strong>Budget:</strong> $${trip.budget}</p>
            <p><strong>Start Date:</strong> ${trip.startDate}</p>
            <p><strong>End Date:</strong> ${trip.endDate}</p>
            <p><strong>Notes:</strong> ${trip.notes || ""}</p>
            <button onclick="showEditForm(${trip.id})">
                Edit
            </button>
            <button onclick="deleteTrip(${trip.id})">
                Delete
            </button>
            <div id="edit-form-${trip.id}" style="display:none;">
                <h3>Edit Trip</h3>
                <input type="text" id="edit-title-${trip.id}" value="${trip.title}">
                <input type="number" id="edit-budget-${trip.id}" value="${trip.budget}">
                <input type="text" id="edit-status-${trip.id}" value="${trip.status}">
                <input type="date" id="edit-startDate-${trip.id}" value="${trip.startDate}">
                <input type="date" id="edit-endDate-${trip.id}" value="${trip.endDate}">
                <textarea id="edit-notes-${trip.id}">${trip.notes || ""}</textarea>
                <button onclick="saveTripEdit(${trip.id})">
                    Save
                </button>
                <button onclick="hideEditForm(${trip.id})">
                    Cancel
                </button>
            </div>
            <hr>
        `;
        tripList.appendChild(div);
    });
}

tripForm.addEventListener("submit", event => {
    event.preventDefault();
    const newTrip = {
        title: document.getElementById("title").value,
        budget: document.getElementById("budget").value,
        startDate: document.getElementById("startDate").value,
        endDate: document.getElementById("endDate").value,
        status: document.getElementById("status").value,
        notes: document.getElementById("notes").value
    };

    fetch("/api/trips", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTrip)
    })
    .then(response => response.json())
    .then(() => {
        tripForm.reset();
        loadTrips();
    });
});

function deleteTrip(id) {
    fetch(`/api/trips/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        loadTrips();
    });
}

function showEditForm(id) {
    const form = document.getElementById(`edit-form-${id}`);
    form.style.display = "block";
}

function hideEditForm(id) {
    const form = document.getElementById(`edit-form-${id}`);
    form.style.display = "none";
}

function saveTripEdit(id) {

    const updatedTrip = {
        title: document.getElementById(`edit-title-${id}`).value,
        budget: document.getElementById(`edit-budget-${id}`).value,
        status: document.getElementById(`edit-status-${id}`).value,
        startDate: document.getElementById(`edit-startDate-${id}`).value,
        endDate: document.getElementById(`edit-endDate-${id}`).value,
        notes: document.getElementById(`edit-notes-${id}`).value
    };

    fetch(`/api/trips/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTrip)
    })
    .then(response => response.json())
    .then(() => {
        loadTrips();
    });
}

function toggleCreateForm() {
    const form = document.getElementById("trip-form");
    if (form.style.display === "none") {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }
}

loadTrips();