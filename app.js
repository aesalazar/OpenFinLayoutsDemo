//Setup browserify and watchify to build the .js files
const watchify = require('./server/watchify');

//Setup the web server
const webPort = 5000;
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
app.use(express.static('./public'));

//Start the web server
server.listen(process.env.PORT || webPort, () => {
    console.log('Listening on%j\n', server.address());
});