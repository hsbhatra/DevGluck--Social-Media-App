import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { accessKeyId, secretAccessKey, region, bucketName } from '../../config.mjs';

const s3Client = new S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
});

const uploadImage = async (file) => {
    // file: { buffer, mimetype, originalname }
    const params = {
        Bucket: bucketName,
        Key: `${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read', // or 'private' if you want restricted access
    };
    
    try {
        const command = new PutObjectCommand(params);
        const result = await s3Client.send(command);
        
        // Construct the S3 URL
        const s3Url = `https://${bucketName}.s3.${region}.amazonaws.com/${params.Key}`;
        return s3Url;
    } catch (error) {
        console.error('S3 upload error:', error);
        throw error;
    }
};

export { uploadImage };