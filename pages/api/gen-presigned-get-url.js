import s3 from "@/utils/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3_BUCKET_NAME } from "@/constants/s3";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { file } = req.query;

  if (!file || typeof file !== "string") {
    return res.status(400).json({ message: "fileName is required" });
  }

  try {
    const bucketName = process.env.AWS_BUCKET_NAME || S3_BUCKET_NAME;
    const key = file;

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 900 });

    return res.status(200).json({ url: signedUrl });
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);
    return res.status(500).json({ error: "Failed to generate URL" });
  }
}
