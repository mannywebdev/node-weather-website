const request = require('request');

const weather = (longitude,latitude,callback) => {
    let url = 'https://api.climacell.co/v3/weather/realtime';
  
    let options = {
        method: 'GET',
        url : url,
        qs: {
          lat: latitude,
          lon: longitude,
          location_id: '',
          unit_system: 'si',
          fields: 'temp,weather_code,precipitation_type,humidity',
          apikey: 'OyXm6pncQCUYgvdftTxcYewlxNwLO6ny'
        }
    };
    request(options,(error,response)=>{
      if(error){
        callback('Unable to connect to weather services!',undefined)
      }else{
        const data = JSON.parse(response.body)
        if(data.message){
          callback(data.message,undefined)
        }else{
          callback(undefined,'It is currently '+data.temp.value+' degrees out there. Weather-code: '+data.weather_code.value+' Humidity: '+data.humidity.value+'% Precipitation-Type: '+data.precipitation_type.value)
        }
      }
    })
  
  }
module.exports=weather