'use strict';

require('dotenv').config();

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const outboundSpam = require('./outbound-spam');

const app = express();

// bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.post('/sms', (request, response) => {
  const twiml = new MessagingResponse();
  const phoneNumber = request.body.Body;

  if (phoneNumber.length === 10) {
    return outboundSpam(phoneNumber);
  } else {
    twiml.message('Please provide a 10-digit phone number');
    response.writeHead(200, {'Content-Type': 'text/xml'});
    response.end(twiml.toString());
  }
});

// Startup Server
http.createServer(app).listen(8080, () => {
  console.log('Server is listening on port 8080');
});
