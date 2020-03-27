import axios from 'axios'

const api = axios.create({
    baseURL: 'http://coronavirus-tracker-api.herokuapp.com/v2'
})

export default api