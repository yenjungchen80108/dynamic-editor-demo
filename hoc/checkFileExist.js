export const checkFileExistInS3 = async (bucketName, key) => {
  try {
    const res = await fetch("/api/check-file-exist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bucketName,
        key,
      }),
    });
    const data = await res.json();
    if (data.exist) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("呼叫 API 失敗", error);
    return false;
  }
};
