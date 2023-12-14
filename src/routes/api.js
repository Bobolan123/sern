import express from "express";
import apiController from "../controller/apiController";
import userController from "../controller/userController"
const router = express.Router();
/**
 *
 * @param {*} app -express app
 */
const initApiRoutes = (app) => {
  //rest api
  //GET --R, POST --C, PUT-U, DELETE - D
  router.get("/api/test-api", apiController.testApi);
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  
  router.get("/user/read", userController.readFunc)
  router.post("/user/create", userController.createFunc)
  router.put("/user/update", userController.updateFunc)
  router.delete("/user/delete", userController.deleteFunc)
  return app.use("/api/", router);
};

export default initApiRoutes;
