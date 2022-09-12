import express from "express";
import {storeAuthKey, getAuthorizedKey,deleteAuthKey} from "../controllers/authKeyControllers.js";
const routes = express.Router();

routes.route('/:email').get(getAuthorizedKey);
routes.route('/').post(storeAuthKey);
routes.route('/').delete(deleteAuthKey);
export default routes;