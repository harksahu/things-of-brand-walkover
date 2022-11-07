import express from "express";
import {createProfile,getProfileDetails,updateProfile,getCompanyDetailss} from "../controllers/profileController.js";


const routes = express.Router();

routes.route('/').post(createProfile)
routes.route('/').get(getProfileDetails);
routes.route('/:id').get(getCompanyDetailss);
routes.route('/').put(updateProfile);


export default routes;

