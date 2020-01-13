import 'zone.js/dist/zone-node';

import * as express from 'express';
import {join} from 'path';
import * as compression from 'compression';

// Express server
const app = express();
app.use(compression());

const PORT = process.env.PORT || 4000;
const HTTPS_PORT = process.env.HTTPS_PORT || 4443;

const KEY_CERTIFICATE = process.env.KEY_CERTIFICATE;
const CRT_CERTIFICATE = process.env.CRT_CERTIFICATE;
const PASSWORD_CERTIFICATE = process.env.PASSWORD_CERTIFICATE;

const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap} = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Our page routes
export const routes: string[] = [
  '/',
  'portfolio-full-stack-developer-ingeniero-software',
  'portfolio-full-stack-developer-ingeniero-software/proyecto/:lang/:nom',
  'portfolio-full-stack-developer-ingeniero-software/grupo/tecnologia/:lang/:theme',
  'portfolio-full-stack-developer-software-engineer',
  'portfolio-full-stack-developer-software-engineer/project/:lang/:nom',
  'portfolio-full-stack-developer-software-engineer/group/technology/:lang/:theme',
  `${encodeURIComponent('é¡¹ç›®ç»„åˆå…¨æ ˆå¼€å‘äººå‘˜è½¯ä»¶å·¥ç¨‹å¸ˆ')}`,
  `${encodeURIComponent('é¡¹ç›®ç»„åˆå…¨æ ˆå¼€å‘äººå‘˜è½¯ä»¶å·¥ç¨‹å¸ˆ')}/${encodeURIComponent('é¡¹ç›®')}/:lang/:nom`, 
  `${encodeURIComponent('é¡¹ç›®ç»„åˆå…¨æ ˆå¼€å‘äººå‘˜è½¯ä»¶å·¥ç¨‹å¸ˆ')}/${encodeURIComponent('ç»„')}/${encodeURIComponent('æŠ€æœ¯')}/:lang/:theme`,
  'portfolio-full-stack-developer-ingeniero-software/historial',
  'portfolio-full-stack-developer-software-engineer/history',
  `${encodeURIComponent('é¡¹ç›®ç»„åˆå…¨æ ˆå¼€å‘äººå‘˜è½¯ä»¶å·¥ç¨‹å¸ˆ')}/${encodeURIComponent('è¨˜éŒ„')}`,
  'portfolio-full-stack-developer-software-engineer/dashboard',
  'portfolio-full-stack-developer-software-engineer/dashboard/contact'
];
   
routes.forEach(route => {
  app.get(`/${route}`, (req, res) => {
    console.log('--------------------------------- nova peticio ---');
    console.log('accept-language:' + req.headers["accept-language"]);
    console.log('user-agent:' + req.headers["user-agent"]);
    console.log('cookie:' + req.headers["cookie"]);
    console.log('idioma request:' + req.query.lang + '|url request:' + req.originalUrl);
    console.time(`GET: ${req.originalUrl}`);
    res.render('index', { req });
    console.timeEnd(`GET: ${req.originalUrl}`);
  });
  
  app.get(`/${route}/*`, (req, res) => {
    console.log('--------------------------------- nova peticio ---');
    console.log('accept-language:' + req.headers["accept-language"]);
    console.log('user-agent:' + req.headers["user-agent"]);
    console.log('cookie:' + req.headers["cookie"]);
    console.log('idioma request:' + req.query.lang + '|url request:' + req.originalUrl);
    console.time(`GET: ${req.originalUrl}`);
    res.render('index', { req });
    console.timeEnd(`GET: ${req.originalUrl}`);
  });
});

// Server static files from /browser
app.get('/web', express.static(DIST_FOLDER, { 'index': false }));

app.get('/**', express.static(DIST_FOLDER));

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