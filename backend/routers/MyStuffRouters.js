import express from "express";
import {  deleteBrand, searchBrandName, UpdateBrand } from "../controllers/MyStuffController.js";


const routes = express.Router();


routes.route('/').put(UpdateBrand).delete(deleteBrand);
routes.route('/:email').get(searchBrandName)
export default routes;
