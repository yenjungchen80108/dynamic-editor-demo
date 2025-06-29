import { HeadObjectCommand } from "@aws-sdk/client-s3";
import s3 from "@/utils/s3";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { bucketName, key } = req.body || {};
  if (!bucketName || !key) {
    return res.status(400).json({ error: "Missing bucketName or key" });
  }

  try {
    // 只要 headObject 可以正常執行，表示該物件存在
    await s3.send(
      new HeadObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      })
    );

    return res.status(200).json({ exist: true });
  } catch (error) {
    // 如果是 NotFound 表示檔案不存在
    if (error.name === "NotFound" || error.Code === "NotFound") {
      return res.status(200).json({ exist: false });
    }
    // 其他錯誤
    console.error("Check file exist error:", error);
    return res.status(500).json({ error: "Failed to check file existence" });
  }
}
