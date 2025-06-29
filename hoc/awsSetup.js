const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-providers");

// 使用 `fromIni` 加载 `personal/default` Profile
const s3 = new S3Client({
  region: "us-east-1", // 替换为你的 AWS 区域
  credentials: fromIni({ profile: "personal" }), // 指定 personal Profile
});

// 示例：列出所有存储桶
const listBuckets = async () => {
  try {
    const response = await s3.send(new ListBucketsCommand({}));
    console.log("Buckets:", response.Buckets);
  } catch (err) {
    console.error("Error listing buckets:", err);
  }
};

listBuckets();
