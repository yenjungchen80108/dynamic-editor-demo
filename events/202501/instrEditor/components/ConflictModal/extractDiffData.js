/**
 * 遞迴尋找所有具有 { old, new } 的屬性
 * @param {any} obj - 要搜尋的對象（可以是物件或陣列）
 * @param {string[]} parentPath - 當前屬性的路徑
 * @returns {Array<{ keyPath: string, oldValue: any, newValue: any }>}
 */
export const gatherChanges = (obj, parentPath = []) => {
  let changes = [];

  // 1) 先確認 obj 是物件（且不為 null）或陣列
  if (typeof obj === "object" && obj !== null) {
    // 如果 obj 同時具有 'old' 和 'new'，視為一筆差異
    if ("old" in obj && "new" in obj) {
      changes.push({
        keyPath: parentPath.join("."), // 將路徑用 '.' 串接
        oldValue: obj.old,
        newValue: obj.new,
      });
    } else {
      // 2) 如果是物件，繼續遍歷它的 key
      if (!Array.isArray(obj)) {
        for (const [key, value] of Object.entries(obj)) {
          changes.push(...gatherChanges(value, [...parentPath, key]));
        }
      } else {
        // 3) 如果是陣列，遍歷每個元素
        obj.forEach((item, index) => {
          changes.push(...gatherChanges(item, [...parentPath, index]));
        });
      }
    }
  }

  return changes;
};

/**
 * 對 panelData 做 map，逐一遞迴尋找每個 panel 內的差異
 * @param {Array} panelData
 * @returns {Array} - 回傳每個 panel 的差異結果
 *   格式：[{ index: number, changes: [{ keyPath, oldValue, newValue }, ...] }, ... ]
 */
export const extractDiffData = (panelData) => {
  if (!panelData || !Array.isArray(panelData)) return [];

  return panelData
    .map((panel, index) => {
      // 利用 gatherChanges 遞迴搜尋當前 panel
      const changes = gatherChanges(panel);

      // 如果該 panel 有差異，才回傳 { index, changes }
      return changes.length ? { index, changes } : null;
    })
    .filter(Boolean);
};
