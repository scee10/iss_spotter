// iss_promised.js
const request = require('request-promise-native');

const fetchMyIP = function() {
 return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
 const ip = JSON.parse(body).ip
 return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = function (body) {
 let json = JSON.parse(body)
 const latitude = json.latitude
 const longitude = json.longitude
 let url = `http://api.xopen-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`
 return request(url)
}

const nextISSTimesForMyLocation = function (callback) {
 fetchMyIP()
 // we now have the IP object and then you are going to use it in fetch coords by ip function
 .then(ip => {
  return fetchCoordsByIP(ip)
 })
 .then(coords => {
  return fetchISSFlyOverTimes(coords)
 })
 .then(result => callback(null,result))
 .catch(err => callback(err.message,null))
}

module.exports = { nextISSTimesForMyLocation };