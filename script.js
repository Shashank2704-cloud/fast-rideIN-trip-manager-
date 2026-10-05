let trips = JSON.parse(localStorage.getItem("fastRideTrips")) || [];


const tripForm = document.getElementById("tripForm");



tripForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const trip = {

        id: Date.now(),

        customerName:
            document.getElementById("customerName").value,

        customerPhone:
            document.getElementById("customerPhone").value,

        pickup:
            document.getElementById("pickup").value,

        destination:
            document.getElementById("destination").value,

        date:
            document.getElementById("tripDate").value,

        time:
            document.getElementById("tripTime").value,

        driverName:
            document.getElementById("driverName").value,

        vehicleNumber:
            document.getElementById("vehicleNumber").value,

        status:
            document.getElementById("tripStatus").value,

        tasks: {

            confirmCustomer: false,

            assignDriver: false,

            checkVehicle: false,

            startTrip: false,

            completeTrip: false,

            collectPayment: false

        }

    };


    trips.push(trip);

    saveTrips();

    tripForm.reset();

    displayTrips();

    updateDashboard();

});


function saveTrips() {

    localStorage.setItem(
        "fastRideTrips",
        JSON.stringify(trips)
    );

}


function displayTrips() {

    const tripList = document.getElementById("tripList");

    const search =
        document.getElementById("searchInput").value.toLowerCase();

    const filter =
        document.getElementById("statusFilter").value;


    tripList.innerHTML = "";


    const filteredTrips = trips.filter(function(trip) {

        const matchesSearch =
            trip.customerName.toLowerCase().includes(search) ||
            trip.driverName.toLowerCase().includes(search) ||
            trip.vehicleNumber.toLowerCase().includes(search);

        const matchesStatus =
            filter === "All" ||
            trip.status === filter;

        return matchesSearch && matchesStatus;

    });


    if (filteredTrips.length === 0) {

        tripList.innerHTML =
            "<p>No trips found.</p>";

        return;

    }


    filteredTrips.forEach(function(trip) {

        const tripElement = document.createElement("div");

        tripElement.className = "trip";


        tripElement.innerHTML = `

            <h3>${trip.customerName}</h3>

            <p>
                <strong>Phone:</strong>
                ${trip.customerPhone}
            </p>

            <p>
                <strong>Pickup:</strong>
                ${trip.pickup}
            </p>

            <p>
                <strong>Destination:</strong>
                ${trip.destination}
            </p>

            <p>
                <strong>Date:</strong>
                ${trip.date}
            </p>

            <p>
                <strong>Time:</strong>
                ${trip.time}
            </p>

            <p>
                <strong>Driver:</strong>
                ${trip.driverName}
            </p>

            <p>
                <strong>Vehicle:</strong>
                ${trip.vehicleNumber}
            </p>

            <span class="status">
                ${trip.status}
            </span>


            <div class="tasks">

                <h4>Trip Tasks</h4>

                <label>
                    <input
                        type="checkbox"
                        onchange="updateTask(${trip.id}, 'confirmCustomer')"
                        ${trip.tasks.confirmCustomer ? "checked" : ""}
                    >
                    Confirm customer
                </label>


                <label>
                    <input
                        type="checkbox"
                        onchange="updateTask(${trip.id}, 'assignDriver')"
                        ${trip.tasks.assignDriver ? "checked" : ""}
                    >
                    Assign driver
                </label>


                <label>
                    <input
                        type="checkbox"
                        onchange="updateTask(${trip.id}, 'checkVehicle')"
                        ${trip.tasks.checkVehicle ? "checked" : ""}
                    >
                    Check vehicle
                </label>


                <label>
                    <input
                        type="checkbox"
                        onchange="updateTask(${trip.id}, 'startTrip')"
                        ${trip.tasks.startTrip ? "checked" : ""}
                    >
                    Start trip
                </label>


                <label>
                    <input
                        type="checkbox"
                        onchange="updateTask(${trip.id}, 'completeTrip')"
                        ${trip.tasks.completeTrip ? "checked" : ""}
                    >
                    Complete trip
                </label>


                <label>
                    <input
                        type="checkbox"
                        onchange="updateTask(${trip.id}, 'collectPayment')"
                        ${trip.tasks.collectPayment ? "checked" : ""}
                    >
                    Collect payment
                </label>

            </div>


            <div class="trip-buttons">

                <button
                    class="complete"
                    onclick="markCompleted(${trip.id})"
                >
                    Mark Completed
                </button>

                <button
                    class="delete"
                    onclick="deleteTrip(${trip.id})"
                >
                    Delete
                </button>

            </div>

        `;


        tripList.appendChild(tripElement);

    });

}


function deleteTrip(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this trip?");

    if (!confirmDelete) {
        return;
    }


    trips = trips.filter(function(trip) {

        return trip.id !== id;

    });


    saveTrips();

    displayTrips();

    updateDashboard();

}


function markCompleted(id) {

    const trip = trips.find(function(trip) {

        return trip.id === id;

    });


    if (trip) {

        trip.status = "Completed";

        trip.tasks.completeTrip = true;

        saveTrips();

        displayTrips();

        updateDashboard();

    }

}


function updateTask(id, taskName) {

    const trip = trips.find(function(trip) {

        return trip.id === id;

    });


    if (trip) {

        trip.tasks[taskName] =
            !trip.tasks[taskName];

        saveTrips();

        displayTrips();

    }

}


function updateDashboard() {

    const total =
        trips.length;


    const pending =
        trips.filter(function(trip) {

            return trip.status === "Pending";

        }).length;


    const completed =
        trips.filter(function(trip) {

            return trip.status === "Completed";

        }).length;


    const today =
        new Date().toISOString().split("T")[0];


    const todayTrips =
        trips.filter(function(trip) {

            return trip.date === today;

        }).length;


    document.getElementById("totalTrips")
        .textContent = total;

    document.getElementById("pendingTrips")
        .textContent = pending;

    document.getElementById("completedTrips")
        .textContent = completed;

    document.getElementById("todayTrips")
        .textContent = todayTrips;

}


document.getElementById("searchInput")
    .addEventListener("input", function() {

        displayTrips();

    });


document.getElementById("statusFilter")
    .addEventListener("change", function() {

        displayTrips();

    });


displayTrips();

updateDashboard();