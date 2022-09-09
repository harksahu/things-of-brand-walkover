import express from "express";
const routes = express.Router();
import {storeAuthKey, getAuthorizedKey,deleteAuthKey} from "../controllers/authKeyControllers"

routes.route('/').post(storeAuthKey);
routes.route('/:email').delete(deleteAuthKey);
routes.route('/:email').get(getAuthorizedKey);
export default routes;