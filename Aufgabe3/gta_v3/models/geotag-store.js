// File origin: VS1LAB A3

const GeoTagExamples = require("./geotag-examples");
const GeoTag = require('../models/geotag');

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

//Beispieldaten einlesen aus examples
populate(){

    let tagList = GeoTagExamples.tagList;
    for (let i = 0; i < tagList.length; i++) {
       let myname = tagList[i][0]; //NEW THING ADDED
       let mylat = tagList[i][1]; //NEW THING ADDED
       let mylong = tagList[i][2]; //NEW THING ADDED
       let myhashtag = tagList[i][3]; //NEW THING ADDED
       let myGT = new GeoTag(myname, mylong, mylat, myhashtag); //NEW THING ADDED
        this.geotaglist.push(myGT);
    //console.log("populate ausgeführt");
   //console.log(myGT.name);
    }
   
}

addGeoTag(myGeoTag){
    this.geotaglist.push(myGeoTag);
    // console.log("addGeoTag"); //remove this!
    // console.log("GeoTag: "+myGeoTag+" Länge: "+myGeoTag.length); //remove this!
    // console.log("Liste: "+this.geotaglist.length);
}

removeGeoTag(myGeoTag){
    return this.geotaglist.filter(function(ele){ 
        return ele != myGeoTag; 
    });
}

getNearbyGeoTags(location){
    //console.log("GETNEARBYGEOTAGS: ");
    const proximity = 100;
    let nearbyList = [];
    //console.log("location: " + location[0]);
    for(let i=0; i<this.geotaglist.length; i++){
        //console.log(i+": "+this.geotaglist[i].longitude);
       let distance =Math.pow((this.geotaglist[i].longitude - location[1]), 2) + Math.pow((this.geotaglist[i].latitude - location[0]), 2); //NEW THING ADDED
       distance = Math.sqrt(distance);
      // console.log("distance: " + distance);
       if (distance < proximity){
           nearbyList.push(this.geotaglist[i]);
       }
       //else{
           //console.log("Distance: " + distance + ", i :"+ i);
       //}
    }
    //console.log("getNearby: " + nearbyList[0].name);
  // console.log("getNearby Lenght: " + nearbyList.length);
    return nearbyList;
}

searchNearbyGeoTags(location,keyword){
    //console.log("Wir sind im searchnearbygeotags! " + "locaction: " + location + " " + "keyword: " + keyword);
    let nearbyList = [];
    nearbyList = this.getNearbyGeoTags(location);
    //console.log("nearbyList: " + nearbyList) ;
    //console.log("Testing Filter")
    let resultlist = [];

    resultlist = nearbyList.filter(tag=> tag.name === keyword || tag.hashtag === keyword);

    
    console.log("searchnearby resultlist");
    console.log(resultlist.length);
    return resultlist;
}

}

module.exports = InMemoryGeoTagStore
