// File origin: VS1LAB A3

/**
 * This script defines the main router of the GeoTag server.
 * It's a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * Define module dependencies.
 */

const express = require('express');
const req = require('express/lib/request');
const router = express.Router();

/**
 * The module "geotag" exports a class GeoTagStore. 
 * It represents geotags.
 * 
 * TODO: implement the module in the file "../models/geotag.js"
 */
// eslint-disable-next-line no-unused-vars
const GeoTag = require('../models/geotag');



/**
 * The module "geotag-store" exports a class GeoTagStore. 
 * It provides an in-memory store for geotag objects.
 * 
 * TODO: implement the module in the file "../models/geotag-store.js"
 */
// eslint-disable-next-line no-unused-vars
const GeoTagStore = require('../models/geotag-store');
var tagStore = new GeoTagStore();
tagStore.populate();
/**
 * Route '/' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests cary no parameters
 *
 * As response, the ejs-template is rendered without geotag objects.
 */

// TODO: extend the following route example if necessary
router.get('/', (req, res) => {
  res.render('index', { taglist: [] })
});

/**
 * Route '/tagging' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests cary the fields of the tagging form in the body.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * Based on the form data, a new geotag is created and stored./
 *
 * As response, the ejs-template is rendered with geotag objects.
 * All result objects are located in the proximity of the new geotag.
 * To this end, "GeoTagStore" provides a method to search geotags 
 * by radius around a given location.
 */

router.post('/tagging', (req, res) => {
  var app = express(); //from express
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  let mylong = req.body.longitude;
  let mylat = req.body.latitude;
  console.log("Im Tagging Routing: Lat =" + mylat);
  let myname = req.body.name;
  let myhashtag = req.body.hashtag;
  let myGT = new GeoTag(myname, mylong, mylat, myhashtag); //NEW THING ADDED
  tagStore.addGeoTag(myGT);

  console.log("my GT name: " + myGT.name);
  let nearbyList = [];    //for reponse
  let mylocation = [mylat,mylong];
  nearbyList = tagStore.getNearbyGeoTags(mylocation);
  console.log("the nearby list is here: " + nearbyList.length);
  res.render('index', { taglist: nearbyList })
});

/**
 * Route '/discovery' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests cary the fields of the discovery form in the body.
 * This includes coordinates and an optional search term.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * As response, the ejs-template is rendered with geotag objects.
 * All result objects are located in the proximity of the given coordinates.
 * If a search term is given, the results are further filtered to contain 
 * the term as a part of their names or hashtags. 
 * To this end, "GeoTagStore" provides methods to search geotags 
 * by radius and keyword.
 */

 router.post('/discovery', (req, res) => {
  var app = express(); //from express
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  let mySearchterm = req.body.searchterm;
  let mylong = 49.5//req.body.longitude; //!!
  let mylat = 8.4//req.body.latitude; //!!
  console.log("Im Discovery Routing: Lat =" + mylat);
  let myLocation= [mylong, mylat];
  console.log("Im Discovery Routing: Location =" + myLocation[0]);
  searchList = tagStore.searchNearbyGeoTags(myLocation, mySearchterm);

  res.render('index', { taglist: searchList })
 })

module.exports = router;
