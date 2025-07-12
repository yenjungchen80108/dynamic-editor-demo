import { GetObjectCommand } from "@aws-sdk/client-s3";

import { S3_BUCKET_NAME } from "@/constants/s3";
import s3 from "@/utils/s3";

async function streamToString(stream) {
  const chunks = [];
  for await (let chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf-8");
}

export default async function handler(req, res) {
  const fileName = req.query.fileName;
  if (!fileName) return res.status(400).json({ error: "Missing fileName" });

  try {
    const data = await s3.send(
      new GetObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: fileName,
      })
    );
    const body = await streamToString(data.Body);
    const json = JSON.parse(body);
    res.status(200).json(json);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch file", details: err.message });
  }
}
