/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = function(callback) {
  //**NOTE - put breedName to make it dynamic
  const URL = `https://api64.ipify.org?format=json`;
  request(URL, (error, response, body) => {
  // inside the request callback ...
  // error can be set if invalid domain, user is offline, etc.
    if (error) {
      return callback(error, null);
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let IP = JSON.parse(body).ip;
    callback(null, IP);
  });
};

const fetchCoordsByIP = function(ip, callback) {

  const url = `https://freegeoip.app/json/${ip}`;
  request(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    // let {latitude, longitude} = JSON.parse(body);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }

    const json = JSON.parse(body);
    const latitude = json.latitude;
    const longitude = json.longitude;

    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(latitude, longitude, callback) {

  const url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;

  console.log(url);

  request(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const responseInfo = JSON.parse(body).response;

    callback(null, responseInfo);
  });
};

const nextISSTimesForMyLocation = function(callback) {

 // (error,ip) IS a callback to get the answer (which is IP) and "return callback(error,null)" -> is referring to THIS functions callback which is the function in index.js 
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords.latitude, coords.longitude, (error, data) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, data);
      });
    });
  });
};

module.exports = { fetchCoordsByIP, fetchMyIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };