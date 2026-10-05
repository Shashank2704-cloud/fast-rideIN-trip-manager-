// Load saved trips from browser
let trips = JSON.parse(localStorage.getItem("fastRideTrips")) || [];


// Add Trip
function addTrip() {

    let customerName = document.getElementById("customerName").value;
    let pickup = document.getElementById("pickup").value;
    let destination = document.getElementById("destination").value;
    let driverName = document.getElementById("driverName").value;
    let vehicleNumber = document.getElementById("vehicleNumber").value;
    let tripDate = document.getElementById("tripDate").value;
    let tripStatus = document.getElementById("tripStatus").value;
    let paymentStatus = document.getElementById("paymentStatus").value;

    // Check required fields
    if (
        customerName === "" ||
        pickup === "" ||
        destination === "" ||
        driverName === "" ||
        vehicleNumber === "" ||
        tripDate === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    // Create trip
    let trip = {
        customerName: customerName,
        pickup: pickup,
        destination: destination,
        driverName: driverName,
        vehicleNumber: vehicleNumber,
        tripDate: tripDate,
        tripStatus: tripStatus,
        paymentStatus: paymentStatus
    };

    // Add trip
    trips.push(trip);

    // Save trips
    saveTrips();

    // Display trips
    displayTrips();

    // Clear form
    document.getElementById("customerName").value = "";
    document.getElementById("pickup").value = "";
    document.getElementById("destination").value = "";
    document.getElementById("driverName").value = "";
    document.getElementById("vehicleNumber").value = "";
    document.getElementById("tripDate").value = "";

    document.getElementById("tripStatus").value = "Pending";
    document.getElementById("paymentStatus").value = "Unpaid";
}


// Save trips in browser
function saveTrips() {

    localStorage.setItem(
        "fastRideTrips",
        JSON.stringify(trips)
    );

}


// Display trips
function displayTrips() {

    let tripContainer =
        document.getElementById("tripContainer");

    tripContainer.innerHTML = "";

    if (trips.length === 0) {

        tripContainer.innerHTML =
            '<p class="empty">No trips added yet.</p>';

        updateDashboard();

        return;
    }

    trips.forEach(function(trip, index) {

        let tripElement =
            document.createElement("div");

        tripElement.className = "trip";

        tripElement.innerHTML = `

            <h3>🚕 ${trip.customerName}</h3>

            <p>
                <strong>📍 Pickup:</strong>
                ${trip.pickup}
            </p>

            <p>
                <strong>🏁 Destination:</strong>
                ${trip.destination}
            </p>

            <p>
                <strong>👨‍✈️ Driver:</strong>
                ${trip.driverName}
            </p>

            <p>
                <strong>🚗 Vehicle:</strong>
                ${trip.vehicleNumber}
            </p>

            <p>
                <strong>📅 Date:</strong>
                ${trip.tripDate}
            </p>

            <p>
                <strong>🔄 Status:</strong>
                ${trip.tripStatus}
            </p>

            <p>
                <strong>💰 Payment:</strong>
                ${trip.paymentStatus}
            </p>

            <button
                class="delete-btn"
                onclick="deleteTrip(${index})"
            >
                🗑️ Delete Trip
            </button>

        `;

        tripContainer.appendChild(tripElement);

    });

    updateDashboard();
}


// Delete Trip
function deleteTrip(index) {

    trips.splice(index, 1);

    saveTrips();

    displayTrips();

}


// Dashboard
function updateDashboard() {

    let total = trips.length;

    let pending =
        trips.filter(function(trip) {
            return trip.tripStatus === "Pending";
        }).length;

    let completed =
        trips.filter(function(trip) {
            return trip.tripStatus === "Completed";
        }).length;

    document.getElementById("totalTrips").innerText = total;

    document.getElementById("pendingTrips").innerText = pending;

    document.getElementById("completedTrips").innerText = completed;
}


// Load trips when website opens
displayTrips();        tripStatus: tripStatus,

        paymentStatus: paymentStatus

    };


    // Add trip to array

    trips.push(trip);


    // Show trips

    displayTrips();


    // Clear form

    document.getElementById("customerName").value = "";

    document.getElementById("pickup").value = "";

    document.getElementById("destination").value = "";

    document.getElementById("driverName").value = "";

    document.getElementById("vehicleNumber").value = "";

    document.getElementById("tripDate").value = "";

    document.getElementById("tripStatus").value = "Pending";

    document.getElementById("paymentStatus").value = "Unpaid";

}



function displayTrips() {

    let tripContainer =
        document.getElementById("tripContainer");


    tripContainer.innerHTML = "";


    if (trips.length === 0) {

        tripContainer.innerHTML =
            '<p class="empty">No trips added yet.</p>';

        updateDashboard();

        return;
    }


    trips.forEach(function(trip, index) {

        let tripElement =
            document.createElement("div");

        tripElement.className = "trip";


        tripElement.innerHTML = `

            <h3>🚕 ${trip.customerName}</h3>

            <p>
                <strong>📍 Pickup:</strong>
                ${trip.pickup}
            </p>

            <p>
                <strong>🏁 Destination:</strong>
                ${trip.destination}
            </p>

            <p>
                <strong>👨‍✈️ Driver:</strong>
                ${trip.driverName}
            </p>

            <p>
                <strong>🚗 Vehicle:</strong>
                ${trip.vehicleNumber}
            </p>

            <p>
                <strong>📅 Date:</strong>
                ${trip.tripDate}
            </p>

            <p>
                <strong>🔄 Status:</strong>
                <span class="status">
                    ${trip.tripStatus}
                </span>
            </p>

            <p>
                <strong>💰 Payment:</strong>
                ${trip.paymentStatus}
            </p>

            <button
                class="delete-btn"
                onclick="deleteTrip(${index})"
            >
                🗑️ Delete Trip
            </button>

        `;


        tripContainer.appendChild(tripElement);

    });


    updateDashboard();

}



function deleteTrip(index) {

    trips.splice(index, 1);

    displayTrips();

}



function updateDashboard() {

    let total =
        trips.length;


    let pending =
        trips.filter(function(trip) {

            return trip.tripStatus === "Pending";

        }).length;


    let completed =
        trips.filter(function(trip) {

            return trip.tripStatus === "Completed";

        }).length;


    document.getElementById("totalTrips").innerText =
        total;

    document.getElementById("pendingTrips").innerText =
        pending;

    document.getElementById("completedTrips").innerText =
        completed;

}
