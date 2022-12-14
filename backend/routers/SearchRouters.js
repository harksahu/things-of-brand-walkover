import express from "express";
import { searchStuffName } from "../controllers/SearchController.js";


const routes = express.Router();


routes.route('/').get(searchStuffName);

export default routes;
