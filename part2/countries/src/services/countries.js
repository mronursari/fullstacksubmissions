import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'
const weatherBase = 'https://api.openweathermap.org/data/2.5/weather?'

const getInitialList = () => {
    const request = axios.get(`${baseUrl}/api/all`)

    return request.then(response => response.data)
}

const getCountryFlag = (name) => {
    const request = axios.get(`${baseUrl}/name/${name}`)

    return request.then(response => response.data)
}

const getCapitalWeather = (capitalName) => {
    const request = axios.get(`${weatherBase}q=${capitalName}&appid=${api_key}`)
    return request.then(response => response.data)
}

export default {getInitialList, getCountryFlag, getCapitalWeather}