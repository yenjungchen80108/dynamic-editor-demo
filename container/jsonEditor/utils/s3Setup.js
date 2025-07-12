export function getS3Key(fileName) {
  return `${fileName}`.replace(/^\/+/, "");
}
