import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

// create the connection, specify bluebird as Promise

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword
}

const createNewUser = async (email, password, userName) => {
    let hashPass = hashUserPassword(password, salt) 
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});
    try {
        const [rows, fields] = await connection.execute(' INSERT INTO user (email, password, username) VALUES (?,?,?)' , [email, hashPass, userName]);

    } catch (error) {
        console.log(error)
    }
    
}

const getUserList = async () => {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});

    try {
        const [rows, fields] = await connection.execute(' SELECT * FROM user');
        return rows
    } catch (error) {
        console.log('check error', error)   
    }
}

const deleteUser = async (id) => {
    // DELETE FROM user WHERE id='Alfreds Futterkiste';
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});

    try {
        const [rows, fields] = await connection.execute(' DELETE FROM user WHERE id=?', [id]);
        return rows
    } catch (error) {
        console.log('check error', error)   
    }
}

const getUserById = async (id) => {
       // DELETE FROM user WHERE id='Alfreds Futterkiste';
       const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});

       try {
           const [rows, fields] = await connection.execute(' SELECT * FROM user WHERE id=?', [id]);
           return rows
       } catch (error) {
           console.log('check error', error)   
       } 
}

const updateUserInfor = async (email,username,id) => {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});  
       try {
           const [rows, fields] = await connection.execute(' UPDATE user SET email = ?, username = ? WHERE id = ?', [email, username, id]);
           return rows
       } catch (error) {
           console.log('check error', error)   
       } 
}
module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfor
}