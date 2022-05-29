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
    
    const proximity = 0.001;
    let nearbyList = [];

    for(let i=1; i<this.geotaglist.length; i++){
       let distance =Math.pow((this.geotaglist[i][1] - location[0]), 2) + Math.pow((this.geotaglist[i][2] - location[1]), 2);
       distance = Math.sqrt(distance);
       if (distance <= proximity){
           nearbyList.push(this.geotaglist[i]);
       }
    }
   // console.log("getNearby: " + nearbyList.length);
    return nearbyList;
}

searchNearbyGeoTags(location,keyword){
    console.log("Wir sind im searchnearbygeotags! " + "locaction: " + location + " " + "keyword: " + keyword);
    let nearbyList = [];
    console.log("nearbyList: " + nearbyList) ;
    nearbyList = this.getNearbyGeoTags(location);
    let resultlist1 = [];
    function containsKeyword(key){
        if (key == keyword){
        return true;
        }else{
            return false;
        }
    }
    resultlist1 = nearbyList.filter(containsKeyword); //'name' : 
   // let resultlist2 = []; 
   // resultlist2 = nearbyList.filter(containsKeyword)
   // let resultlist = [];
   // resultlist = resultlist1;
    //resultlist =  resultlist1.concat(resultlist2);
    //resultlist = resultlist.filter((x, i) => i === array.indexOf(x))
    
    console.log("searchnearby resultlist!");
    console.log(resultlist1);
    return resultlist1;
}

}

module.exports = InMemoryGeoTagStore
