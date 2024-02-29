// Description: This script tests the weather microservice by only making an http request via axios and calling it with different coordinates.

const axios = require("axios"); // to make HTTP requests

// simulates partner calling my microservice with different coordinates
// using axios params object instead of concatenating params in URL worked and is preferred by axios so it can separate from base url & encode it itself; but concatenation also works

async function testWeatherServiceByCoordinates(lat, lon) {
  try {
    // making a GET request to the microservice URL while logging response
    const response = await axios.get(
      `http://localhost:8080/weather_microservice?lat=${lat}&lon=${lon}` ||
        `https://weather_microservice.vercel.app/weather_microservice?lat=${lat}&lon=${lon}`
      // `http://localhost:8080/weather_microservice`,
      // {// params separated from base url
      //   params: {
      //     lat: lat,
      //     lon: lon,
      //   },
      // }
    );
    console.log(
      "\nRequest to microservice: \n",
      `\tcoordinates: ${lat}, ${lon}\n`,
      "\nResponse from microservice for location's weather: \n",
      response.data
    );
  } catch (error) {
    console.error("Error when calling the microservice: ", error);
  }
}

// test the microservice with different coordinates
testWeatherServiceByCoordinates(35, 139); // Tokyo
testWeatherServiceByCoordinates(40, -73); // New York
testWeatherServiceByCoordinates(51, -0.1); // London
testWeatherServiceByCoordinates(37.7749, -122.4194); // San Francisco
testWeatherServiceByCoordinates(30.033333, 31.233334); // Cairo
testWeatherServiceByCoordinates(39.952583, -75.165222); // Philly
