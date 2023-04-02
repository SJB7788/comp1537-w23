const express = require('express');
const cors = require('cors')
const app = express()

app.use(cors())

app.use(express.json());
app.post('/search', (req, res) => {
    console.log(req.query);

    res.send('Hello World!')
})

module.exports = app