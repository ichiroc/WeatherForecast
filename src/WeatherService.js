// @flow
import CurrentWeather from './CurrentWeather'

const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = 'ed0f749da5bcdf85b44fd299bcf99576'

function getCurrentWeatherEndpoint(query: string) {
  return `${BASE_URL}weather?q=${query}`
  + `&appid=${API_KEY}`
}

function getCurrentWeather(city: string) : Promise<CurrentWeather> {
  const endpoint = getCurrentWeatherEndpoint(city)
  return fetch(endpoint)
    .then(response => response.json())
    .then(json => new CurrentWeather(json))
}

export { getCurrentWeather }
