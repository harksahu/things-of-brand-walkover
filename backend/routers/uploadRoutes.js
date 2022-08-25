import express, { application, Router } from "express";
import { uploadSingleFileAndSendUrl } from "../controlllers/uploadController.js";
import upload from "../middleware/multerMiddleware.js";
const routes = express.Router();

routes.route('/single').post(upload.single,uploadSingleFileAndSendUrl);

export default routes;
