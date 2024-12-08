const express = require('express')
const app = express()
const cors = require('cors');

app.use(express.json({extended:true}))
app.use(cors());

const PORT = process.env.port || 5001

app.use('/signup', require('./routes/authRoutes/register'))

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})
