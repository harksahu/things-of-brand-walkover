import express from "express";
import { searchBrandName } from "../controllers/SearchController.js";


const routes = express.Router();


routes.route('/:text').get(searchBrandName);

export default routes;
