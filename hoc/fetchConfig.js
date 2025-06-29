const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-providers");
import camelcaseKeys from "camelcase-keys";

import { S3_BUCKET_NAME } from "@/constants/s3";

// 使用 `fromIni` 加载 `personal/default` Profile
const s3 = new S3Client({
  region: "us-east-1",
  credentials: fromIni({ profile: "personal" }),
});

// 从 S3 获取 JSON 数据
export const getJsonFromS3 = async (bucketName, key) => {
  try {
    const params = {
      Bucket: bucketName || S3_BUCKET_NAME,
      Key: key, // 文件名，如 "data/config.json"
    };

    const command = new GetObjectCommand(params);
    const response = await s3.send(command);

    // 解析响应数据
    const body = await streamToString(response.Body);
    const jsonData = camelcaseKeys(JSON.parse(body), { deep: true });
    // const jsonData = JSON.parse(body);

    console.log("JSON fetched successfully:", jsonData);
    return jsonData;
  } catch (err) {
    console.error("Error fetching JSON:", err);
  }
};

// 辅助函数：将流数据转换为字符串
const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });

// 示例调用
// getJsonFromS3("instr-bucket", "config/202501/actInstrPage.json");
