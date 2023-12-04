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
        const [rows, fields] = await connection.execute(' INSERT INTO users (email, password, username) VALUES (?,?,?)' , [email, hashPass, userName]);

    } catch (error) {
        console.log(error)
    }
    
}

const getUserList = async () => {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});

    try {
        const [rows, fields] = await connection.execute(' SELECT * FROM users');
        return rows
    } catch (error) {
        console.log('check error', error)   
    }
}

const deleteUser = async (id) => {
    // DELETE FROM users WHERE id='Alfreds Futterkiste';
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});

    try {
        const [rows, fields] = await connection.execute(' DELETE FROM users WHERE id=?', [id]);
        return rows
    } catch (error) {
        console.log('check error', error)   
    }
}

module.exports = {
    createNewUser, getUserList, deleteUser
}