import express from "express";
import {createCollection,getCollectionDetails,updateCollection,deleteCollection} from "../controllers/CollectionController.js";


const routes = express.Router();

routes.route('/').post(createCollection)
routes.route('/').get(getCollectionDetails);
routes.route('/').put(updateCollection);
routes.route('/:id').delete(deleteCollection);

export default routes;

