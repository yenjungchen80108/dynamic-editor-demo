/**
 * 验证输入是否为正整數
 * @param {string | number} value - 输入的值
 * @returns {string | boolean} - 返回错误消息或 true（验证通过）
 */
export const integerValidation = (value) => {
  if (!Number.isInteger(Number(value)) || Number(value) <= 0) {
    return "請輸入正整數";
  }
  return true;
};
