import express from 'express';
import compression from 'compression';  // compresses requests
import lusca from 'lusca';
import fs from 'fs';

import * as cache from './util/anagram-cache';

// Controllers (route handlers)
import * as apiController from './controllers/api';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

/**
 * Primary app routes.
 */
app.get('/:word', apiController.getAnagram);

// Load the anagram word in to memory, should use a line by line event stream
// in the case of much larger wordlist file.
// Wordlist was converted to unix line ending.
const file = fs.readFileSync('wordlist.txt', { flag: 'r', encoding: 'utf8'});
const wordArray = file.split('\n');
cache.storeWordbyLength(wordArray);

export default app;
