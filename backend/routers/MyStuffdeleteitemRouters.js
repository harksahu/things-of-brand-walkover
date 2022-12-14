import express from "express";
import {  restoreStuff, searchStuffName, UpdateStuff } from "../controllers/MyDeletedStuffController.js";


const routes = express.Router();


routes.route('/').put(UpdateStuff)
routes.route('/:email').get(searchStuffName)
routes.route('/:id').delete(restoreStuff);
export default routes;
