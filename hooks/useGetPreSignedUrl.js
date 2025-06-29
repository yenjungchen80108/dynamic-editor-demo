import { useState, useEffect, useCallback } from "react";

/**
 * 生成 S3 预签名 URL（Pre-Signed URL）用于获取 JSON 文件
 * @param {string} fileName - 需要访问的 S3 文件名
 * @returns {Object} { presignedUrl, isLoading, error, fetchPresignedUrl }
 */

export const useGetPresignedUrl = ({ fileName }) => {
  if (typeof window === "undefined") {
    throw new Error("useGetPresignedUrl cannot be used on the server side");
  }

  const [presignedUrl, setPresignedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [fileExists, setFileExists] = (useState < boolean) | (null > null);

  const fetchPresignedUrl = useCallback(async () => {
    if (!fileName) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/gen-presigned-get-url?file=${fileName}`
      );
      if (!response.ok) {
        if (response.status === 404) {
          setFileExists(false);
          return;
        }
        throw new Error("Failed to get pre-signed URL");
      }

      const data = await response.json();
      setPresignedUrl(data.url);
      setFileExists(true);
    } catch (err) {
      console.error("Error fetching pre-signed URL:", err);
      setError("Failed to get Pre-Signed URL");
      setFileExists(false);
    } finally {
      setIsLoading(false);
    }
  }, [fileName]);

  useEffect(() => {
    fetchPresignedUrl();
  }, [fetchPresignedUrl]);

  return { presignedUrl, isLoading, error, fetchPresignedUrl };
};
