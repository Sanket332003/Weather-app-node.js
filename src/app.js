const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const path = require('path')
const  express = require('express')
const hbs = require('hbs')
const port = process.env.PORT || 3000
const app = express()
// Define a path express connfige
const   publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// set up handlebar engine and location
app.set('view engine',"hbs")// (seeting:string ,value: anyvalue)
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// set up to static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render("index",{
        hyperText:"This is a hyperText page",
        title:'Weather',
        name:'sanket beladiya'
    })
})

app.get('/about',(req, res) => {
    res.render("about",{
        title:"About",
        name:"sanket beladiya"
    })
})

app.get('/help',(req,res) => {
    res.render("help",{
        title:"Help",
        name:"THis is a help page"
    })
})

app.get('/help/*',(req,res) => {
    res.render("404",{
        title:"Help Page",
        name:'Help is not available'
    })

})
    
// app.get('*',(req,res) => {
//     res.render("404",{
//         title:'404 Page',
//         name:'404 Page Not Found'
//     })
// })

app.get('/product',(req,res) => {
    if(!req.query.search){
       return res.send({
            error:"You must Provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
       return res.send({
            error:"You must Provide a address term"
        
        })
    }

    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error){
            return res.send({
                error:error
            
            })
        }
    
        forecast(latitude,longitude,(error,forecastdata)=>{
    
            if(error){
                return res.send({
                    error:error
                
                })
                
            }

            res.send({
                location,
                forecast:forecastdata
            })
            console.log("Data :",forecastdata)
        })
    
    })
})
app.listen(port,() => {
    console.log(' Server is up on Port '+port)
})
