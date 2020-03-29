import axios from 'axios'

const apiCountryCodes = axios.create({
    baseURL: 'http://192.168.0.28:3333',
})

export default apiCountryCodes