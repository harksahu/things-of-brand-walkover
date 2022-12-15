import dotenv from 'dotenv'
import aws from 'aws-sdk'
import crypto from 'crypto'
import { promisify } from "util"
const randomBytes = promisify(crypto.randomBytes)

dotenv.config()

const region = process.env.AWS_REGION
const bucketName = process.env.AWS_BUCKETNAME
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

export async function generateUploadURL() {
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')
  // const imageName = "ramdom image name"

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
    ContentType: 'image/svg+xml',
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return uploadURL
}








// import AWS from 'aws-sdk'
// import crypto, { randomUUID } from 'crypto'
// import { promisify } from "util"

// import dotenv from 'dotenv'

// dotenv.config({path:'../.env'})

// const randomBytes = promisify(crypto.randomBytes)

// const accessKeyId = process.env.AWS_ACCESS_KEY_ID
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

// const creds = {
//     accessKeyId,
// secretAccessKey    
// }

// AWS.config.update({credentials:creds , region:"ap-south-1"});
// const s3 = new AWS.S3()

// export const generateUploadUrl = async(req, res) =>{
//     console.log(req.params.file);
//     const fileName = req.query.fileName
//     const fileType = req.query.fileType
//     return s3.getSignedUrl(
//         'putObject',
//        {
//         Bucket: 'walkover.things-of-brand.assets',
//         Key:fileName+"-"+randomUUID()+"."+fileType,
//         Expires:30000}
//     )
// }