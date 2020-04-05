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


app.get('/weather', (request, response) => {
    try {
      const weatherAll = [];
      const weatherData = require('./data/darksky.json');
      for (let i = 0; i < weatherData.data.length; i++) {
        const locationData = new Weather(weatherData, i);
        weatherAll.push(locationData);
      }
      response.status(200).json(weatherAll);
    } catch (error) {
      errorHandler(error, request, response);
    }
  });
  function Weather(weatherData,i) {
      this.description = weatherData.data[i].weather.description;
      this.time = weatherData.data[i].valid_date;
    }



app.use('*', notFoundHandler);
function notFoundHandler(request, response) {
  response.status(500).send('Sorry, something went wrong');
}


function errorHandler(error, request, response) {
  response.status(500).send(error);
}
app.listen(PORT, () => console.log(`the server is up and running on ${PORT}`));
