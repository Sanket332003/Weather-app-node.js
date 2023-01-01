const request  = require('request')

const geocode = (address, callback) => {
    const url =  `http://api.weatherapi.com/v1/current.json?key=0bab7dd1bacc418689b143833220304&q=${address}`;

    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to Network ! Please Check the InterNet Connection !",undefined)
        }else if(body.error){
            callback("Unable to location find ! Please enter again!",undefined)
        }else{
            callback(undefined,{
                location:body.location.country,
                latitude:body.location.lat,
                longitude:body.location.lon
            })
        }
    })
}

module.exports = geocode;