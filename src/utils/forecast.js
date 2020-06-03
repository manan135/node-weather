const request = require('request');

const forecast = (location, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d0779e701e5c7ade3763630db2771dc0&query=' + location;
    request({ url: url, json: true }, (err, res, {current}) => {
        if (err) {
            callback('Error accessing the API');
        } else if (res.body.error) {
            callback('Invalid location');
        } else {
            callback(undefined, `It is currently ${current.temperature} degree and ${current.precip}% chances of rain`);
        }
    });
}

module.exports = forecast;