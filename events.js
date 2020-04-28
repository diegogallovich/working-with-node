const HTTP = require('http');
const EVENT_EMITTER = require('events');

const MY_EMITTER = new EVENT_EMITTER();

MY_EMITTER.on('newSale', (units) => {
   console.log(`Sale made.\n${units} units sold`);
});

// Sale Event emitter with number of units
MY_EMITTER.emit('newSale', 9);

// HTTP event examples
const SERVER = HTTP.createServer();
// Set event listeners
SERVER.on('connection', (socket) => {
   console.log(socket);
});
SERVER.on('request', (req, response) => {
   //console.log(req);
   //console.log(response);
   console.log('request made to', req.url);
   response.end('response sent');
});
SERVER.on('error', (err) => {
   //console.log(err);
});

// Actually listen
SERVER.listen(5000, () => {
   console.log('listening...');
});
