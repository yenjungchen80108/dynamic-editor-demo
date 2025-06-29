import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { setFormState } from "@/events/202501/instrEditor/store/config/slice";

/**
 * 處理 S3 上傳邏輯
 */
export const useHandleUpload = () => {
  const dispatch = useDispatch();
  const [uploadStatus, setUploadStatus] = useState("");
  const [showConflictModal, setShowConflictModal] = useState(false);
  // const [latestVersionId, setLatestVersionId] = useState(null);
  /**
   * 獲取 Presigned URL 並獲取最新 ETag
   */
  const fetchPresignedUrl = useCallback(async (fileName) => {
    try {
      const response = await fetch("/api/gen-presigned-post-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName }),
      });

      if (!response.ok) throw new Error("Failed to get presigned URL");

      const { url, latestETag } = await response.json();

      return { url, latestETag };
    } catch (error) {
      console.error("Error getting presigned URL:", error);
    }
  }, []);

  /**
   * 獲取最新版本 ID
   */
  const fetchLatestVersionId = useCallback(async () => {
    try {
      const response = await fetch("/api/list-object-versions");
      const data = await response.json();

      const versionId = data[0]?.VersionId;

      return versionId;
    } catch (error) {
      console.error("Error getting latest version ID:", error);
    }
  }, []);

  /**
   * 處理上傳邏輯
   */
  const handleUpload = useCallback(
    async (fileName, dataToUpload, initialETag) => {
      try {
        // **獲取 Presigned URL**
        const {
          url,
          // latestETag
        } = await fetchPresignedUrl(fileName);
        /*
        const latestVId = await fetchLatestVersionId(fileName);

        // **比對 initialETag 和 latestETag**
        if (initialETag && latestETag !== initialETag) {
          console.warn("Version conflict detected!");
          setShowConflictModal(true);
          toast.error(`S3 Upload Error: Version conflict detected!`);
          // setLatestVersionId(latestVId);
          dispatch(setFormState({ versionId: latestVId }));
          return;
        }
        */

        // **上傳數據**
        const fileContent = JSON.stringify(dataToUpload);

        const uploadResponse = await fetch(url, {
          method: "PUT",
          body: fileContent,
          headers: {
            "Content-Type": "application/json",
            // "If-Match": initialETag, // 讓 S3 進行版本沖突檢測
          },
        });

        /* **處理 412 版本沖突**
        if (uploadResponse.status === 412) {
          console.error("Version conflict detected!");
          // toast.error(`S3 Upload Error: Version conflict detected!`);
          setShowConflictModal(true);
          return;
        }*/

        if (!uploadResponse.ok) throw new Error("Failed to upload file to S3");

        toast.success(`S3 Upload Success - config: ${fileName}`);
        setUploadStatus(`File uploaded successfully`);
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error(`S3 Upload Error: ${error}`);
        setUploadStatus("Upload failed");
      }
    },
    []
  );

  return {
    handleUpload,
    uploadStatus,
    showConflictModal,
    setShowConflictModal,
    // latestVersionId,
  };
};
