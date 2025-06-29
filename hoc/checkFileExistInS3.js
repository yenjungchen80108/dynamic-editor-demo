export const checkFileExistInS3 = async (bucketName, key) => {
  const S3Url = `https://${bucketName}.s3.amazonaws.com/${key}`;

  try {
    const response = await fetch(S3Url, { method: "HEAD" });

    if (response.ok) {
      return true; // 文件存在
    } else {
      return false; // 文件不存在
    }
  } catch (error) {
    console.error("Error checking file existence:", error);
    return false;
  }
};
