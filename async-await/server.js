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
      //
      // Create several promise variables
      const IMG_PRO = SUPER_AGENT.get(
         `https://dog.ceo/api/breed/${BREED}/images/random`
      );
      const IMG_PRO_1 = SUPER_AGENT.get(
         `https://dog.ceo/api/breed/${BREED}/images/random`
      );
      const IMG_PRO_2 = SUPER_AGENT.get(
         `https://dog.ceo/api/breed/${BREED}/images/random`
      );
      // await promises
      const ALL_IMAGE_PROMISE_RESPONSES = await Promise.all([
         IMG_PRO,
         IMG_PRO_1,
         IMG_PRO_2,
      ]);
      // Save promises.body.message (desired data) to variable
      const IMAGE_LINKS = ALL_IMAGE_PROMISE_RESPONSES.map(
         (img) => img.body.message
      );
      // Log images and save them as writable data
      console.log(IMAGE_LINKS);
      const DATA = IMAGE_LINKS.join('\n');
      console.log(DATA);
      // Write images to File
      const IMAGE_WRITE = await WRITE_FILE_PROMISE('dog-img.txt', DATA);
      // Log write result to console
      console.log(IMAGE_WRITE);
      //
      // Deal with errors
   } catch (error) {
      console.log(error);
      // Actually throw the error in the promise response
      throw error;
   }
   // promise return
   return "This is 🐶 GET_DOG_PIC()'s promise, file was read and images were written 📋 ";
};

// Implement IEFE (Immediately invoked function expression) to peek process execution
(async () => {
   try {
      console.log('#️⃣ Determining breed...');
      const RESULT = await GET_DOG_PIC();
      console.log(RESULT);
   } catch (error) {
      console.log('ERROR 🤬 ');
   }
})();

// console.log('#️⃣ Determining breed...');
// GET_DOG_PIC()
//    .then((result) => {
//       console.log(result);
//    })
//    .catch((err) => console.log('ERROR 🤬 '));

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
