const yargs = require('yargs');
const axios = require('axios');
const geocode = require('./geocode/geocode.js');
const geoweather = require('./geocode/geoweather.js');

var argv=yargs.argv;
var addURI=encodeURIComponent(argv.address);
var url='https://maps.googleapis.com/maps/api/geocode/json?address='+addURI;

axios.get(url).then((response) => {
  if(response.data.status==='ZERO_RESULTS'){
    throw new Error('Invalid address');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var url = `https://api.darksky.net/forecast/70151048a4e9304e83bbfa66c1ffbf50/${lat},${lng}`;
  console.log('Address is : '+response.data.results[0].formatted_address);
  return axios.get(url).then((response) => {
    var temp = response.data.currently.temperature;
    var appTemp = response.data.currently.apparentTemperature;
    console.log(`Today's temparature is : ${temp}.But feels like ${appTemp}`);
  });
}).catch((e) => {
  if(e.code === 'ENOTFOUND'){
  console.log('Unable to connect to servers.');
}
else {
  console.log(e.message);
}
});
//https://api.darksky.net/forecast/70151048a4e9304e83bbfa66c1ffbf50/37.8267,-122.4233
