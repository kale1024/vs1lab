// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/** * 
 * A class representing geotags.
 * GeoTag objects should contain at least all fields of the tagging form.
 */
class GeoTag {
    name = " ";
    latitude = 0;
    longitude = 0;
    hashtag = " ";

constructor(myname, mylat, mylong, myhash){
    this.latitude = mylat;
    this.longitude = mylong;
    this.name = myname;
    this.hashtag = myhash;
    //console.log("constuctor gerufen: +" + this.latitude);
};

}

module.exports = GeoTag;
