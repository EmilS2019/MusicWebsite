const express = require('express')
const cors = require('cors')
const app = express()
const connectDB = require('./schema/db')
const {ApolloServer, gql} = require('apollo-server-express')
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

const typeDefs = gql`
	type Query{
		hello: String!
	}
`

const resolvers = {
	Query:{
		hello: () => "hi"
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers
})

server.applyMiddleware({app})

app.listen(PORT, () => {
	console.log(`Server Started on http://localhost:${PORT}`)
	console.log(`GraphQL Started on http://localhost:${PORT}${server.graphqlPath}`)
})
