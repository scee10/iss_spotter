// index2.js

// const { fetchMyIP } = require('./iss_promised');
// const { fetchCoordsByIP } = require('./iss_promised');
// const { fetchISSFlyOverTimes } = require('./iss_promised')
const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation((error, passTimes) => {
 if (error) {
   return console.log("It didn't work!", error);
 }
 // success, print out the deets!
 // for (const pass of passTimes) {
 //   const time = new Date(pass.risetime * 1000);
 //   console.log(`Next pass at ${time} for ${pass.duration} seconds!`);
 // }
 console.log(passTimes);
});

// // you are calling the fetch my ip function 
// fetchMyIP()
//   // we now have the IP object and then you are going to use it in fetch coords by ip function
//   .then(data => {
//    return fetchCoordsByIP(data)
//   })
//   .then(data => {
//    return fetchISSFlyOverTimes(data)
//   })
//   .then(body => console.log(body))
  // console.log the result of return request in fetchCoordsByIP function 
  // .then(fetchISSFlyOverTimes)
  // .then(body => console.log(body));