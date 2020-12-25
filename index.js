const request = require('request');
// const LatLangURLS = 'https://api.mapbox.com/geocoding/v5/mapbox.places/India%20new%20delhi.json?access_token=pk.eyJ1IjoidGVzb2xvdGVjaCIsImEiOiJjazcwcjZ2eWwwMDJ1M25vMTZuMGdnbW9lIn0.Ns7uZqsP42cSmMFUO8PwYw'

//  request({url:LatLangURLS,json:true},(error,response)=>{
//     if(error){
//         console.log('Unable to connect the weather service.')
//     }else if(response.body.error){
//         console.log('Unable to find correct location');
//     }else{
//         const temp = response.body.features[0].center;
//         if(temp){
//             const urls = 'https://api.darksky.net/forecast/2eafb101374ab1b18cf097ad43b95b40/'+temp[1]+','+temp[0]+'?lang=hi'
//             request({url:urls,json:true},(error,response)=>{
//                 if(error){
//                     console.log('Unable to connect the service.')
//                 }else if(response.body.error){
//                     console.log(response.body.error)
//                 }else{
//                     console.log(response.body.hourly.summary +' It is currently '+response.body.hourly.data[0].temperature+' degree out. There is '+response.body.hourly.data[0].precipProbability+' change to rain.')
//                 }
//             });
//         }else{
//             console.log('Unable to find lat log! You search again')
//         }
        
//     }
// });


const GetGeoCode = (address,callback)=>{
    const urls = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidGVzb2xvdGVjaCIsImEiOiJjazcwcjZ2eWwwMDJ1M25vMTZuMGdnbW9lIn0.Ns7uZqsP42cSmMFUO8PwYw'
    request({url:urls,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect location service')
        }else if(response.body.features.length === 0){
            callback('Unable to find location. Try different search')
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name,
            })
        }
        
    })
}

GetGeoCode('India',(error,data)=>{
    if(error){
        console.log(error)
    }else{
        console.log(data)
    }
})