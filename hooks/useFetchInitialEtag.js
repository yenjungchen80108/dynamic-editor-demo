import { useEffect } from "react";
import { useHandleUpload } from "@/hooks/useHandleUpload";

/**
 * Custom Hook: 在載入時獲取 `initialETag` 並存入 `useHandleUpload`
 * @param {string} fileName - 檔案名稱
 */
export const useFetchInitialETag = (fileName) => {
  const { setInitialETag } = useHandleUpload();

  useEffect(() => {
    if (!fileName) return;

    const fetchLatestETag = async () => {
      try {
        const response = await fetch("/api/gen-presigned-post-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileName }),
        });

        if (!response.ok) throw new Error("Failed to get latest ETag");

        const { latestETag } = await response.json();
        console.log("latestETag", latestETag);
        setInitialETag(latestETag); // 記錄 `initialETag`
      } catch (error) {
        console.error("Error fetching latest ETag:", error);
      }
    };

    fetchLatestETag();
  }, [fileName, setInitialETag]); // 只在 `fileName` 變更時執行
};
