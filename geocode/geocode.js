const request = require('request');

var getGeocode = (encodedAddress,callback) => {
  var addURI=encodeURIComponent(encodedAddress);
  request({
    url : 'https://maps.googleapis.com/maps/api/geocode/json?address='+addURI,
    json : true
  },(error,response,body) => {
    if(error){
      callback('Unable to connect google servers.');
    }
    else if(body.status==='ZERO_RESULTS'){
      callback('Invalid Address.');
    }
    else if(body.status==='OK'){
    callback(undefined,{
    address : body.results[0].formatted_address,
    latitude : body.results[0].geometry.location.lat,
    longitude : body.results[0].geometry.location.lng,
  });
  }
  });
};

module.exports = {
  getGeocode
}
