import express from "express";
const routes = express.Router();
import storeAuthKey from "../controllers/authKeyControllers"

routes.route('/').post(storeAuthKey);

export default routes;