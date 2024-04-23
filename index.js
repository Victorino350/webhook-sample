require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.status(200)
  res.send(`Zoom Webhook sample successfully running.`)
})

app.post('/webhook', (req, res) => {
	
	// construct the message string
	let response;
	const message = `v0:${req.headers['x-zm-request-timestamp']}:${JSON.stringify(req.body)}`
	
	const hashForVerify = crypto.createHmac('sha256', process.env.ZOOM_WEBHOOK_SECRET_TOKEN).update(message).digest('hex')
	
	const signature = `v0=${hashForVerify}`
	
	if (signature === req.headers['x-zm-request-signature']){
	
	
	} else {
      response = { message: 'Unauthorized request to Zoom Webhook sample Node.js.', status: 200 }
      res.status(response.status)
      res.json(response)
	}
	
	})

app.listen(port, () => console.log(`Webhook sample Node.js listening on port ${port}!`))
