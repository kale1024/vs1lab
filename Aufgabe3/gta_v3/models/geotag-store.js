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
    
    geotaglist = [];
    constructor(){
    
}

//Beispieldaten einlesen
populate(){

    let tagList = GeoTagExamples.tagList;
    for (let i = 0; i < tagList.length; i++) {
        this.geotaglist.push(tagList[i]);
    }
 //  console.log("populate ausgeführt");
//   console.log(this.geotaglist[0]);
}

addGeoTag(myGeoTag){
    this.geotaglist.push(myGeoTag);
    console.log("addGeoTag"); //remove this!
}

removeGeoTag(myGeoTag){
    return this.geotaglist.filter(function(ele){ 
        return ele != myGeoTag; 
    });
}

getNearbyGeoTags(location){
    
    const proximity = 0.5;
    let nearbyList = [];

    for(let i=1; i<this.geotaglist.length; i++){
       let distance =Math.pow((this.geotaglist[i][1] - location.longitude), 2) + Math.pow((this.geotaglist[i][2] - location.latitude), 2);
       distance = Math.sqrt(distance);
       if (distance <= proximity){
           nearbyList.push(this.geotaglist[i]);
       }
    }
    return nearbyList;
}

searchNearbyGeoTags(location,keyword){
    let nearbyList = []; 
    nearbyList = this.getNearbyGeoTags(location);
    let resultlist1 = []; 
    resultlist1 = nearbyList.filter(keyword); //'name' : 
    let resultlist2 = []; 
   // resultlist2 = lodash.filter(nearbyList, {'hashtag': keyword})
    let resultlist = [];
    resultlist =  resultlist1.concat(resultlist2);
    resultlist = resultlist.filter((x, i) => i === array.indexOf(x))
}

}

module.exports = InMemoryGeoTagStore
