document.querySelector('button').addEventListener('click', function (e) {
    e.preventDefault();

    //Get the values from the input fields
    const mass = parseFloat(document.getElementById('mass').value);
    const thrust = parseFloat(document.getElementById('thrust').value);
    const distanceKM = parseFloat(document.getElementById('distance').value);

    //Validate User inputs
    if (isNaN(mass) || isNaN(thrust) || isNaN(distanceKM) || mass <= 0 || thrust <= 0 || distanceKM <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    //Calculate acceleration (Force / Mass)
    const acceleration = thrust / mass;

    //Convert distance to meters and calculate halfway point
    const halfwayDistance = (distanceKM * 1000) / 2;

    let time = 0; // seconds
    let speed = 0; // meters per second
    let currentDistance = 0; // meters

    const outputDiv = document.getElementById('simulation-output');
    
    //Display initial state
    outputDiv.innerHTML = `
        <h2>Acceleration (m/s²): </h2><p>${acceleration.toFixed(2)}</p>
        <h2 class="mt-5">Time: </h2><p>${time} seconds 0.00 minutes, 0.00 hours</p>
        <h2 class="mt-5">Speed: </h2><p>${speed.toFixed(2)} m/s (0.00 km/h)</p>
        <h2 class="mt-5">Total Distance Travelled: </h2><p>${currentDistance.toFixed(2)} meters (0.00 km)</p>
    `;

    const interval = setInterval(() => {
        time++; //increment time by 1 second
        speed += acceleration; //update speed using the acceleration
        currentDistance += speed; //Update the distance

        const timeInMinutes = (time / 60).toFixed(2);
        const timeInHours = (time / 3600).toFixed(2);
        const speedKMH = (speed * 3.6).toFixed(2); //Convert speed to km/h
        const currentDistanceKM = (currentDistance / 1000).toFixed(2); //Convert distance to kilometers

        //update the output div
        outputDiv.innerHTML = `
            <h2>Acceleration (m/s²): </h2><p>${acceleration.toFixed(2)}</p>
            <h2 class="mt-5">Time: </h2><p>${time} seconds ${timeInMinutes} minutes, ${timeInHours} hours</p>
            <h2 class="mt-5">Speed: </h2><p>${speed.toFixed(2)} m/s (${speedKMH} km/h)</p>
            <h2 class="mt-5">Total Distance Travelled: </h2><p>${currentDistance.toFixed(2)} meters (${currentDistanceKM} km)</p>
        `;

        //check for halfway
        if (Math.round(currentDistance) >= Math.round(halfwayDistance)) {
            clearInterval(interval);
            const halfwayDistanceKM = (halfwayDistance / 1000).toFixed(2); // Convert to kilometers
            outputDiv.innerHTML += `<h2 class="mt-5"><strong>Halfway point reached at ${halfwayDistanceKM} km!</strong></h2>`;
        }
        
        
    }, 1000); // Update every second
});
