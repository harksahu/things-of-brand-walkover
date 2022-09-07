import AWS from 'aws-sdk'
import crypto, { randomUUID } from 'crypto'
import { promisify } from "util"

import dotenv from 'dotenv'

dotenv.config({path:'../.env'})

const randomBytes = promisify(crypto.randomBytes)

const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const creds = {
    accessKeyId,
secretAccessKey    
}

AWS.config.update({credentials:creds , region:"ap-south-1"});
const s3 = new AWS.S3()

export const generateUploadUrl = async(req, res) =>{
    const fileName = req.query.fileName
    const fileType = req.query.fileType
    return s3.getSignedUrl(
        'putObject',
       {
        Bucket: 'walkover.things-of-brand.assets',
        Key:fileName+"-"+randomUUID()+"."+fileType,
        Expires:30000}
    )
}