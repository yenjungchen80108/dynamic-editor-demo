/**
 * 深度遞迴，比較 oldData 與 newData 的差異
 * 若無差異，回傳 null；若有差異，回傳一個物件或陣列，內容只顯示不同的部分。
 *
 * 回傳格式示意：
 * 1. 如果是純值改變：
 *    { old: oldValue, new: newValue }
 * 2. 如果是物件裡的部分屬性改變：
 *    { someKey: { old: ..., new: ... }, anotherKey: { ... } }
 * 3. 如果是陣列裡的部分元素改變：
 *    [ null, null, { old: ..., new: ... }, null ]
 *    （此陣列中，只有第 2 或第 3 個元素等發生改變才會有值，沒改變就 null）
 */

function isEmptyDiff(diffResult) {
  if (Array.isArray(diffResult)) {
    return diffResult.length === 0;
  } else if (typeof diffResult === "object" && diffResult !== null) {
    return Object.keys(diffResult).length === 0;
  }
  // 其餘型別 (例如 { old, new } 物件) 就代表有差異
  return false;
}

export const deepDiff = (oldData, newData) => {
  // 1. 如果不是物件 (或其中一方為 null)，視作「純值比較」
  if (
    typeof oldData !== "object" ||
    typeof newData !== "object" ||
    oldData === null ||
    newData === null
  ) {
    if (oldData !== newData) {
      return { old: oldData, new: newData };
    } else {
      // 沒差異就回傳空物件
      return {};
    }
  }

  // 2. 如果都是陣列，逐一比較
  if (Array.isArray(oldData) && Array.isArray(newData)) {
    // 若長度不同 => 整個陣列就是差異
    if (oldData.length !== newData.length) {
      return { old: oldData, new: newData };
    }

    // 長度相同則比每個 index
    let resultArray = [];
    let hasDiff = false;

    for (let i = 0; i < oldData.length; i++) {
      const childDiff = deepDiff(oldData[i], newData[i]);
      resultArray.push(childDiff);
      // 檢查這個 childDiff 是否為「空」
      if (!isEmptyDiff(childDiff)) {
        hasDiff = true;
      }
    }

    // 若整個陣列都沒任何差異 => 回傳空陣列
    return hasDiff ? resultArray : [];
  }

  // 3. 都是物件 (非陣列)，逐一比較每個 key
  const allKeys = new Set([...Object.keys(oldData), ...Object.keys(newData)]);
  let resultObject = {};
  let hasDiff = false;

  for (let key of allKeys) {
    const childDiff = deepDiff(oldData[key], newData[key]);
    if (!isEmptyDiff(childDiff)) {
      resultObject[key] = childDiff;
      hasDiff = true;
    }
  }

  // 若沒有任何 key 有差異 => 回傳空物件
  return hasDiff ? resultObject : {};
};
