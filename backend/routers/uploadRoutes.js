import express from "express";

import { uploadSingleFileAndSendUrl } from "../controllers/uploadController.js";
import upload from "../middleware/multerMiddleware.js";

const routes = express.Router();

routes.route('/').post(upload,uploadSingleFileAndSendUrl);

export default routes;
