import express from "express";
import { searchBrandName } from "../controllers/SearchController.js";


const routes = express.Router();


routes.route('/').get(searchBrandName);

export default routes;
