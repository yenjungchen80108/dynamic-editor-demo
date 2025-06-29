import { S3_BUCKET_NAME } from "@/constants/s3";

const IMAGE_HOST = `https://${S3_BUCKET_NAME}.s3.us-east-1.amazonaws.com`;

export const withS3Host = (path) => `${IMAGE_HOST}/${path}`;
