export const extractRegisterValues = (fields, acc, indexPrefix) => {
  fields.forEach((field, index) => {
    if (field.registerName) {
      const uniqueKey = `${field.registerName}_${indexPrefix}`;
      acc[uniqueKey] = String(field.value || "");
    }

    // 遞歸處理巢狀 fields，但不加深索引
    if (field.fields && Array.isArray(field.fields)) {
      extractRegisterValues(field.fields, acc, indexPrefix);
    }
  });
};
