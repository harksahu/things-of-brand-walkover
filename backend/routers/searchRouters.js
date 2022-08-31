import express from "express";
import { searchBrandByName } from "../controllers/brandController.js";


const routes = express.Router();


routes.route('/').get(searchBrandByName);

export default routes;
