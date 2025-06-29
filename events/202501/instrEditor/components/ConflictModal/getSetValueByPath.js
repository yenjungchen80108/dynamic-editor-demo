/**
 * 根據 keyPath (e.g. "collapsible.minHeight")，把某個值 set 進去 obj
 * @param {object} obj - 要修改的物件 (可先 clone 好)
 * @param {string[]} pathArr - keyPath，用陣列表示
 * @param {any} value - 要設定的新值
 */
export const setValueByPath = (obj, pathArr, value) => {
  let current = obj;
  for (let i = 0; i < pathArr.length; i++) {
    const key = pathArr[i];
    // 如果不是最後一層，就進入下一層
    if (i < pathArr.length - 1) {
      // 若 path 不存在，需先建立 (避免 undefined 錯誤)
      if (!(key in current)) {
        // 如果下一個 path 是數字，表示可能是 array
        if (!isNaN(pathArr[i + 1])) {
          current[key] = [];
        } else {
          current[key] = {};
        }
      }
      current = current[key];
    } else {
      // 最後一層，直接設值
      current[key] = value;
    }
  }
};

/**
 * 取得物件(或陣列)中指定 path 的值
 * @param {object | array} obj
 * @param {string[]} pathArr
 */
export const getValueByPath = (obj, pathArr) => {
  let current = obj;
  for (let i = 0; i < pathArr.length; i++) {
    if (current == null) return undefined;
    const key = pathArr[i];
    // key 可能是數字 (array index)
    if (!isNaN(key)) {
      current = current[parseInt(key, 10)];
    } else {
      current = current[key];
    }
  }
  return current;
};

export const cloneDeep = (value) => {
  if (value === null || typeof value !== "object") {
    return value; // 基本型別直接回傳
  }

  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  if (value instanceof RegExp) {
    return new RegExp(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => cloneDeep(item));
  }

  const result = {};
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      result[key] = cloneDeep(value[key]);
    }
  }
  return result;
};
