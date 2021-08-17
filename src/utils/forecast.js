require("dotenv/config");
const request = require("postman-request");
const { env } = require("process");

const iconURL = "";

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${env.WEATHERSTACK_API_KEY}&query=${latitude},${longitude}&units=f`;
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to weather services!");
        } else if (body.error) {
            callback("Unable to find location. Please try another search.");
        } else {
            callback(
                undefined,
                `It is currently ${body.current.weather_descriptions} with a temperature of ${body.current.temperature}°. It feels like ${body.current.feelslike}° out.`,
                body.current.weather_icons[0]
            );
        }
    });
};

module.exports = forecast;
