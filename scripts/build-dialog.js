#! /usr/bin/env node
const { readdirSync, readFileSync, writeFileSync } = require('fs');

const matchPortrait = /^set-portrait (.*)/;
const clearPortrait = /^clear-portrait/;
const lineBreak = /^$/;

function main(path) {
  const files = readdirSync(path);
  const dialog = files.reduce((memo, file) => {
    return {
      ...memo,
      [file]: parseDialogFile(readFileSync(path + file))
    };
  }, {});

  writeFileSync('./src/json/dialog.json', JSON.stringify(dialog, null, 2));
}

function parseDialogFile(buffer) {
  const lines = buffer.toString().split('\n');
  let currentPortrait = '';
  let currentMessage = [];
  let messages = [];

  lines.map(line => {
    if (matchPortrait.test(line)) {
      const [_, portrait] = line.match(matchPortrait);
      currentPortrait = `portrait-${portrait}`;
    } else if (lineBreak.test(line)) {
      messages.push(buildMessage(currentPortrait, currentMessage));
      currentMessage = [];
    } else if (clearPortrait.test(line)) {
      currentPortrait = '';
    } else {
      currentMessage.push(line);
    }
  });

  if (currentMessage.length) {
    messages.push(buildMessage(currentPortrait, currentMessage));
  }

  return messages;
}

function buildMessage(portrait, messages) {
  return {
    portrait,
    message: messages.join('\n')
  };
}

main('./src/dialog/');
