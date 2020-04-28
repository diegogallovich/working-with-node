const FS = require('fs');
const SERVER = require('http').createServer();

SERVER.on('request', (req, response) => {
   // Solution 1
   //    FS.readFile('./test-file.txt', (err, data) => {
   //       if (err) console.log(err);
   //       response.end(data);
   //    });

   //    // Solution 2: STREAM
   // const READABLE = FS.createReadStream('./testt-file.txt'); // Open readable stream and store in variable
   // READABLE.on('data', (data) => {
   //    // On 'data' event, grab each chunk of it
   //    response.write(data); // And do this with it
   // });
   // // Manage end of readable stream
   // READABLE.on('end', () => {
   //    response.end();
   // });
   // // Manage errors
   // READABLE.on('error', (err) => {
   //    console.log(err);
   //    response.statusCode = 500;
   //    response.end('File not found');
   // });

   // Solution 3: piping what is returned in the readable stream straight to the response
   const READABLE = FS.createReadStream('./test-file.txt');
   READABLE.pipe(response);
});

SERVER.listen(5000, 'localhost', () => {
   console.log('Server listening...');
});
