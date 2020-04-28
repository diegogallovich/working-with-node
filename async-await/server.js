const FS = require('fs');
const SUPER_AGENT = require('superagent');

const READ_FILE_PROMISE = (file) =>
   new Promise((resolve, reject) => {
      FS.readFile(file, 'utf-8', (err, data) => {
         if (err) reject('Could not locate data 😞 '); // 🚨
         resolve(data); // ✅
      });
   });

const WRITE_FILE_PROMISE = (file, data) =>
   new Promise((resolve, reject) => {
      FS.writeFile(file, data, (err) => {
         if (err) reject('Could not write data 😞 '); // 🚨
         resolve('File written successfully'); // ✅
      });
   });

// Async await process example
const GET_DOG_PIC = async () => {
   try {
      // Read breed from file
      const BREED = await READ_FILE_PROMISE(`${__dirname}/dog.txt`);
      console.log(BREED);
      // Make api request with super agent
      const API_DATA = await SUPER_AGENT.get(
         `https://dog.ceo/api/breed/${BREED}/images/random`
      );
      const DATA = API_DATA.body.message;
      console.log(DATA);
      // Write image to File
      const IMAGE_WRITE = await WRITE_FILE_PROMISE('dog-img.txt', DATA);
      // Log write result to console
      console.log(IMAGE_WRITE);
      //
      // Deal with errors
   } catch (error) {
      console.log(error);
   }
};

GET_DOG_PIC();

// READ_FILE_PROMISE(`${__dirname}/dog.txt`)
// // chained promises
//    .then((data) => {
//       console.log(`Breed: ${data}`);
//       return SUPER_AGENT.get(`https://dog.ceo/api/breed/${data}/images/random`);
//    })
//    .then((response) => {
//       // Manage res
//       console.log(response.body.message);
//       return WRITE_FILE_PROMISE('dog-img.txt', response.body.message);
//    })
//    .then((message) => {
//       console.log(message);
//    })
//    //Manage Errors
//    .catch((err) => {
//       if (err) return console.log(err);
//    });
