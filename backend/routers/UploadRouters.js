import express from "express";
import Middleware from "../middleware/AuthMiddleware.js";

import { uploadSingleFileAndSendUrl } from "../controllers/UploadControllers.js";
import upload from "../middleware/MulterMiddleware.js";

const routes = express.Router();

routes.route('/').post(Middleware.decodeToken,upload,uploadSingleFileAndSendUrl);

export default routes;
