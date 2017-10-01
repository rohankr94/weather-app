const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const geoweather = require('./geocode/geoweather.js');

var argv=yargs.argv;
geocode.getGeocode(argv.address,(errorMsg,results) => {
  if(errorMsg){
    console.log(errorMsg);
  }
  else{
    geoweather.getWeather(results);
  }
});
//https://api.darksky.net/forecast/70151048a4e9304e83bbfa66c1ffbf50/37.8267,-122.4233
