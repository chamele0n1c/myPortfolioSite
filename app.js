const sqrl = require('squirrelly');
const app = require('express')();
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100
  });
app.use(apiLimiter);
/*

const fs = require('fs');
const https = require('https');
const privateKey  = fs.readFileSync('ssl/server.key', 'utf8');
const certificate = fs.readFileSync('ssl/server.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

*/
const httpPort = 80;
//const sslPort = 443;
const baseURL = 'http://localhost/';
const views = {

    splash: 'views\\slpash.sqrl',
    projects: 'views\\projects.sqrl',
    me: 'views\\me.sqrl',
    contact: 'views\\contact.sqrl'

};

//Site Get Index / Serve Splash Page
app.get('/', (req, res) => {
    const rendered = sqrl.renderFile(views.splash);
    res.send(rendered);
});

//Serve Projects Page
app.get('/projects', (req, res) => {
    const rendered = sqrl.renderFile(views.projects, {baseURI: baseURL, pages: {"Projects" : "/projects", "Me" : "/me", "Contact" : "/contact"}
    });
    res.send(rendered);
});

//Serve Me Portfolio Page
app.get('/me', (req, res) => {
    const rendered = sqrl.renderFile(views.me, {baseURI: baseURL, pages: {"Projects" : "/projects", "Me" : "/me", "Contact" : "/contact"}
    });
    res.send(rendered);
});

//Serve Contact Page
app.get('/contact', (req, res) => {
    const rendered = sqrl.renderFile(views.contact, {baseURI: baseURL, pages: {"Projects" : "/projects", "Me" : "/me", "Contact" : "/contact"}
    });
    res.send(rendered);
});

//Listen on port 80 HTTP (NOSSL)
app.listen(httpPort, () => console.log(`Node Server (NOSSL) listening on port ${httpPort}!`));

//Listen on port 443 HTTPS (SSL) 

/*

//UNCOMMENT AND CONFIGURE TO ENABLE
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(sslPort, () => {console.log(`Node Server (SSL) listening on port ${sslPort}`)});

*/
