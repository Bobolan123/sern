import userIpiService from "../service/userApiService"

const readFunc = async (req,res) => {
    try {
        if (req.query.page && req.query.limit) {
            const { page, limit } = req.query;
            let data = await userIpiService.getUserWithPagination(+page, +limit)
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,//error code
                DT: data.DT
            })
            console.log("check data: ", 'page = ', page,'limit = ', limit)
        } else {
            let data = await userIpiService.getAllUser()
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,//error code
                DT: data.DT
            })
        }
  
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1' ,//error code
            DT: ''
        })    }
}
const createFunc = async (req,res) => {
    try {
        let data = await userIpiService.createNewUser()
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,//error code
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1' ,//error code
            DT: ''
        })
    }
}
const updateFunc = async (req,res) => {
    try {
        let users = await userIpiService.createUser()
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1' ,//error code
            DT: ''
        })
    }
}
const deleteFunc = async (req,res) => {
    try {
        let data = await userIpiService.deleteUser(req.body.id)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,//error code
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1' ,//error code
            DT: ''
        })
    }
}

module.exports ={
    readFunc, createFunc, updateFunc, deleteFunc
}