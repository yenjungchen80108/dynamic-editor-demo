import { useState, useEffect } from "react";
import { deepDiff } from "@/hoc/deepDiff";

/**
 * Custom Hook: 计算 JSON 差异
 * @param {Object} initialJson - 旧版本 JSON
 * @param {Object} latestJson - 最新版本 JSON
 * @returns {Object} JSON Diff 结果，例如：
 * {
 *   old: { b: "banana" },
 *   new: { b: "bananana" }
 * }
 */
const useFetchJsonDiff = (initialJson, latestJson) => {
  const [diff, setDiff] = useState(null);

  useEffect(() => {
    if (!initialJson || !latestJson) return;

    const computeDiff = (oldData, newData) => {
      return deepDiff(oldData, newData);
    };

    const result = computeDiff(initialJson, latestJson);
    setDiff(result);
  }, [initialJson, latestJson]);

  return diff;
};

export default useFetchJsonDiff;
