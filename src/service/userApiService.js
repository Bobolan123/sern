import db from "../models/index";
import {checkEmailExist, checkPhoneExist, hashUserPassword} from "./loginRegisterService"

const getAllUser = async() => {
    try {
        let users = await db.User.findAll({
            attributes: {
                exclude: ['password']
            }
        })
        // let users = await db.User.findAll({
        //     attributes:["id", "username", "email", "phone", "sex"],
        //     include: {model: db.Group, attributes: ["name", "description"],},
        // })
        if (users) {
            // let data = users.get({plain:true})
            return {
                EM: 'get data success',
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: 'get data success',
                EC:0,
                DT: []
            }
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrong with services',
            EC: 1,
            DT: null
        }
    }
}

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        let { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: {
                exclude: ['password']
            },
            include: {model: db.Group, attributes:["name", "description", "id"]},
            order: [['id', 'DESC']]

        });
        let totalPages = Math.ceil(count/limit)
        let data = {
            totalRows:count,
            totalPages: totalPages, 
            users: rows
        }
        return {
            EM: 'OK',
            EC: 0,
            DT: data
        }
    } catch (error) {
        return {
            EM: 'something wrong with services',
            EC: 1,
            DT: []
        }
    }
}

const createNewUser = async (userData) => {
    try {
        let isEmailExist = await checkEmailExist(userData.email)
        if (isEmailExist) {
            return {
                EM: 'Email already exist',
                EC: 1,
                DT: 'email'
            }
        }
        let isPhoneExist = await checkPhoneExist(userData.phone)
        if (isPhoneExist) {
            return {
                EM: 'Phone already exist',
                EC: 1,
                DT: 'phone'
            }
        }
        //hash password
        let hashPassword = hashUserPassword(userData.password)

        let data = await db.User.create({...userData, password: hashPassword})
        return {
            EM: 'create OK',
            EC: 0,
            DT: data
        }
    } catch (error) {
        
    }
}

const updateUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: {id: data.id}
        })
        if (user) {
            user.save()
        } else {
            
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where:{ id: id}
        })
        if (user) {
            await user.destroy()
            return {
                EM: 'delete user successfully',
                EC: 0,
                DT: user
            }
        }else{
            return {
                EM: 'User not exist',
                EC: 2,
                DT: []
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'err from service',
            EC: 1,
            DT: []
        }
    }
}
module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser, getUserWithPagination
}