import s3 from "@/utils/s3";
import { PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3_BUCKET_NAME } from "@/constants/s3";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { fileName } = req.body;

  if (!fileName) {
    return res.status(400).json({ message: "fileName is required" });
  }

  try {
    const bucketName = process.env.AWS_BUCKET_NAME || S3_BUCKET_NAME;
    const key = `${fileName}`;

    // **Step 1: 获取最新的 ETag**
    let latestETag = null;
    try {
      const headCommand = new HeadObjectCommand({
        Bucket: bucketName,
        Key: key,
      });
      const headResponse = await s3.send(headCommand);
      latestETag = headResponse.ETag.replace(/"/g, ""); // 去掉引号
    } catch (error) {
      console.warn("File may not exist yet, proceeding without ETag.");
    }

    const cacheControl = "max-age=180";

    // **Step 2: 生成 Presigned URL**
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: "application/json",
      CacheControl: cacheControl,
    });

    const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 900 }); // URL 有效期 15 分钟

    // **Step 3: 返回最新 ETag 和 Presigned URL**
    res.status(200).json({
      url: presignedUrl,
      key,
      latestETag,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": cacheControl,
      },
    });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    res.status(500).json({ message: "Failed to generate presigned URL" });
  }
}
