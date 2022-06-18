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
 
 router.get('/api/geotags', (req, res) => { //here needs some parameter
   var app = express(); //from express
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
 
   
   let mylong = req.query.longitude;
   let mylat = req.query.latitude;
   let nearbyList = [];    //for reponse
   let mylocation = [mylat,mylong];
   let mySearchterm = req.params.searchterm;
   console.log("Index.js/GET/API/GEOTAGS: Body Lat =" + mylat);
   if (mySearchterm != ""){
    nearbyList = tagStore.searchNearbyGeoTags(location, mySearchterm);
   }
    else{
   nearbyList = tagStore.getNearbyGeoTags(mylocation);}
   

   console.log("Index.js/GET/API/GEOTAGS " );
   res.status(200).json(JSON.stringify(nearbyList));
    //res.json(req.body);
   // res.render('index', { taglist: nearbyList })
 });
 
 
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
 
  router.post('/api/geotags', (req, res) => {
    let mylong = req.body.longitude;
    let mylat = req.body.latitude;
    let myhashtag = req.body.hashtag;
    let myname = req.body.name;
    let myGT = new GeoTag(myname, mylong, mylat, myhashtag);
    tagStore.addGeoTag(myGT);

    res.status(201).json(JSON.stringify(tagStore.GeoTag));  // TODO: check what result is required

    console.log("Index.js/POST/API/GEOTAGS name");
    console.log(myname);

  });
 
 
 /**
  * Route '/api/geotags/:id' for HTTP 'GET' requests.
  * (http://expressjs.com/de/4x/api.html#app.get.method)
  *
  * Requests contain the ID of a tag in the path.
  * (http://expressjs.com/de/4x/api.html#req.params)
  *
  * The requested tag is rendered as JSON in the response.
  */
 
  router.get('/api/geotags:id', (req, res) => {
    let myId = req.params.id;
    res.status(200).json(JSON.stringify(tagStore.getGeoTagById(myId))); //TODO: 200?
    console.log("Index.js/GET/API/GEOTAGS ID: ");
    console.log(req.params.id);
  });
 
 
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
 
  router.put('/api/geotags:id', (req, res) => {
    let myId = req.params.id;
    let mylong = req.body.longitude;
    let mylat = req.body.latitude;
    let myname = req.body.name;
    let myhashtag = req.body.hashtag;
    let myGeoTag = new GeoTag(myname, mylong, mylat, myhashtag);
    res.status(200).json(JSON.stringify(tagStore.changeGeoTagById(myId, myGeoTag)));
    console.log("Index.js/PUT/API/GEOTAGS ID: ");
    console.log(req.params.id);
  });
 
 
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
 
  router.delete('/api/geotags:id', (req, res) => {
    let myId = req.params.id;
    console.log("Index.js/DELETE/API/GEOTAGS ID: ")
    console.log(myId);
    let myGeoTag = tagStore.getGeoTagById(myId);
    tagStore.removeGeoTag(myGeoTag);
    res.status(200).json(JSON.stringify({}));
   
  });
 
 module.exports = router;
 

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