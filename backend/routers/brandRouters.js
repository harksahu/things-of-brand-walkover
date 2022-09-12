import express from "express";
import { createBrand, deleteBrand, searchBrandName, UpdateBrand } from "../controllers/brandController.js";


const routes = express.Router();


routes.route('/').post(createBrand).put(UpdateBrand).delete(deleteBrand);
routes.route('/:title').get(searchBrandName);

export default routes;
