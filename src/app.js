const path = require('path')
const express = require('express')

const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

 
const app = express()
const port = process.env.PORT || 3000
//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPaths = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPaths)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Manpreet Singh'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Manpreet Singh'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Manpreet Singh'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:"Please provide a search address"
        })
    }
    geocode(req.query.address,(error,geocodedata)=>{
        if(error){
            return res.send({error: error})
        }
        weather(geocodedata.longitude,geocodedata.latitude,(error,weatherdata)=>{
            if(error){
                return res.send({error: error})
            }
            res.send({
                forecast: weatherdata,
                location:geocodedata.location,
                address:req.query.address
            })
        })
   
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Manpreet Singh',
        errorMessage:'Help article not found.'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Manpreet Singh',
        errorMessage:'Page not found'
    })
})

app.listen(port,() => {
    console.log('Server is up on port ' + port)
})