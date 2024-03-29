# Weather Microservice

This is a simple weather microservice that provides weather information for a given location using the geographical coordinates of latitude and longitude. After receiving the coordinates passed from my partner's app, I query the OpenWeather API to get the weather information as a middleman. The weather information is then returned to the partner's app in JSON format.

</br>

## How to clone to run weather microservice files locally

```bash
git clone https://github.com/sajidahw/weather_microservice
cd weather_microservice
npm install
```

</br>

## How to access the weather microservice online

base url:

```bash
https://weather-microservice.vercel.app/weather_microservice
```

</br>

## How to run the weather microservice

To run the weather microservice, create an OpenWeather API key (after creating an account) to save within an .env file at the root file. Then run using the following command in a new terminal to start the Express server:

```bash
node server.js
```

</br>

## How to <i>request</i> data from the weather microservice

The partner's app will send a GET request to the weather microservice with the geographical coordinates of the location.

Example http request call with endpoint would be:

```javascript
`GET/weather_microservice`;
```

The accompanying latitude and longitude passed through the request will save the coordinates as

```javascript
 lat=${lat}&lon=${lon}
```

The weather microservice will then send a GET API request to the OpenWeather API to get the weather information for the location passing along the geo coordinates with an API key.

In another terminal, using a command line to make network requests, type curl + endpoint url to http request weather data according to the passed coordinates.

Example http request in order to receive data to generate a response for San Francisco's coordinates using "curl" + endpoint url:

```javascript
curl "localhost:8080/weather_microservice?lat=37.7749&lon=122.4194"
```

to run online:
```javascript
curl "https://weather-microservice.vercel.app/weather_microservice?lat=37.7749&lon=122.4194"
```

</br>

## How to <i>receive</i> data from the weather microservice

The requested data will be sent back as a JSON object as a response from the GET HTTP method as it was requested earlier.

<br>

The weather information will be returned to the partner's app as a JSON object displaying the format of the desired fields for weather's short description, temperature in Fahrenheit and a weather icon.

<br>
From the example above using San Francisco's geo coordinates, the following JSON object will be returned:

```json
{
  "description": "Clouds",
  "temperature": 31,
  "icon": "04d"
}
```

</br>

## Using the <i><b>Test Script: testWeather.js</b></i> file to connect to the weather microservice and send a <i>request</i> and <i>receive</i> responses for weather data on predetermined locations:

<br>
Open up a new terminal and run the following command to connect to the Microservice server:

```bash
node server.js
```

Open up a second terminal and run the following command to generate weather retrieval responses for several locations:

```bash
node testWeather.js
```

<br>

## UML sequence diagram for the weather microservice

![updated_UML Sequence Diagram for Weather_Microservice](https://github.com/sajidahw/weather_microservice/assets/88634981/8fb917b2-5071-4c59-982d-ef001a9d6f8f)
