export const getFileInS3 = async (bucketName, key) => {
  const S3Url = `https://${bucketName}.s3.amazonaws.com/${key}`;
  let result = null;

  try {
    const response = await fetch(S3Url, { method: "HEAD" });

    result = response.json();
    console.log("result", result);
  } catch (error) {
    console.error("Error checking file existence:", error);
    return null;
  }

  return result;
};
