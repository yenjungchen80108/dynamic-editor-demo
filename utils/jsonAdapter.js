/**
 * 將 instrConfig 轉換成 formFields
 * @param {Array} panelData - 原始的 panelData
 * @param {Array} formFields - 原始的 formFields
 * @returns {Array} 更新後的 formFields (深拷貝，不會改動原始 formFields)
 */
export const instrConfigToFormFields = (panelData, formFields) => {
  const result = {};

  // 遞歸取 fields
  const extractFields = (fields, data, result, index, dropType) => {
    fields?.forEach((field) => {
      const registerName = field?.registerName;
      let value = null;

      if (registerName in data) {
        value = data[registerName];
      } else if (registerName && registerName.includes(".")) {
        const keys = registerName.split(".");
        value = keys.reduce((acc, key) => acc?.[key], data);
      } else {
        value = null;
      }

      if (!result[index]) {
        result[index] = {
          id: index,
          dropType,
          fields: [],
        };
      }

      result[index].fields.push({
        id: field.id,
        type: field.type,
        registerName,
        value,
      });

      if (field.fields && Array.isArray(field.fields)) {
        extractFields(field.fields, data, result, index, dropType);
      }
    });
  };

  if (panelData) {
    panelData?.forEach((data, index) => {
      const fields = formFields[data.id]?.fields;
      if (fields) {
        extractFields(fields, data, result, index, data.id);
      }
    });
  }

  return Object.values(result);
};

/**
 * 將 formFields 轉換成 instrConfig
 * @param {object} instrTempConfig - 前端表單產生的暫存資料（含 _X 後綴）
 * @param {Array} panelData - 原始的 panelData
 * @returns {Array} 更新後的 panelData (深拷貝，不會改動原始 panelData)
 */
export const formFieldsToInstrConfig = (instrTempConfig, panelData) => {
  // console.log("instrTempConfig:", instrTempConfig);
  // console.log("panelData:", panelsConfig);

  // 深拷貝，避免直接改到原始參數
  const updatedPanelData = JSON.parse(JSON.stringify(panelData));

  /**
   * 遞迴走訪子屬性
   * @param {object} currentObj - 當前層級要處理的物件
   * @param {Array<string>} path - 從 instrTempConfig root 走到這層的 key 路徑
   */
  const recursiveApply = (currentObj, path = []) => {
    // 走訪 currentObj 的每個 key/value
    for (const [key, value] of Object.entries(currentObj)) {
      if (isObject(value)) {
        // value 還是一個物件，遞迴繼續往內找
        recursiveApply(value, path.concat(key));
      } else {
        // value 是個最底層(leaf)的值，檢查 key 是否帶有 "_index" 後綴
        const [pureKey, indexStr] = splitKeyWithIndex(key);

        // 若有解析出 index，表示要對應到 panelData[index]
        if (indexStr !== undefined && !isNaN(indexStr)) {
          const idx = Number(indexStr);
          // 先找到 panelData[idx]
          if (updatedPanelData[idx]) {
            // 根據 path (不含最後一個帶後綴的 key) 一層層往下找 (e.g. ["collapsible", "minHeight"] ...)
            let targetObj = updatedPanelData[idx];
            for (const segment of path) {
              // 若該層級不存在，就建立一個空物件
              if (!targetObj[segment]) {
                targetObj[segment] = {};
              }
              targetObj = targetObj[segment];
            }

            // targetObj 走到最終層後，設定 pureKey = value
            // 若需要做數字轉換，可自行判斷是不是 '' 或 parseInt
            targetObj[pureKey] =
              value === "" ? "" : isNaN(value) ? value : Number(value);
          }
        } else {
          // 如果沒有後綴，表示這個 key 不是要依照 index 分配 (可能是全域性的，但多半不會出現此狀況)
          // 有需要可在這裡做其它處理
        }
      }
    }
  };

  // 執行遞迴
  recursiveApply(instrTempConfig);

  return updatedPanelData;
};

/**
 * 判斷是否為物件 (排除 null, array 等)
 */
export const isObject = (value) => {
  return Object.prototype.toString.call(value) === "[object Object]";
};

/**
 * 分析 key 是否帶有 "_數字" 後綴，若有，回傳 [去除後綴後的key, index(數字)]
 * @param {string} key - 例如 "minHeight_0", "title_2", "abc" (無後綴)
 * @returns {[string, number | undefined]}
 */
export const splitKeyWithIndex = (key) => {
  const parts = key.split("_");
  if (parts.length > 1) {
    // 假設最後一段是 index
    const idx = parts.pop(); // 取出最後一段
    const pureKey = parts.join("_"); // 剩下的合併(萬一原本 key 中間也有底線)
    return [pureKey, idx];
  }
  // 沒有後綴就直接回傳
  return [key, undefined];
};
