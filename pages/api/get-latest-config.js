import s3 from "@/utils/s3";
import {
  GetObjectCommand,
  ListObjectVersionsCommand,
} from "@aws-sdk/client-s3";
import { S3_BUCKET_NAME } from "@/constants/s3";

/**
 * API 端点：获取 S3 最新版本的 JSON 配置
 */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET requests allowed" });
  }

  const { fileName } = req.query;

  if (!fileName) {
    return res.status(400).json({ message: "fileName is required" });
  }

  try {
    const bucketName = process.env.AWS_BUCKET_NAME || S3_BUCKET_NAME;
    const key = `${fileName}`;

    // **Step 1: 获取 S3 最新版本的 Version ID**
    const listCommand = new ListObjectVersionsCommand({
      Bucket: bucketName,
      Prefix: key,
    });

    const listResponse = await s3.send(listCommand);

    if (!listResponse.Versions || listResponse.Versions.length === 0) {
      return res.status(404).json({ message: "No versions found" });
    }

    // 获取最新的 Version ID
    const latestVersion = listResponse.Versions[0]; // S3 版本是按最新优先返回的
    const latestVersionId = latestVersion.VersionId;

    // console.log("latestVersionId", latestVersionId);

    // **Step 2: 获取该 Version ID 的 JSON 数据**
    const getCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
      VersionId: latestVersionId,
    });

    const getResponse = await s3.send(getCommand);

    // 解析 S3 获取的 JSON 数据
    const bodyContents = await streamToString(getResponse.Body);

    res.status(200).json({
      latestVersionId,
      latestData: JSON.parse(bodyContents),
    });
  } catch (error) {
    console.error("Error fetching latest S3 config:", error);
    res.status(500).json({ message: "Failed to fetch latest config" });
  }
}

/**
 * 辅助函数：将 S3 响应的 ReadableStream 转换为字符串
 */
const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
    stream.on("error", reject);
  });
