import db from "../models/index"
import bcrypt from 'bcryptjs'
import { Op } from "sequelize"

const salt = bcrypt.genSaltSync()

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt)
    return hashPassword;
}

const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email:userEmail }
    })
    if (user) {
        return true
    }
    return false
}
const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone:userPhone }
    })
    if (user) {
        return true
    }
    return false
}
const registerNewUser = async (rawUserData) => {
    try {
    //check
    let isEmailExist = await checkEmailExist(rawUserData.email)
    if (isEmailExist) {
        return {
            EM: 'Email already exist',
            EC: 1
        }
    }
    let isPhoneExist = await checkPhoneExist(rawUserData.phone)
    if (isPhoneExist) {
        return {
            EM: 'Phone already exist',
            EC: 1
        }
    }
    //hash password
    let hashPassword = hashUserPassword(rawUserData.password)
    //create new user
    await db.User.create({
        email:rawUserData.email,
        username: rawUserData.username,
        password: hashPassword,
        phone:rawUserData.phone
    })

    return {
        EM: 'A user create succesfully',
        EC: 0
    }
    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs in service...',
            EC: -2
        }
}
}
const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword); // true or false
}
const handleLogin = async (rawData) => {
    try {
        console.log(rawData)
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    {email: rawData.username}, 
                    {phone: rawData.username}
                ]
              }
        })
        if (user) {
            let isCorrectPassword = checkPassword(rawData.password, user.password)
            console.log(isCorrectPassword)
            if (isCorrectPassword === true) {
                return {
                    EM: 'OK!',
                    EC: 0,
                    DT: ''
                }
            }

        } 
        console.log(">>>>Not found username<<<<", rawData.username, "password", rawData.password)
        return {
            EM: 'invalid user',
            EC: 1,
            DT: ''
        
        }        

    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs in service...',
            EC: -2
        }
    }
}
module.exports = {
    registerNewUser, handleLogin
}