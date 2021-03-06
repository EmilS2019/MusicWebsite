const express = require('express')
const cors = require('cors')
const app = express()
const connectDB = require('./schema/db')
const bodyParser = require('body-parser')

app.use(cors())
app.use(express.json())
app.use(bodyParser.json({limit:'10mb', extended:true}))
app.use(bodyParser.urlencoded({limit:'10mb', extended:true}))
connectDB()

const PORT = process.env.PORT || 5000
app.use('/api/blogs', require('./routes/blogs'))
app.use('/api/samples', require('./routes/samples'))

//ONLY USE IN PRODUCTION
/*const path = require('path')
app.use(express.static(path.join(__dirname, 'frontend/build')))
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
})*/

app.listen(PORT, () => {
	console.log(`Server Started on http://localhost:${PORT}`)
})
