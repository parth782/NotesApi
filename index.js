const connecttomongo=require('./db');
const express = require('express')
var cors = require('cors')



connecttomongo();
const app = express()


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Parth!')
})
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.use('/api/projects')
// app.get('/api/v1/login', (req, res) => {
//     res.send('Hello login!')
//   })
//   app.get('/api/v1/signup', (req, res) => {
//     res.send('Hello Signup!')
//   })

app.listen(process.env.PORT || 5000, () => {
  console.log(`Example app listening at http://localhost:5000`)
})
