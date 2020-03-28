import axios from 'axios'

const apiCountryCodes = axios.create({
    baseURL: 'http://localhost:3333',
})

export default apiCountryCodes