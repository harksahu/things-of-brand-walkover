import express from "express";
import {createCollection,getCollectionDetails,updateCollection} from "../controllers/CollectionController.js";


const routes = express.Router();

routes.route('/').post(createCollection)
routes.route('/').get(getCollectionDetails);
routes.route('/').put(updateCollection);


export default routes;

