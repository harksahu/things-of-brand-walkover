import { request } from 'express';
import authKeyModel from '../models/authKeyModel.js'

const storeAuthKey = async (req,res)=>{
    try {
        const data = await authKeyModel.create({
            // ...req.body,
            authKey:req.body.authKey
        });
        res.json({
            "message":"Successfully Created",
            "data":data
        }).status(200);
    } catch (error) {
        res.send({
            message:"Some Error on Server",
            error
        }).status(400);
    }
}

const deleteAuthKey = async (req,res)=>{
    try {
        const data = await authKeyModel.findOneAndDelete({
            email: req.body.email
        });
        res.json({
            "message":"Successfully Deleted",
            "data":data
        }).status(200);
    } catch (error) {
        res.send({
            message:"Some Error on Server",
            error
        }).status(400);
    }
}


const getAuthorizedKey = async (req,res)=>{

    try {
        const data = await authKeyModel.find({
            email: req.body.email
        });
        res.json({
            "message":"Related Data is Successfully Find",
            "data":data
        }).status(200);
    } catch (error) {
        res.send({
            message:"Some Error on Server",
            error
        }).status(400);
    }
}


export {
    storeAuthKey,
    deleteAuthKey,
    getAuthorizedKey
}