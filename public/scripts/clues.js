let i=0;
let j=0;
let score =0;
let isCompleted = false;

function dontshow(){
    let center = document.getElementById("center");
    center.style.display = "none";

    let center2 = document.getElementById("center2");
    center2.style.display = "block";
}
dontshow();

setInterval(function(){
    if (score > 0) {
        if (isCompleted == false) {
            score = score - 1;
        }
    }
    document.getElementById("myScore").innerHTML = 'Score: ' + score ;
}
, 30000);

function toggle() {
    var x = document.getElementById("hint");
    var y = document.getElementById("buttonText");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.innerHTML = "Hide Hint";
        
    } 
    else {
        x.style.display = "none";
        y.innerHTML = "Show Hint";
    }
}


function openPopup(){
    let top = document.getElementById("top");
    let bottom = document.getElementById("bottom");
    let form = document.getElementById("form");
    let center_buttons = document.getElementById("center_buttons");
    let leaderboard = document.getElementById("leaderboard");

    top.style.display = "none";
    bottom.style.display = "none";
    form.style.display = "none";
    center_buttons.style.display = "none";
    leaderboard.style.display = "block";

}

function closePopup(){
    let top = document.getElementById("top");
    let bottom = document.getElementById("bottom");
    let form = document.getElementById("form");
    let center_buttons = document.getElementById("center_buttons");
    let leaderboard = document.getElementById("leaderboard");

    top.style.display = "flex";
    bottom.style.display = "block";
    form.style.display = "block";
    center_buttons.style.display = "block";
    leaderboard.style.display = "none";

}

function getCurrentLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            console.log(userLocation.latitude);
            console.log(userLocation.longitude);
            checkGeofence(userLocation.latitude, userLocation.longitude);
        }, (error) => {
            console.error(`Error getting location: ${error.message}`);
        });
    } else {
        console.error('Geolocation is not supported by this browser');
    }
}

function checkGeofence(mylat, mylong) {

    if(i==myClues.length -1){
        let clue = document.getElementById("displayClue");
        clue.innerHTML =  "Congratulations! You have completed the hunt!";

        let hint = document.getElementById("hint");
        hint.innerHTML = "";

        let button = document.getElementById("locationChecker");
        button.style.display = "none";

        isCompleted = true;

        return;

    }
    
    const geofenceCoordinates = { lat: managedLocations[i][0], lng: managedLocations[i][1]};
    const geofenceRadius = 1;

    const distance = getDistance(mylat, mylong, geofenceCoordinates.lat, geofenceCoordinates.lng);

    if (distance <= geofenceRadius) {
        console.log("Inside geofence, opening file...");
        i++;
        simulateNextClueOpening();
        
    } else {
        console.log("Outside geofence");
        alert("You are not at the correct location!");
        // console.log(managedLocations[0]);
        // i++;
        // console.log("Next location: " + managedLocations[i][0] + ", " + managedLocations[i][1]);
    }
}


function simulateNextClueOpening() {
    j++;
    
    let myScore = document.getElementById("myScore");
    score = score + 100;
    myScore.innerHTML = 'Score: ' + (score);

    let clue = document.getElementById("displayClue");
    clue.innerHTML =  myClues[j];

    let hint = document.getElementById("hint");
    hint.innerHTML = myHints[j];

}

// Function to calculate distance between two sets of coordinates
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
