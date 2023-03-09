const express = require('express')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const path = require('path')

const port = process.env.PORT || 9000

const app = express()

app.use(cookieParser())

app.use(compression())

app.use(express.static('./build'))

app.get('*', function(request, response) {
	response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

module.exports = app.listen(port, function(err) {
	if (err) {
		console.log(err)
		return
	}
	console.log('Listening at http://localhost:' + port + '\n')
})
