import express from "express";
import { createStuff, deleteStuff, searchStuffName, UpdateStuff } from "../controllers/StuffController.js";


const routes = express.Router();


routes.route('/').post(createStuff).put(UpdateStuff).delete(deleteStuff);
routes.route('/:id').get(searchStuffName);

export default routes;
