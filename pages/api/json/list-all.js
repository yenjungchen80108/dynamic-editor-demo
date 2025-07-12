import { ListObjectsV2Command } from "@aws-sdk/client-s3";

import { S3_BUCKET_NAME } from "@/constants/s3";
import s3 from "@/utils/s3";
import { getS3Key } from "@/container/jsonEditor/utils/s3Setup";

export default async function handler(req, res) {
  const fileName = req.query.fileName;

  const key = getS3Key(fileName);

  let ContinuationToken = undefined;
  const allKeys = [];

  do {
    const output = await s3.send(
      new ListObjectsV2Command({
        Bucket: S3_BUCKET_NAME,
        Prefix: key,
        ContinuationToken,
      })
    );
    output.Contents?.forEach((obj) => allKeys.push(obj.Key));
    ContinuationToken = output.IsTruncated
      ? output.NextContinuationToken
      : undefined;
  } while (ContinuationToken);

  res.status(200).json({ keys: allKeys });
}
