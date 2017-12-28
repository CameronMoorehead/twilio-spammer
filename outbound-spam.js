'use strict';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const faker = require('faker');
const client = require('twilio')(accountSid, authToken);

const updateSpamState = require('./spam-state');

const outboundSpam = phoneNumber => {
  let i = 1;
  const innerLoop = () => {
    setTimeout(() => {
      i++;
      if (i < 50 && updateSpamState('has', phoneNumber)) {
        createMessage(phoneNumber);
        innerLoop();
      }
    }, 2000)
  };

  innerLoop();
};

const createMessage = phoneNumber => {
  client.messages.create({
    to: phoneNumber,
    from: '+14255288380',
    body: `${faker.hacker.verb()}(ing) your phones ${faker.hacker.noun()} ...`,
  })
  .then(message => console.log(message.sid));
}

module.exports = outboundSpam;
