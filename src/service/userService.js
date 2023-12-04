import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
// get the client
import mysql from 'mysql2';

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jwt'
});

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword
}

const createNewUser = (email, password, userName) => {
    let hashPass = hashUserPassword(password, salt) 

  connection.query(
    ' INSERT INTO users (email, password, username) VALUES (?,?,?)', [email, hashPass, userName],
    function(err, results, fields) {
      if (err) {
        console.log(err)
      }
    }
  );
}

const getUserList = () => {
  connection.query(
    ' SELECT * FROM users ',
    function(err, results, fields) {
      if (err) {
        console.log(err)
      }
      console.log(results)
    }
  );
}

module.exports = {
    createNewUser, getUserList
}