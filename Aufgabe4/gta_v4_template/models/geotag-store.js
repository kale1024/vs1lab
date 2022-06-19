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
    
    #geotaglist = [];
    constructor(){
    
}

//Beispieldaten einlesen aus examples
populate(){

    let tagList = GeoTagExamples.tagList;
    for (let i = 0; i < tagList.length; i++) {
       let myname = tagList[i][0];
       let mylat = tagList[i][1]; 
       let mylong = tagList[i][2];
       let myhashtag = tagList[i][3];
       let myGT = new GeoTag(myname, mylong, mylat, myhashtag);
        this.#geotaglist.push(myGT);
    }}

addGeoTag(myGeoTag){
    this.#geotaglist.push(myGeoTag);
}

removeGeoTag(myGeoTag){
    return this.#geotaglist.filter(function(ele){ 
        return ele != myGeoTag; 
    });
}

removeGeoTagById(id){
    this.#geotaglist.splice(id, 1);
    console.log("geotag-store/removeGeoTagById Id:" +id);
}

getNearbyGeoTags(location){
    const proximity = 100;
    let nearbyList = [];
    for(let i=0; i<this.#geotaglist.length; i++){
        let distance =Math.pow((this.#geotaglist[i].longitude - location[1]), 2) + Math.pow((this.#geotaglist[i].latitude - location[0]), 2);
       distance = Math.sqrt(distance);
       if (distance < proximity){
           nearbyList.push(this.#geotaglist[i]);
       }
    }
    console.log(nearbyList);
    return nearbyList;
}



searchNearbyGeoTags(location,keyword){
    let nearbyList = [];
    nearbyList = this.getNearbyGeoTags(location);
    let resultlist = [];
    resultlist = nearbyList.filter(tag=> tag.name === keyword || tag.hashtag === keyword);
    return resultlist;
}

getAllGeoTags(){
    return this.#geotaglist;

}

getGeoTagById(id){
//console.log("geotag-store/getGeoTagsById: " + id); 
    if (id < this.#geotaglist.length){
    let foundGeoTag = new GeoTag();
    foundGeoTag = this.#geotaglist[id];

    //console.log("geotag-store/getGeoTagsById: FoundGeoTag: " + foundGeoTag.name);

    return foundGeoTag ;
} else {
    console.log("This Id is larger than the array!")
    return null;
}

}

changeGeoTagById(id, GeoTag){
    console.log("geotag-store/changeGeoTagById" + id + "name" + GeoTag.name);
    this.#geotaglist[id]= GeoTag;
    return GeoTag;
}
}

module.exports = InMemoryGeoTagStore
