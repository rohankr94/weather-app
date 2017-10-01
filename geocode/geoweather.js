const request = require('request');

var getWeather = (results) => {
  var lat=results.latitude;
  var lng=results.longitude;
  request({
    url : `https://api.darksky.net/forecast/70151048a4e9304e83bbfa66c1ffbf50/${lat},${lng}`,
    json : true
  },(error,response,body) => {
    if(error){
      console.log('Unable to fetch weather reports');
    }
    else {
    console.log('Address is :'+results.address);
    console.log('Current temperature is :'+body.currently.temperature+' but it feels like :'+body.currently.apparentTemperature);
    console.log('Wind speed :',+body.currently.windSpeed);
  }
  });
  }

module.exports = {
  getWeather
}
