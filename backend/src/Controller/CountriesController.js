const axios = require('axios')

module.exports = {
    async getCountries(request, response) {
        const data = await axios.get('https://api.printful.com/countries')

        return response.json(data.data)
    },
}