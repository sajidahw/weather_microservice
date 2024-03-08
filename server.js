// this server is for my microservice I've created for my partner's project.
// he will be able to pass me his city's coordinates thru a http get request with the {lat}&{lon} saved as variables.
// I will then use those coordinates to fetch the weather data from the OpenWeather API and return it to him in a JSON format; effectively acting like the middleman between him and the OpenWeather API.

// Setting up the Server //
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors"); // frontend will be on a different server
const app = express();
const PORT = process.env.PORT || 8080;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const OPENWEATHER_API_URL = "https://api.openweathermap.org/data/2.5";

app.use(cors()); // enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(
    `"To access Weather Microservice: 
    For local access via http://localhost:8080/weather_microservice
    For deployed access via https://weather-microservice.vercel.app/weather_microservice"`
  );
});

// URL Endpoint to get weather by city coordinates
// fetch the weather data by coordinates from Alex's microservice
app.get(`/weather_microservice`, async (req, res) => {
  // saved the passed along coordinates of latitude and longitude from the query parameters from Alex's request to microservice
  const lat = req.query.lat;
  const lon = req.query.lon;

  if (!lat || !lon) {
    return res
      .status(400)
      .send("Error: The latitude and longitude parameters are missing!");
  }

  try {
    const coordWeatherData = await axios.get(
      `${OPENWEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=imperial`
    );

    // retrieving specific data elements which Alex desires instead of all data
    const shortCoordWeatherData = {
      city: coordWeatherData.data.sys.name,
      description: coordWeatherData.data.weather[0].main,
      temperature: Math.round(coordWeatherData.data.main.temp),
      icon: coordWeatherData.data.weather[0].icon,
    };

    res.status(200).json(shortCoordWeatherData); // sending weather back to Alex
  } catch (error) {
    console.error(error);
    res
      .status(500) // API call error
      .send(
        "API Error: Something went wrong when retrieving the weather data!"
      );
  }
});

app.listen(PORT, () => {
  console.log(
    ` 🌤️ ` +
      ` ` +
      `Weather Microservice Server is running on http://localhost:${PORT}; 
    press Ctrl-C to terminate.`
  );
});

// exporting the Express API to Vercel to be a serverless function
module.exports = app;

// testing coordinates
// Tokyo: 35.652832, 139.839478
// San Francisco: 37.7749, 122.4194
// New York: 40.7128, 74.0060
// London: 51.5072, 0.1276
