const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const access_key = "bc6a64bd437543218b8bb17a20594681";
  const url =
    "http://api.weatherstack.com/current?access_key=" +
    access_key +
    "&query=" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          " It is currently " +
          body.current.temperature +
          " degress out. There is a " +
          body.current.precip +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
