import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "@/utils/s3"; // 你配置好的 S3 客戶端
import { S3_BUCKET_NAME } from "@/constants/s3";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // 從前端傳來的 JSON 取出 { fileName, fileType }
    const { fileName, fileType } = req.body;

    if (!fileName || !fileType) {
      return res
        .status(400)
        .json({ message: "fileName and fileType are required" });
    }

    // 準備 PutObjectCommand, 設定存放桶名、檔名、ContentType 等
    const command = new PutObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: fileName,
      ContentType: fileType,
      ACL: "public-read", // 如果需要公開讀取
    });

    // 生成 Presigned URL (有效期可自行調整, 例如 900 秒 = 15 分鐘)
    const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 900 });

    return res.status(200).json({ url: presignedUrl });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return res
      .status(500)
      .json({ message: "Failed to generate presigned URL" });
  }
}
