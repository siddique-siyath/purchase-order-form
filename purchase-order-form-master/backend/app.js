const express = require("express")
const cors = require('cors')
const logger = require("morgan")
const dotenv = require("dotenv");
dotenv.config()

const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

const app = express()

const api = require('./routes/api');

mongoose.connect(process.env.dbURI)
    .then(() => {
        console.log('Connected to db');
    })
    .catch((error) => {
        console.log(error);
    })

app.use(cors())

app.use(logger('dev'))
app.use(express.json());
app.use('/api', api)
app.get('/', function (req, res) {
    res.send('From app.js')
})

app.listen(process.env.PORT, function () {
    console.log('Server running on localhost : ' + process.env.PORT)
})