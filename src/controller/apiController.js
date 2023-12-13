import loginRegisterService from "../service/loginRegisterService"

const testApi = (req, res) => {
    return res.status(200).json({
        message: "ok",
        data: 'test api'
    })
}

const handleRegister = async (req, res) => {
    try {
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'missing request parameters', //error message
                EC: '-1' ,//error code
                DT: '', 
            })
        }

        //service: create user
        let data = await loginRegisterService.registerNewUser(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: ''
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1' ,//error code
            DT: ''
        })
    }
}

module.exports = {
    testApi, handleRegister
} 