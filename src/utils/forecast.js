const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=b92298cd32c0b3f7436d5f1fc61c3e72&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service");
    } else if (body.error) {
      callback("Unable to find location");
    } else {
      callback(
        undefined,
        `In ${body.location.name}, it is currently` +
        body.current.weather_descriptions[0] +
          ". The temperature is " +
          body.current.temperature +
          "C. The temperature feels like " +
          body.current.feelslike +
          " degrees out." + `The local time is ${body.location.localtime}`
      );
    }
  });
};

module.exports = forecast;
