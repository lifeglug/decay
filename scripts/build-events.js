#! /usr/bin/env node
const { readdirSync, readFileSync, writeFileSync } = require('fs');

const matchPortrait = /^set-portrait (.*)/;
const clearPortrait = /^clear-portrait/;
const lineBreak = /^$/;

function main(path) {
  const files = readdirSync(path);
  const events = files.reduce((memo, file) => {
    return memo.concat(parseEvents(readFileSync(path + file)));
  }, []);

  writeFileSync('./src/json/events.json', JSON.stringify(events, null, 2));
}

function parseEvents(buffer) {
  const lines = buffer.toString().split('\n');
  const events = [];

  lines.map(line => {
    events.push(buildEvent(...line.split(':')));
  });

  return events;
}

function buildEvent(time, type, context) {
  return {
    time: parseInt(time),
    type,
    context: context.split(',').reduce((memo, p) => {
      const [key, value] = p.split('=');
      return Object.assign({}, memo, {
        [key]: value
      });
    }, {})
  };
}

main('./src/events/');
