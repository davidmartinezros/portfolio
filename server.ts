// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;


// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const HTTPS_PORT = process.env.HTTPS_PORT || 4443;

const KEY_CERTIFICATE = process.env.KEY_CERTIFICATE;
const CRT_CERTIFICATE = process.env.CRT_CERTIFICATE;
const PASSWORD_CERTIFICATE = process.env.PASSWORD_CERTIFICATE;

const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    // Our index.html
    document: template,
    url: options.req.url,
    // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }).then(html => {
    callback(null, html);
  });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// Our page routes
export const routes: string[] = [
  'main',
  'dashboard'
];

// All regular routes use the Universal engine
app.get('/', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});
routes.forEach(route => {
  app.get(`/${route}`, (req, res) => {
    res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
  });
  // Route pattern
  app.get(`/${route}/*`, (req, res) => {
    res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
  });
});

app.get('*', function(req, res) {
  res.render(join(DIST_FOLDER, 'browser', req.url), { req });
});
/*
app.get('*', function(req, res) {
  res.render('http://localhost:' + PORT + '/' + req.url);
});
*/
// All regular routes use the Universal engine
/*
app.get('*', (req, res) => {
    res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});
*/

var http = require('http');

var httpServer = http.createServer(app);

// Start up the Node server at PORT
httpServer.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});

var fs = require('fs');
var https = require('https');
if(KEY_CERTIFICATE && CRT_CERTIFICATE && PASSWORD_CERTIFICATE) {

  var privateKey  = fs.readFileSync(KEY_CERTIFICATE, 'utf8');
  var certificate = fs.readFileSync(CRT_CERTIFICATE, 'utf8');

  var credentials = {
    key: privateKey,
    cert: certificate,
    passphrase: PASSWORD_CERTIFICATE
  };
  var httpsServer = https.createServer(credentials, app);

  // Start up the Node server at HTTP_PORT
  httpsServer.listen(HTTPS_PORT, () => {
    console.log(`Node server listening on http://localhost:${HTTPS_PORT}`);
  });
}