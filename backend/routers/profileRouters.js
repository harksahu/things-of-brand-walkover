import express from "express";
import {createProfile,getProfileDetails,updateProfile} from "../controllers/profileController.js";


const routes = express.Router();


routes.route('/').post(createProfile)
routes.route('/').get(getProfileDetails);
routes.route('/').put(updateProfile);


export default routes;

