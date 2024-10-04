const express = require("express")

const app = express()
const PORT = 5000;
app.use(express.urlencoded({extended:true}))
app.use(express.json())
require('dotenv').config()
const productRoute = require('./routes/product.route')
const mongoose = require("mongoose")


const URI = process.env.DATABASE_URI

mongoose.connect(URI)
.then(()=>{
    console.log('connected to database')
})
.catch(()=>{
    console.log('error connecting to database')
})



app.use('/product', productRoute)


app.get('/', (req,res)=>{
    res.send('Hello World')
})



















app.listen(PORT, (err)=>{
    if(err){ 
        console.log(err)
    }else{
        console.log(`Server is running on port ${PORT}`)
    }
})