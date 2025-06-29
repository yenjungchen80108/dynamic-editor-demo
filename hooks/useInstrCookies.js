import { useCallback } from "react";
import Cookies from "js-cookie";

/**
 * 自訂 Hook：提供設定 fileName & instrPageId cookie 的方法
 */
export function useInstrCookies() {
  /**
   * 封裝 cookies 設定邏輯
   * @param {string} fileName
   * @param {string} instrPageId
   */
  const setInstrCookies = useCallback((fileName, instrPageId) => {
    Cookies.set("fileName", fileName, {
      path: "/",
      expires: 7, // 7 天
    });

    Cookies.set("instrPageId", instrPageId, {
      path: "/",
      expires: 7,
    });
  }, []);

  return { setInstrCookies };
}
