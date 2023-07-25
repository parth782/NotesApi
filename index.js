

const express = require('express');
var cors = require('cors');
const connecttomongo = require('./db');
connecttomongo();

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send({
    uptime: process.uptime(),
    message: 'Welcome to Notes Application',
    timestamp: new Date.now().toLocaleString("en-GB",{timeZone:"Asia/Kolkata"})

  });
  return;
})
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.listen(process.env.PORT || 5000, () => {
  console.log(`Example app listening at http://localhost:5000`)
})
