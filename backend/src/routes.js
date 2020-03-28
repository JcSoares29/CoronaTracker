const express = require('express')

const routes = express.Router()

const CountriesController = require('./Controller/CountriesController')

routes.get('/countries', CountriesController.getCountries)

module.exports = routes