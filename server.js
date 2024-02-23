// this server is for my microservice I've created for my partner's project.
// he will be able to pass me his city's coordinates thru a http get request with the {lat}&{lon} saved as variables.
// I will then use those coordinates to fetch the weather data from the OpenWeather API and return it to him in a JSON format; effectively acting like the middleman between him and the OpenWeather API.

// Setting up the Server //
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors"); // frontend will be on a different server
const app = express(); // create an instance of express
const PORT = process.env.PORT || 8080; // set the port to 8080
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const OPENWEATHER_API_URL = "https://api.openweathermap.org/data/2.5";

app.use(cors()); // enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// URL Endpoint to get weather by city coordinates
// fetch the weather data by coordinates from Alex's microservice
app.get(`/weather_microservice`, async (req, res) => {
  // saved the passed along coordinates of latitude and longitude from the query parameters
  const lat = req.query.lat;
  const lon = req.query.lon;

  // Checking if the lat and lon parameters are present
  if (!lat || !lon) {
    return res
      .status(400)
      .send("Error: The latitude and longitude parameters are missing!");
  }
  // console.log(OPENWEATHER_API_URL);
  try {
    // Fetching weather data from OpenWeather API as middleman & saving retrieved weather data to var to retain it
    const coordWeatherData = await axios.get(
      `${OPENWEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=imperial`
    );

    // console.log(
    //   `${OPENWEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=imperial`
    // );

    // retrieving specific data elements which Alex desires instead of all data
    const shortCoordWeatherData = {
      city: coordWeatherData.data.sys.name,
      description: coordWeatherData.data.weather[0].main,
      temperature: Math.round(coordWeatherData.data.main.temp),
      icon: coordWeatherData.data.weather[0].icon,
      // icon: src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
    };

    res.status(200).json(shortCoordWeatherData); // sending weather back to Alex as JSON object

    // console.log(coordWeatherData.data.main.temp);
  } catch (error) {
    console.error(error);
    res
      .status(500) // API call error
      .send(
        "API Error: Something went wrong when retrieving the weather data!"
      );
  }
});

// Listen on the port //
app.listen(PORT, () => {
  console.log(
    ` 🌤️ Weather Microservice Server is running on http://localhost:${PORT}; 
    press Ctrl-C to terminate.`
  );
});

// testing coordinates
// Tokyo: 35.652832, 139.839478
// San Francisco: 37.7749, 122.4194
// New York: 40.7128, 74.0060
// London: 51.5072, 0.1276
