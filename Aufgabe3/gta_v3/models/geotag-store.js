// File origin: VS1LAB A3

const GeoTagExamples = require("./geotag-examples");

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * A class for in-memory-storage of geotags
 * 
 * Use an array to store a multiset of geotags.
 * - The array must not be accessible from outside the store.
 * 
 * Provide a method 'addGeoTag' to add a geotag to the store.
 * 
 * Provide a method 'removeGeoTag' to delete geo-tags from the store by name.
 * 
 * Provide a method 'getNearbyGeoTags' that returns all geotags in the proximity of a location.
 * - The location is given as a parameter.
 * - The proximity is computed by means of a radius around the location.
 * 
 * Provide a method 'searchNearbyGeoTags' that returns all geotags in the proximity of a location that match a keyword.
 * - The proximity constrained is the same as for 'getNearbyGeoTags'.
 * - Keyword matching should include partial matches from name or hashtag fields. 
 */
class InMemoryGeoTagStore{
constuctor(){
    let geotaglist = [];
    let i = 0;  
    while (GeoTagExamples[i]!= undefined) {
        geotaglist.push(GeoTagExamples.taglist(i));
        i++;
    }
    console.log(geotaglist);
}

addGeoTag(myGeoTag){
    geotaglist.push(myGeoTag);
    console.log("LDK: hinzugefügt!!!");
}

removeGeoTag(myGeoTag){
    
}

getNearbyGeoTags(location){
}

searchNearbyGeoTags(location,keyword){

}

}

module.exports = InMemoryGeoTagStore
