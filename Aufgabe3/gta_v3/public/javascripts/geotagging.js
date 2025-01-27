// File origin: VS1LAB A2

/* eslint-disable no-unused-vars */

// This script is executed when the browser loads index.html.

// "console.log" writes to the browser's console. 
// The console window must be opened explicitly in the browser.
// Try to find this output in the browser...
console.log("The geoTagging script is going to start...");

/**
 * HERE THIS
 * 'updateLocation'
 * A function to retrieve the current location and update the page.
 * It is called once the page has been fully loaded.
 */
function updateLocation(){

    if (document.getElementById("Tlatitude").value === "" ||
    document.getElementById("Tlongitude").value === "" ){

    LocationHelper.findLocation(callback => {
        document.getElementById("Tlatitude").value = callback.latitude;
        document.getElementById("Tlongitude").value = callback.longitude;
        document.getElementById("Dlatitude").value = callback.latitude;
        document.getElementById("Dlongitude").value = callback.longitude;
        let taglistNah = JSON.parse(document.getElementById("mapView").getAttribute("data-tags"));
        document.getElementById("mapView").src = new MapManager("5YFmgewoy089oO5OD2zhOByrg2GvzB7h").getMapUrl(callback.latitude, callback.longitude, taglistNah, 14);
        console.log("we are in the if statement");
    })
} else{
    let latitude = document.getElementById("Tlatitude").value;
    let longitude = document.getElementById("Tlongitude").value;
    let taglistNah = JSON.parse(document.getElementById("mapView").getAttribute("data-tags"));
    document.getElementById("mapView").src = new MapManager("5YFmgewoy089oO5OD2zhOByrg2GvzB7h").getMapUrl(latitude, longitude, taglistNah);
    console.log("we are in the else statement");
}
}

// Wait for the page to fully load its DOM content, then call updateLocation
document.addEventListener("DOMContentLoaded", () => {
    updateLocation();
});