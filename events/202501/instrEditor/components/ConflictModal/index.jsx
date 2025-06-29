import React, { useState, useEffect } from "react";
import "./styles.css";
import { fetchJsonById } from "@/hoc/fetchJsonById";
import useFetchJsonDiff from "@/hooks/useFetchJsonDiff";
import { extractDiffData } from "./extractDiffData";
import { setValueByPath, getValueByPath, cloneDeep } from "./getSetValueByPath";

const ConflictModal = ({
  isOpen,
  instrTabId,
  curEditJson,
  latestVersionId,
  fileName,
  onClose,
  onSaveMergedJson,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [initialJson, setInitialJson] = useState(null);
  const [latestJson, setLatestJson] = useState(null);
  const [hasDiff, setHasDiff] = useState(false);

  const [diffList, setDiffList] = useState([]);
  // 記錄使用者對每個 keyPath 的選擇 ("old" 或 "new")
  const [diffSelections, setDiffSelections] = useState({});

  // 初始化
  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      if (!latestVersionId) {
        setHasDiff(false);
        return;
      }

      setIsLoading(true);
      const result = await fetchJsonById(fileName, latestVersionId);
      if (result?.latestJson) {
        setInitialJson(curEditJson);
        setLatestJson(result.latestJson);
        setHasDiff(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [isOpen, fileName, latestVersionId]);

  const jsonDiff = useFetchJsonDiff(initialJson, latestJson);

  // 處理差異
  useEffect(() => {
    if (!isOpen || !jsonDiff) return;

    const changes = extractDiffData(jsonDiff?.panelsConfig?.["4"]?.panelData);

    setDiffList(changes);

    const defaultSelections = {};
    changes.forEach(({ keyPath }) => {
      defaultSelections[keyPath] = "old";
    });
    setDiffSelections(defaultSelections);
  }, [isOpen, jsonDiff]);

  if (!isOpen) return null;

  // 處理選擇
  const handleSelectionChange = (keyPath, value) => {
    setDiffSelections((prev) => ({
      ...prev,
      [keyPath]: value,
    }));
  };

  // 儲存合併結果
  const handleSave = () => {
    // 先 deep clone 一份 initialJson，避免直接改動原資料
    const mergedJson = cloneDeep(initialJson);

    // 逐筆差異檢查使用者選擇
    diffList.forEach(({ keyPath, oldValue, newValue }) => {
      const chosen = diffSelections[keyPath]; // "old" or "new"

      if (chosen === "new") {
        // 把 latestJson 裡該 keyPath 的值，設進 mergedJson
        // 或者直接用 newValue 也行，但 newValue 可能是不完整的 object
        // 建議直接拿 latestJson 裡相同路徑的值
        const pathArr = keyPath.split(".");
        // 取得 latestJson 中該位置的實際值
        const latestVal = getValueByPath(
          latestJson?.panelsConfig?.[instrTabId]?.panelData,
          pathArr
        );
        // 如果找不到 latestVal，就用 newValue 也行
        setValueByPath(
          mergedJson?.panelsConfig?.[instrTabId]?.panelData,
          pathArr,
          latestVal ?? newValue
        );
      } else {
        // chosen === "old"，理論上已經是 initialJson 裡的值，所以不用動
        // 但若要防止 initialJson 可能也沒值，也可以做類似處理
      }
    });

    // 把合併後的結果傳給父層，或在此直接做上傳
    onSaveMergedJson(mergedJson);

    // 關閉 modal
    onClose();
  };

  return (
    <div className="modal-overlay">
      {isLoading && <div className="loading-overlay" />}
      <div className="modal">
        <div className="modal-header">
          <h3>版本衝突</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        {hasDiff && (
          <div className="modal-body">
            <p>有人已修改此數據，請選擇如何處理您的更改：</p>
            {diffList.length > 0 && (
              <table className="diff-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Old Value</th>
                    <th>New Value</th>
                  </tr>
                </thead>
                <tbody>
                  {diffList.map(({ changes }) =>
                    changes.map(({ keyPath, oldValue, newValue }) => (
                      <tr key={keyPath} className="diff-row">
                        <td className="path">{keyPath}</td>
                        <td className="old-value">
                          <div className="radio-box">
                            <input
                              type="radio"
                              className="radio-btn"
                              name={keyPath}
                              value="old"
                              checked={diffSelections[keyPath] === "old"}
                              onChange={() =>
                                handleSelectionChange(keyPath, "old")
                              }
                            />
                            <span className="radio-custom" />
                            {oldValue}
                          </div>
                        </td>
                        <td className="new-value">
                          <div className="radio-box">
                            <input
                              type="radio"
                              className="radio-btn"
                              name={keyPath}
                              value="new"
                              checked={diffSelections[keyPath] === "new"}
                              onChange={() =>
                                handleSelectionChange(keyPath, "new")
                              }
                            />
                            <span className="radio-custom" />
                            {newValue}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
        {!hasDiff && (
          <div className="modal-body">
            <p>沒有衝突</p>
          </div>
        )}
        <div className="modal-footer">
          <button onClick={handleSave} className="confirm-btn">
            儲存合併結果
          </button>
          <button onClick={onClose} className="cancel-btn">
            取消
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConflictModal;
