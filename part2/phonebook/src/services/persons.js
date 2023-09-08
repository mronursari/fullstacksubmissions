import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getInitialList = () => {
    const request = axios.get(baseUrl)

    return request.then(response => response.data)
}

const addNewPerson = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)

    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)

    return request.then(response => response.data)
}

const replacePerson = (newPerson) => {
    const request = axios.put(`${baseUrl}/${newPerson.id}`, newPerson)

    return request.then(response => response.data)
}


export default {getInitialList, addNewPerson, deletePerson, replacePerson}