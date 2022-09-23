import express from "express";
import createProfile from "../controllers/profileController.js";


const routes = express.Router();


routes.route('/').post(createProfile)

export default routes;
