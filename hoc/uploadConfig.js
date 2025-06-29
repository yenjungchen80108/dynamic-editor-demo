const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-providers");

import { S3_BUCKET_NAME } from "@/constants/s3";

// 配置 S3 客户端
const s3 = new S3Client({
  region: "us-east-1",
  credentials: fromIni({ profile: "personal" }),
});

// 上传 JSON 文件
export const uploadJsonToS3 = async (bucketName, key, jsonData) => {
  try {
    const params = {
      Bucket: bucketName || S3_BUCKET_NAME,
      Key: key, // 文件名，如 "data/config.json"
      Body: JSON.stringify(jsonData), // 将 JSON 数据转换为字符串
      ContentType: "application/json", // 指定文件类型
    };

    const command = new PutObjectCommand(params);
    const response = await s3.send(command);

    console.log("JSON uploaded successfully:", response);
  } catch (err) {
    console.error("Error uploading JSON:", err);
  }
};

// 示例调用
// const jsonData = { key: "value", anotherKey: "anotherValue" };
// uploadJsonToS3("instr-bucket", "config/202501/actInstrPage.json", configData);
