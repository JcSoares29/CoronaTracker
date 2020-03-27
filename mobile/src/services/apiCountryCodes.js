import axios from 'axios'

const apiCountryCodes = axios.create({
    baseURL: 'http://api.printful.com',
})

export default apiCountryCodes