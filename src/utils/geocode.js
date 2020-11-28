const request = require('request')

const geocode = (address,callback) => {
    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibWFubnl2aXJkaSIsImEiOiJja2hrZmg3aWoxOXh1MnFwNmVxcDBwMWtzIn0.rG0Olb_8orKYbODrPa67Ww&limit=1"
    request({url:url,json:true},(error,response)=>{
      if(error){
        callback("Unable to connect to Geocoding services!",undefined)
      }else if(response.body.features.length === 0){
        callback("No location with that name! Try another search text...",undefined)
      }else{
        callback(undefined,{
          longitude: response.body.features[0].center[0],
          latitude: response.body.features[0].center[1],
          location: response.body.features[0].place_name
        })
      }
    })
  
  }
  module.exports = geocode