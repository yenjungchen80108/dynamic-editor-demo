import s3 from "@/utils/s3";
import {
  ListObjectVersionsCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { S3_BUCKET_NAME } from "@/constants/s3";

/**
 * API: 根据 initialETag 和 latestETag 取得对应 JSON 文件内容
 * @param {string} fileName - S3 文件名
 * @param {string} latestVersionId - 最新 Version ID
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { fileName, latestVersionId } = req.body;

  if (!fileName || !latestVersionId) {
    return res.status(400).json({
      message: "fileName and latestVersionId are required",
    });
  }

  try {
    const bucketName = process.env.AWS_BUCKET_NAME || S3_BUCKET_NAME;

    // **Step 1: 获取 S3 所有版本**
    const listCommand = new ListObjectVersionsCommand({
      Bucket: bucketName,
      Prefix: fileName,
    });
    const listResponse = await s3.send(listCommand);

    if (!listResponse.Versions || listResponse.Versions.length === 0) {
      return res
        .status(404)
        .json({ message: "No versions found for the given file." });
    }

    // **Step 2: 取得对应版本的 JSON 文件**
    const fetchS3Json = async (versionId) => {
      const getObjectCommand = new GetObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        VersionId: versionId,
      });

      const response = await s3.send(getObjectCommand);
      const body = await response.Body.transformToString("utf-8"); // 转换 JSON
      return JSON.parse(body);
    };

    const latestJson = await fetchS3Json(latestVersionId);

    res.status(200).json({ latestJson });
  } catch (error) {
    console.error("Error fetching latest config:", error);
    res.status(500).json({ message: "Failed to fetch config versions" });
  }
}
