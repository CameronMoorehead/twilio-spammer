'use strict';

require('dotenv').config();

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const outboundSpam = require('./outbound-spam');

const app = express();

const updateSpamState = require('./spam-state');

// bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.post('/sms', (request, response) => {
  const twiml = new MessagingResponse();
  const userInput = request.body.Body;
  const user = request.body.From;

  // userInput is likely a phone #
  if (userInput.length === 10) {
    const phoneNumber = `+1${userInput}`;
    updateSpamState('add', phoneNumber)
    return outboundSpam(phoneNumber);
  } else if (userInput === 'codefellows') {
    updateSpamState('delete', user);
  } else {
    twiml.message('Please provide a 10-digit phone number with no spaces or non-numerical characters');
    response.writeHead(200, {'Content-Type': 'text/xml'});
    response.end(twiml.toString());
  }
});

// Startup Server
http.createServer(app).listen(8080, () => {
  console.log('Server is listening on port 8080');
});
