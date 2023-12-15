import db from "../models"

const getGroups = async () => {
    try {
        let data = await db.Group.findAll()
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
    getGroups
}