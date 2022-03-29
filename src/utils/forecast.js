const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b92298cd32c0b3f7436d5f1fc61c3e72&query=' + latitude + ',' + longitude + '&unit=c'

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service')
        } else if (body.error){
            callback('Unable to find location')
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + 
            ' degrees out. The temperature feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}


module.exports = forecast