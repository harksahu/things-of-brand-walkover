import express from "express";
import Middleware from "../middleware/authmiddleware.js";

import { uploadSingleFileAndSendUrl } from "../controllers/uploadController.js";
import upload from "../middleware/multerMiddleware.js";

const routes = express.Router();

routes.route('/').post(Middleware.decodeToken,upload,uploadSingleFileAndSendUrl);

export default routes;
