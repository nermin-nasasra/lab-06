'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT|| 4000;
const app = express();
app.use(cors());

function Location(city, geoData) {
    this.search_query = city;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;
  }

app.get('/location', (request, response) => {
    try {
      const geoData = require('./data/geo.json');
      const city = request.query.city;
      const locationData = new Location(city, geoData);
      response.status(200).json(locationData);
    } catch (error) {
      errorHandler(error, request, response);
    }
  });



// app.get('/', (request, response) => {
//   response.status(200).send('Home Page!');
// });
// app.get('/bad', (request, response) => {
//   throw new Error('oh nooooo!');
// });




app.use('*', notFoundHandler);

// HELPER FUNCTIONS
function notFoundHandler(request, response) {
  response.status(404).send('NOT FOUND!!');
}



function errorHandler(error, request, response) {
  response.status(500).send(error);
}
// Make sure the server is listening for requests
app.listen(PORT, () => console.log(`the server is up and running on ${PORT}`));
