const { SHA256 } = require('crypto-js');

const username = 'ninja master';
const hash = SHA256(username).toString();

console.log(username, hash);
// ninja master =?= e992bbfe0dfddf6e985300f22bc5a055faee620afb6cff0013561ac09d6679df

/*
  Hashing is a one way algorithm. A hashing function will return
  the same results for the same input every time.

  Uses:

  1) Passwords stored in a database as plain text can be viewed
  by anyone with access to the database. Storing Passwords as a
  hash provides another level of security.

  2) Sharing data a hash can be used to verify that data has not
  been modified in transition.
*/

// Client -----
const user = {
  id: 123
};

const token = {
  user,
  hash: SHA256(JSON.stringify(user)).toString()
}

// Interwebs -------



// Server
