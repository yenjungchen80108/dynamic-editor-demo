import { useState, useEffect } from "react";

export const useTree = (fileName) => {
  const [tree, setTree] = useState({ folders: [], files: [] });

  const normalized = fileName.endsWith("/") ? fileName : fileName + "/";

  useEffect(() => {
    fetch(`/api/json/list-all?fileName=${encodeURIComponent(normalized)}`)
      .then((r) => r.json())
      .then(({ keys }) => {
        const foldersSet = new Set();
        const files = [];

        keys.forEach((key) => {
          // 去掉前綴
          const sub = key.slice(fileName.length);
          const parts = sub.split("/");

          if (parts.length === 1) {
            // 最後一層檔案
            files.push(key);
          } else if (parts[0]) {
            // 下一層資料夾
            foldersSet.add(fileName + parts[0] + "/");
          }
        });

        const newTree = { folders: [...foldersSet], files: [...files] };
        setTree(newTree);
        console.log("[newTree]", newTree);
      });
  }, [fileName, normalized]);

  return tree;
};
