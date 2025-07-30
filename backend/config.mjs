import dotenv from 'dotenv';

dotenv.config();

const accessKeyId= process.env.accessKeyId;
const secretAccessKey=process.env.secretAccessKey;
const region = process.env.region;
const bucketName = process.env.bucketName;
const mongodb=process.env.MongoDB;
const PORT= process.env.PORT;
const secretMessage= process.env.secretMessage;

export {
    accessKeyId, 
    secretAccessKey, 
    region, 
    bucketName,
    mongodb, 
    PORT, 
    secretMessage
}