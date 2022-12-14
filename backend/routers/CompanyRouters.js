import express from "express";
import {createCompany,getCompanyDetails,updateCompany,getCompanyDetailss} from "../controllers/CompanyController.js";


const routes = express.Router();

routes.route('/').post(createCompany)
routes.route('/').get(getCompanyDetails);
routes.route('/:id').get(getCompanyDetailss);
routes.route('/').put(updateCompany);


export default routes;

