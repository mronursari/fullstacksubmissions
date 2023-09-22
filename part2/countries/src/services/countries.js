import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const getInitialList = () => {
    const request = axios.get(`${baseUrl}/api/all`)

    return request.then(response => response.data)
}

const getCountryFlag = (name) => {
    const request = axios.get(`${baseUrl}/name/${name}`)

    return request.then(response => response.data)
}

export default {getInitialList, getCountryFlag}