// File system module
const FS = require('fs');
// Crypto module
const CRYPTO = require('crypto');
// Start time
const START = Date.now();

// Libuv threadpool
process.env.UV_THREADPOOL = 1;
console.log('Threadpool room =', process.env.UV_THREADPOOL);

// setTimeout Call
setTimeout(() => {
   console.log('Timer number 1 expired');
}, 0);

// setImmediate Call
setImmediate(() => {
   console.log('Immediate call finished');
});

// Top level Asynchronous file read
FS.readFile('./test-file.txt', 'utf-8', (err, data) => {
   setTimeout(() => {
      console.log('------------\\/-EVENT-LOOP-RESPONSES\\/------------');
   }, 0);

   console.log(data);

   // Crypto Call
   CRYPTO.pbkdf2('password', 'salt', 10000, 1024, 'sha256', () => {
      console.log(Date.now() - START, 'Password encrypted');
   });
   // Crypto Call
   CRYPTO.pbkdf2('password', 'salt', 10000, 1024, 'sha256', () => {
      console.log(Date.now() - START, 'Password 2 encrypted');
   });
   // Crypto Call
   CRYPTO.pbkdf2('password', 'salt', 10000, 1024, 'sha256', () => {
      console.log(Date.now() - START, 'Password 3 encrypted');
   });
   // Crypto Call
   CRYPTO.pbkdf2('password', 'salt', 10000, 1024, 'sha256', () => {
      console.log(Date.now() - START, 'Password 4 encrypted');
   });

   setTimeout(() => {
      console.log('---------------closing event loop------------');
   }, 3000);
});

// Top level code (Not inside any callbacks);
console.log('Hello from top level code');
