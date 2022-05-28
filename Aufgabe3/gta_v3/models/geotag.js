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
    latitude =" ";
    logitude=" ";
    name=" ";
    hashtag=" ";
constructor(mylat, mylong, myname, myhash){
    this.latitude = mylat;
    this.longitude = mylong;
    this.name = myname;
    this.hashtag = myhash;

};

}

module.exports = GeoTag;
