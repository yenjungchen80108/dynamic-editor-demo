// 列出 S3 物件版本
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

import { S3_BUCKET_NAME } from "@/constants/s3";
import s3 from "@/utils/s3";
import { getS3Key } from "@/container/jsonEditor/utils/s3Setup";

export default async function handler(req, res) {
  // const prefix = req.query.prefix || ''
  const fileName = req.query.fileName;
  // if (!fileName) {
  //   return res.status(400).json({ error: 'Missing fileName' })
  // }
  const key = getS3Key(fileName);

  try {
    const data = await s3.send(
      new ListObjectsV2Command({
        Bucket: S3_BUCKET_NAME,
        Prefix: key,
        Delimiter: "/", // 讓它只回傳「此層級」的 CommonPrefixes 與 Keys
        MaxKeys: 1000,
      })
    );
    console.log("[data]", data);
    // CommonPrefixes 為子資料夾，Contents 為該層檔案
    res.status(200).json({
      folders: data.CommonPrefixes?.map((p) => p.Prefix),
      files: data.Contents?.map((o) => o.Key),
    });
  } catch (err) {
    res.status(500).json({ error: "S3 list failed", details: err });
  }
}
