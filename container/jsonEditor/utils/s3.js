import { S3Client } from '@aws-sdk/client-s3'
import { fromIni } from '@aws-sdk/credential-providers'

// 初始化 S3 Client (Server-Side)
const isLocal = process.env.NODE_ENV !== 'production'

const s3 = new S3Client({
  region: 'ap-southeast-1',
  credentials: isLocal
    ? fromIni({ profile: 'default' }) // default / profile
    : undefined,
  // credentials: isLocal
  //   ? fromIni()
  //   : {
  //       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //     },
})

export default s3
