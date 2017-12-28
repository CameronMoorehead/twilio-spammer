'use strict';

const spamState = new Set();
const updateSpamState = (command, phoneNumber) => {
  if (command === 'add') {
    spamState.add(phoneNumber);
    return;
  }
  if (command === 'delete') {
    spamState.delete(phoneNumber);
    return;
  }
  if (command === 'has') {
    return spamState.has(phoneNumber);
  }
}

module.exports = updateSpamState;
