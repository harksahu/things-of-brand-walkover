import express from "express";
import {  deleteStuff, searchStuffName, UpdateStuff } from "../controllers/MyStuffController.js";


const routes = express.Router();


routes.route('/').put(UpdateStuff)
routes.route('/:email').get(searchStuffName)
routes.route('/:id').delete(deleteStuff);
export default routes;
