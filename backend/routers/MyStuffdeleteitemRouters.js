import express from "express";
import {  restoreBrand, searchBrandName, UpdateBrand } from "../controllers/MyDeletedStuffController.js";


const routes = express.Router();


routes.route('/').put(UpdateBrand)
routes.route('/:email').get(searchBrandName)
routes.route('/:id').delete(restoreBrand);
export default routes;
