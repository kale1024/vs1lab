// File origin: VS1LAB A3, A4

/**
 * This script defines the main router of the GeoTag server.
 * It's a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * Define module dependencies.
 */

const express = require('express');
const req = require('express/lib/request'); //aus V3
const router = express.Router();

/**
 * The module "geotag" exports a class GeoTagStore. 
 * It represents geotags.
 */
// eslint-disable-next-line no-unused-vars
const GeoTag = require('../models/geotag');

/**
 * The module "geotag-store" exports a class GeoTagStore. 
 * It provides an in-memory store for geotag objects.
 */
// eslint-disable-next-line no-unused-vars
const GeoTagStore = require('../models/geotag-store');
var tagStore = new GeoTagStore(); // App routes (A3)
tagStore.populate(); // App routes (A3)
/**
 * Route '/' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests cary no parameters
 *
 * As response, the ejs-template is rendered without geotag objects.
 */

router.get('/', (req, res) => {
  res.render('index', { taglist: [] })
});

// API routes (A4)

/**
 * Route '/api/geotags' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests contain the fields of the Discovery form as query.
 * (http://expressjs.com/de/4x/api.html#req.body)
 *
 * As a response, an array with Geo Tag objects is rendered as JSON.
 * If 'searchterm' is present, it will be filtered by search term.
 * If 'latitude' and 'longitude' are available, it will be further filtered based on radius.
 */

// TODO: ... your code here ...


/**
 * Route '/api/geotags' for HTTP 'POST' requests.
 * (http://expressjs.com/de/4x/api.html#app.post.method)
 *
 * Requests contain a GeoTag as JSON in the body.
 * (http://expressjs.com/de/4x/api.html#req.query)
 *
 * The URL of the new resource is returned in the header as a response.
 * The new resource is rendered as JSON in the response.
 */

// TODO: ... your code here ...
/* AUS V3
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
}); */

/**
 * Route '/api/geotags/:id' for HTTP 'GET' requests.
 * (http://expressjs.com/de/4x/api.html#app.get.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * The requested tag is rendered as JSON in the response.
 */

// TODO: ... your code here ...


/**
 * Route '/api/geotags/:id' for HTTP 'PUT' requests.
 * (http://expressjs.com/de/4x/api.html#app.put.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 * 
 * Requests contain a GeoTag as JSON in the body.
 * (http://expressjs.com/de/4x/api.html#req.query)
 *
 * Changes the tag with the corresponding ID to the sent value.
 * The updated resource is rendered as JSON in the response. 
 */

// TODO: ... your code here ...
/*AUS V3
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
 })*/ 

/**
 * Route '/api/geotags/:id' for HTTP 'DELETE' requests.
 * (http://expressjs.com/de/4x/api.html#app.delete.method)
 *
 * Requests contain the ID of a tag in the path.
 * (http://expressjs.com/de/4x/api.html#req.params)
 *
 * Deletes the tag with the corresponding ID.
 * The deleted resource is rendered as JSON in the response.
 */

// TODO: ... your code here ...

module.exports = router;
