const request = require('request');

const forecast = (lat,lon, callback) =>{
    const url =  `http://api.weatherapi.com/v1/current.json?key=0bab7dd1bacc418689b143833220304&q=${lat},${lon}`;

    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to Network ! Please Check the InterNet Connection !",undefined)
        }else if(body.error){
            callback("Unable to location find ! Please enter again!",undefined)
        }else{
            callback(undefined,{
                temp_c:body.current.temp_c,
                feelslike_c:body.current.feelslike_c,
                humidity:body.current.humidity
            })
        }
    })
}

module.exports = forecast;