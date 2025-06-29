import s3 from "@/utils/s3";
import { ListObjectVersionsCommand } from "@aws-sdk/client-s3";
import { S3_FILE_NAME } from "@/events/202501/actPage/constant";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const count = req.query.count || 5;

  const bucketName = process.env.AWS_BUCKET_NAME;
  const objectKey = S3_FILE_NAME;

  if (!bucketName || !objectKey) {
    return res
      .status(400)
      .json({ message: "Bucket and key parameters are required" });
  }

  try {
    const command = new ListObjectVersionsCommand({
      Bucket: bucketName,
      Prefix: objectKey,
    });

    const response = await s3.send(command);

    // 過濾掉 Delete Marker
    const validVersions = response.Versions.filter((v) => !v.DeleteMarker)
      .sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified)) // 依照時間排序
      .slice(0, count); // 只取最近 5 個版本

    // 格式化回傳結果
    const versionList = validVersions.map((v) => ({
      VersionId: v.VersionId,
      LastModified: v.LastModified,
    }));

    return res.status(200).json(versionList);
  } catch (error) {
    console.error("Error fetching object versions:", error);
    return res.status(500).json({ error: "Failed to fetch versions" });
  }
}
