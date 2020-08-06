require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const router = require('./routers/index.js').router
// const errHandler = require('./helpers/errHandler.js').errHandler
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(router)

// app.use(errHandler)

app.listen(port, () => {
    console.log(port)
})