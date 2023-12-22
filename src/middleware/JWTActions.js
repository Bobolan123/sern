require('dotenv').config()
import  jwt from 'jsonwebtoken';

const nonSecurePaths = ['/', '/login', '/register'];

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET
    let token = null    
    try {
        token = jwt.sign(payload, key, {expiresIn: process.env.JWT_EXPIRESIN});
    } catch (error) {
        console.log(error)
    }
    return token
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET
    let decoded = null
    try {
        decoded = jwt.verify(token, key)
    } catch (error) {
        console.log(error)
    }
    return decoded
}

const checkUserJWT = (req,res,next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    let cookie = req.cookies;    
    if (cookie && cookie.jwt) {
        let token = cookie.jwt
        let decoded = verifyToken(token)
        if (decoded) {
            req.user = decoded
            req.token = token
            next()
        } else {
            return res.status(401).json({
                EC:-1,
                EM: 'Not authenticated the user',
                DT: ''
            })
        }

        console.log(cookie)
    } else {
        return res.status(401).json({
            EC:-1,
            EM: 'Not authenticated the user',
            DT: ''
        })
    }
}

const checkUserPermission = (req,res,next) => {
    if (nonSecurePaths.includes(req.path) || req.path === "/account") return next();
    if (req.user) {
        let email = req.user.email
        let roles = req.user.groupWithRoles.Roles
        let currentURL = req.path
        if (!roles && roles.length === 0) {
            return res.status(403).json({
                EC:-1,
                EM: 'you dont have permission to access this resource...',
                DT: ''
            })
        }
        let canAccess = roles.some(item => item.url === currentURL)
        if (canAccess === true) {
            next()
        } else {
            return res.status(403).json({
                EC:-1,
                EM: 'you dont have permission to access this resource...',
                DT: ''
            })
        }
    } else {
        return res.status(401).json({
            EC:-1,
            EM: 'Not authenticated the user',
            DT: ''
        })
    }
}
module.exports = {
    createJWT, verifyToken, checkUserJWT, checkUserPermission   
}