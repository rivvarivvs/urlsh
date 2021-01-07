const express = require('express')
const
const shortid = require('shortid')
const validUrl = require('valid-url')

//Routes


const app = express()
//connecting db

app.use(express.json({}))

//app.use routes


app.listen(3000, () => {
    console.log(`Server listening on port 3000!`)
})