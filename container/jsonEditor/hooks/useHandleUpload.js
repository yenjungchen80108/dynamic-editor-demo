import { useState, useCallback } from "react";
// import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

/**
 * 封裝上傳到 S3 的邏輯
 *
 * @returns {Object} { handleUpload, uploadText }
 *   - handleUpload: 上傳函式，可在任何地方呼叫
 *   - uploadText: 當前上傳狀態字串 (成功或失敗訊息)
 */
export const useHandleUpload = () => {
  // const [uploadText, setUploadText] = useState('')
  const [uploadStatus, setUploadStatus] = useState("");
  // const dispatch = useDispatch();

  const fetchPresignedUrl = useCallback(async (fileName) => {
    try {
      const response = await fetch("/api/json/gen-presigned-post-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName }),
      });

      if (!response.ok) throw new Error("Failed to get presigned URL");

      const { url, key } = await response.json();

      return { url, key };
    } catch (error) {
      console.error("Error getting presigned URL:", error);
    }
  }, []);

  /**
   * @param {string} fileName - 要上傳到 S3 的檔名
   * @param {any} dataToUpload - 要上傳的 JSON 資料
   */
  const handleUpload = useCallback(async (fileName, dataToUpload) => {
    try {
      // 1. 向後端拿 presigned URL
      const { url, key } = await fetchPresignedUrl(fileName);

      // 2. 直接使用 presigned URL 上傳檔案內容
      // 先把 dataToUpload 轉成 JSON 字串
      const fileContent =
        typeof dataToUpload === "string"
          ? dataToUpload
          : JSON.stringify(dataToUpload);
      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: fileContent,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "s-maxage=0,max-age=0,must-revalidate",
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file to S3");
      }

      // setUploadText(`File uploaded successfully to: ${key}`)
      // dispatch(openToast({ title: `File uploaded successfully to: ${key}`, type: 'success' }))
      toast.success(`File uploaded successfully to: ${key}`);
      setUploadStatus("success");
    } catch (error) {
      // setUploadText('Upload failed')
      console.error("Upload failed:", error);
      // dispatch(openToast({ title: `Upload failed: ${error}`, type: 'danger' }))
      toast.error(`Upload failed: ${error}`);
      setUploadStatus("error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { handleUpload, uploadStatus };
};
