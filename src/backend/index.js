const dummyData = require('../../dummy.json');

const express = require('express')
const app = express()
const port = 3000

app.get('/api', (req, res) => res.send('Hello World!'))
app.get('/api/incidents', (req, res) => res.send(dummyData))

app.listen(port, () => console.log(`Backend started: http://localhost:${port}`))
