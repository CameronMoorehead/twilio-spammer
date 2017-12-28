'use strict';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const faker = require('faker');
const client = require('twilio')(accountSid, authToken);

const outboundSpam = (phoneNumber) => {
  client.messages.create({
    to: `+1${phoneNumber}`,
    from: '+14255288380',
    body: `Now ${faker.hacker.verb()} your phones ${faker.hacker.noun()} ...`,
  })
  .then(message => console.log(message.sid));
};

module.exports = outboundSpam;
