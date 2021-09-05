const express = require('express')
const dontenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')

const connectDB = require('./server/database/connection')

const app = express()

//dontenv.config({path:'config.env'})
const PORT = 8080

//log requests
app.use(morgan('tiny'))

//Mongodb connection
connectDB();

//paese request to body-parser
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set("view engine","ejs")
//app.set("views",path.resolve(__dirname,"views/ejs"))
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

//load routes
app.use('/',require('./server/routes/router'))


app.listen(PORT, () => {
    console.log(`App in running at http://localhost:${PORT}`)
})