import axios from 'axios'

const apiCorona = axios.create({
    baseURL: 'http://coronavirus-tracker-api.herokuapp.com/v2'
})

export default apiCorona