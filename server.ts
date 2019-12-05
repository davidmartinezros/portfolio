// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import * as compression from 'compression';
import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();
app.use(compression());

//app.urlencoded({extended: false});

const PORT = process.env.PORT || 4000;
const HTTPS_PORT = process.env.HTTPS_PORT || 4443;

const KEY_CERTIFICATE = process.env.KEY_CERTIFICATE;
const CRT_CERTIFICATE = process.env.CRT_CERTIFICATE;
const PASSWORD_CERTIFICATE = process.env.PASSWORD_CERTIFICATE;

const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';

// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
/*
app.engine('html', (_, options, callback) => {
  const opts = { document: template, url: options.req.url };

  renderModuleFactory(AppServerModuleNgFactory, opts)
    .then(html => callback(null, html));
});
*/
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

// Load your engine
/*
app.engine('html', (filePath, options, callback) => {
  options.engine(
    filePath,
    {req: options.req, res: options.res},
    callback
  );
});
*/

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// Our page routes
export const routes: string[] = [
  'full-stack-developer-ingeniero-software',
  'full-stack-developer-ingeniero-software/proyecto/:lang/:nom',
  'full-stack-developer-ingeniero-software/grupo/tecnologia/:lang/:theme',
  'full-stack-developer-software-engineer',
  'full-stack-developer-software-engineer/project/:lang/:nom',
  'full-stack-developer-software-engineer/group/technology/:lang/:theme',
  `${encodeURIComponent('全栈开发的软件工程师')}`,
  `${encodeURIComponent('全栈开发的软件工程师')}/${encodeURIComponent('项目')}/:lang/:nom`, 
  `${encodeURIComponent('全栈开发的软件工程师')}/${encodeURIComponent('组')}/${encodeURIComponent('技术')}/:lang/:theme`,
  'full-stack-developer-ingeniero-software/historial',
  'full-stack-developer-software-engineer/history',
  `${encodeURIComponent('全栈开发的软件工程师')}/${encodeURIComponent('記錄')}`,
  'full-stack-developer-software-engineer/dashboard',
  'full-stack-developer-software-engineer/dashboard/contact',
  'full-stack-developer-software-engineer/dashboard/blog'
];

app.get('/', (req, res) => {
  console.log('--------------------------------- nova peticio ---');
  console.log('accept-language:' + req.headers["accept-language"]);
  console.log('user-agent:' + req.headers["user-agent"]);
  console.log('cookie:' + req.headers["cookie"]);
  console.log('idioma request:' + req.query.lang + '|url request:' + req.originalUrl);
  console.time(`GET: ${req.originalUrl}`);
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req, res } );
  console.timeEnd(`GET: ${req.originalUrl}`);
});

routes.forEach(route => {
  app.get(`/${route}`, (req, res) => {
    console.log('--------------------------------- nova peticio ---');
    console.log('accept-language:' + req.headers["accept-language"]);
    console.log('user-agent:' + req.headers["user-agent"]);
    console.log('cookie:' + req.headers["cookie"]);
    console.log('idioma request:' + req.query.lang + '|url request:' + req.originalUrl);
    console.time(`GET: ${req.originalUrl}`);
    res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req, res } );
    console.timeEnd(`GET: ${req.originalUrl}`);
  });
  app.get(`/${route}/*`, (req, res) => {
    console.log('--------------------------------- nova peticio ---');
    console.log('accept-language:' + req.headers["accept-language"]);
    console.log('user-agent:' + req.headers["user-agent"]);
    console.log('cookie:' + req.headers["cookie"]);
    console.log('idioma request:' + req.query.lang + '|url request:' + req.originalUrl);
    console.time(`GET: ${req.originalUrl}`);
    res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req, res } );
    console.timeEnd(`GET: ${req.originalUrl}`);
  });
});

// Server static files from /browser
app.get('/web', express.static(join(DIST_FOLDER, 'browser'), { 'index': false }));

app.get('/**', express.static(join(DIST_FOLDER, 'browser')));

// All other routes must be resolved if exist
/*
app.get('*', function(req, res) {
  res.render(join(req.url), { req });
});
*/

var http = require('http');

if(KEY_CERTIFICATE && CRT_CERTIFICATE && PASSWORD_CERTIFICATE) {

  var httpServer = http.createServer((req, res) => {
    res.writeHead(301,{Location: `https://${req.headers.host}${req.url}`});
    res.end();
  });

  var fs = require('fs');
  var https = require('https');

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
    console.log(`Node server listening on https://localhost:${HTTPS_PORT}`);
  });
} else {
  var httpServer = http.createServer(app);
}

// Start up the Node server at PORT
httpServer.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});