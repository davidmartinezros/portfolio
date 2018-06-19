## Portfolio

### Description
My Web Portfolio shows an introduction, my habilities, my experience, my projects, a contact form and an admin area (only accessible with authorization). You can browse the portfolio while the music plays and try to click the background and gets a surprise! ;)

With Universal, so you have a browser and a server part of the project communicating between them.

Documentation "How to convert your Angular 5 application to Universal": http://davidlearns.blogspot.com/2018/05/how-to-convert-your-angular-5-app-to.html

### Tools
Angular 5 (JS + TypeScript), Bootstrap 4, Firebase, Audio, Translate, Universal

### Requirements
npm, angular-cli

### Build, Run, Deploy
```
build:
npm install
npm install -g @angular/cli@1.4.4

build for dev:
run the file run_ng_dev.bat

build for prod:
run the file run_ng_prod.bat

deploy on firebase: 
firebase deploy

run on port 4200:
ng serve

run with universal on port 4000:
npm run universal
```

### Configuration file
You need also a file (app.json) with the configuration of the running.

```
{
  "apps" : [{
    "name"        : "davidmartinezros.com",
    "cwd"         : "/var/www/html",
    "script"      : "dist/server.js",
    "watch"       : true,
    "env": {
      "NODE_ENV": "development",
      "PORT": 80,
      "HTTPS_PORT": 443,
      "KEY_CERTIFICATE": "file_path.key",
      "CRT_CERTIFICATE": "file_path.crt",
      "PASSWORD_CERTIFICATE": "password"
    },
    "env_production" : {
      "NODE_ENV": "production",
      "PORT": 80,
      "HTTPS_PORT": 443,
      "KEY_CERTIFICATE": "file_path.key",
      "CRT_CERTIFICATE": "file_path.crt",
      "PASSWORD_CERTIFICATE": "password"
    }
  }]
}
```
Then, you have to run: pm2 start app.json

### Latest version
https://github.com/davidmartinezros/portfolio

### Published version
https://davidmartinezros.com
