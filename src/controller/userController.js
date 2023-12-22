import userIpiService from "../service/userApiService";

const readFunc = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      const { page, limit } = req.query;
      let data = await userIpiService.getUserWithPagination(+page, +limit);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC, //error code
        DT: data.DT,
      });
    } else {
      let data = await userIpiService.getAllUser();
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC, //error code
        DT: data.DT,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1", //error code
      DT: "",
    });
  }
};
const createFunc = async (req, res) => {
  try {
    let data = await userIpiService.createNewUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1", //error code
      DT: "",
    });
  }
};
const updateFunc = async (req, res) => {
  try {
    let data = await userIpiService.updateUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1", //error code
      DT: "",
    });
  }
};
const deleteFunc = async (req, res) => {
  try {
    let data = await userIpiService.deleteUser(req.body.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, //error code
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1", //error code
      DT: "",
    });
  }
};

const getUserAccount = async (req, res) => {
  return res.status(200).json({
    EM: "OK",
    EC: 0, //error code
    DT: {
      access_token: req.token,
      groupWithRoles:req.user.groupWithRoles,
      email: req.user.email,
      username: req.user.username,
    },
  });
};
module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
  getUserAccount,
};
