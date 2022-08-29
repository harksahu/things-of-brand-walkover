import express from "express";
import { createBrand, deleteBrand, searchBrandName, UpdateBrand } from "../controllers/brandController.js";


const routes = express.Router();

routes.route('/').post(createBrand).get(searchBrandName).put(UpdateBrand).delete(deleteBrand);

export default routes;
