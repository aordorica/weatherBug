const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs');
const request = require('postman-request');
const forecast = require('./utils/forecast');
const gecode = require('./utils/geocode')

// Define default port to for deployment
const port = process.env.PORT || 3000

//Define Path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views path location
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

//Setup static directory to serve up
app.use(express.static(path.join(publicDirectoryPath)))

//Define page routing
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Alan Ordorica'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Alan Ordorica'
    })
})

app.get('/help', (req, res) => {
    res.render('help', { 
        title: 'Help',
        name: 'Alan Ordorica',
        helpText: 'Some help message'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'No search address provided. Please provide a search address!'
        })
    }

    gecode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({
                error,
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                address: req.query.address,
                location: location,
                forecast: forecastData
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 'Help 404',
        name: 'Alan Ordorica',
        message: 'HELP Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404 Page Not Found',
        name: 'Alan Ordorica',
        message: 'Page Not Found!'
    })
})

app.listen(port, () => {
    console.log('Express server is up and running!');
})
