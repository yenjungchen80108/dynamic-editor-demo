// hooks/useFileEditor.js
import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { loadJsonToYMap } from "../utils/yjs";
import { getJsonDifferences, smartMergeJson, deepSet } from "../utils/sync";
import { COMMON_MODAL_TYPE, GITLAB_BASE, PROJECT_PATH } from "../constant";
import { openCommonModal } from "../store/modal/slice";

import { useHandleUpload } from "./useHandleUpload";
import { useS3File } from "./useS3File";
import { useGitLab } from "./useGitLab";

export const useFileEditor = () => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [text, setText] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [jsonError, setJsonError] = useState(null);

  const { handleUpload } = useHandleUpload();
  const { doc, yroot, loading } = useS3File(selectedFile);
  const { commitAndOpenMR } = useGitLab();

  // 當文件加載完成時調用
  const handleInitLoad = useCallback((initialText) => {
    setText(initialText);
    setOriginalText(initialText);
    setIsEditing(false);
  }, []);

  // 當文件加載完成時，把遠端的 json 灌進 yroot
  useEffect(() => {
    if (!doc || !yroot || loading || !selectedFile) return;

    if (!loading && selectedFile) {
      const remoteJson = yroot.toJSON();

      doc.transact(() => {
        yroot.clear();
      });

      doc.transact(() => {
        loadJsonToYMap(remoteJson, yroot);
      }, "remote-init");

      handleInitLoad(JSON.stringify(remoteJson, null, 2));
    }
  }, [selectedFile, yroot, loading, doc, handleInitLoad]);

  // JSON 格式檢查和美化
  const validateAndPrettifyJson = useCallback((jsonString) => {
    try {
      // 嘗試解析 JSON
      const parsed = JSON.parse(jsonString);

      // 美化 JSON（2 個空格縮進）
      const prettified = JSON.stringify(parsed, null, 2);

      // 清除錯誤狀態
      setJsonError(null);

      return {
        isValid: true,
        prettified,
        error: null,
      };
    } catch (error) {
      // 設置錯誤狀態
      setJsonError(error.message);

      return {
        isValid: false,
        prettified: jsonString, // 保持原始文本
        error: error.message,
      };
    }
  }, []);

  const handleTextChange = (newText) => {
    setText(newText);

    // try {
    //   const json = JSON.parse(newText);
    //   console.log("[textarea change]", json);
    //   doc.transact(() => {
    //     yroot.clear();
    //     loadJsonToYMap(json, yroot);
    //   }, "local");
    //   setJsonError(null);
    // } catch (e) {
    //   console.error("Invalid JSON", e);
    //   setJsonError(e.message);
    // }
  };

  // 文件選擇處理
  const handleFileSelect = useCallback((file) => {
    setIsEditing(false);
    setOriginalText("");
    setJsonError(null); // 清除 JSON 錯誤

    if (file === selectedFile) {
      setReloadKey((prev) => prev + 1);
    } else {
      setSelectedFile(file);
    }
  }, []);

  // 切換編輯模式
  const handleToggleEdit = useCallback(() => {
    if (isEditing) {
      // 如果正在編輯，保存時檢查和美化 JSON
      const validation = validateAndPrettifyJson(text);

      if (validation.isValid) {
        // JSON 格式正確，美化並保存
        const prettifiedText = validation.prettified;
        setText(prettifiedText);
        setOriginalText(prettifiedText);
        setIsEditing(false);

        console.log("JSON validated and prettified successfully");
      } else {
        // JSON 格式錯誤，顯示錯誤但不退出編輯模式
        console.error("JSON validation failed:", validation.error);
        alert(`JSON 格式錯誤: ${validation.error}`);
        // 不設置 setIsEditing(false)，讓用戶可以繼續編輯
      }
    } else {
      // 開始編輯
      setIsEditing(true);
      setJsonError(null); // 清除之前的錯誤
    }
  }, [isEditing, text, validateAndPrettifyJson]);

  // 取得遠端 JSON
  const fetchJson = useCallback(async () => {
    const res = await fetch(
      `/api/json/get-file?fileName=${encodeURIComponent(selectedFile)}&t=${Date.now()}`
    );
    if (!res.ok) throw new Error(`Fetch failed: HTTP ${res.status}`);
    return res.json();
  }, [selectedFile]);

  // 套用合併
  const applyMerge = useCallback(
    (mergedJson) => {
      // 更新 CRDT
      doc.transact(() => {
        yroot.clear();
        loadJsonToYMap(mergedJson, yroot);
      }, "manual-merge");

      // 更新 React state
      const mergedText = JSON.stringify(mergedJson, null, 2);
      setText(mergedText);
      setOriginalText(mergedText);
      setJsonError(null);
      // dispatch(openToast({ title: '合併已套用', type: 'success' }))
      toast.success("合併已套用");
    },
    [doc, yroot, dispatch]
  );

  // **自動合併
  const handleAutoSync = useCallback(async () => {
    if (!doc || !yroot || !selectedFile) return;

    try {
      const baseJson = JSON.parse(originalText || "{}"); // 初始狀態
      const localJson = isEditing ? JSON.parse(text) : yroot.toJSON(); // 本地修改
      const remoteJson = await fetchJson();

      const mergedJson = smartMergeJson(baseJson, localJson, remoteJson);
      applyMerge(mergedJson);
    } catch (e) {
      console.error("Conflict resolution failed:", e);
      // dispatch(openToast({ title: `衝突解決失敗: ${e.message}`, type: 'danger' }))
      toast.error(`衝突解決失敗: ${e.message}`);
    }
  }, [applyMerge, dispatch, doc, originalText, selectedFile, text, yroot]);

  // **同步
  const handleSync = useCallback(async () => {
    if (!doc || !yroot || !selectedFile) return;

    try {
      const baseJson = JSON.parse(originalText || "{}"); // 初始狀態
      const localJson = isEditing ? JSON.parse(text) : yroot.toJSON(); // 本地修改
      const remoteJson = await fetchJson();

      // 自動合併
      const autoMerged = smartMergeJson(baseJson, localJson, remoteJson);
      // 取得差異
      const localDiffs = getJsonDifferences(baseJson, localJson);
      const remoteDiffs = getJsonDifferences(baseJson, remoteJson);

      const conflicts = [];
      for (const [path, localChange] of localDiffs) {
        if (remoteDiffs.has(path)) {
          const remoteChange = remoteDiffs.get(path);

          if (
            JSON.stringify(localChange.current) !==
            JSON.stringify(remoteChange.current)
          ) {
            conflicts.push({
              path,
              local: localChange.current,
              remote: remoteChange.current,
            });
          }
        }
      }

      console.log("conflicts", conflicts);
      if (conflicts.length > 0) {
        dispatch(
          openCommonModal({
            modalType: COMMON_MODAL_TYPE.MERGE_MODAL,
            modalProps: {
              title: "手動合併",
              conflicts,
              onApply: (mergedJson) => {
                const finalMerged = { ...autoMerged };
                Object.entries(mergedJson).forEach(([path, val]) => {
                  deepSet(finalMerged, path, val);
                });
                console.log("finalMerged", finalMerged);
                applyMerge(finalMerged);
              },
            },
          })
        );
      } else {
        await handleAutoSync();
      }
    } catch (e) {
      console.error("Conflict resolution failed:", e);
      // dispatch(openToast({ title: `衝突解決失敗: ${e.message}`, type: 'danger' }))
      toast.error(`衝突解決失敗: ${e.message}`);
    }
  });

  // 拉取最新文件
  const handlePull = useCallback(async () => {
    console.log("Pulling latest version of:", selectedFile);
  }, [selectedFile]);

  // 推送更改
  const handlePush = useCallback(
    async (e) => {
      e.preventDefault();
      if (isUploading) return;
      setIsUploading(true);

      // 推送前再次檢查和美化 JSON
      const validation = validateAndPrettifyJson(text);

      if (!validation.isValid) {
        alert(`無法推送：JSON 格式錯誤 - ${validation.error}`);
        return;
      }

      // JSON 格式正確，進行推送
      // console.log('Pushing changes for:', selectedFile)
      // console.log('Content:', validation.prettified)
      console.log("pushing", selectedFile, validation.prettified);

      try {
        await handleUpload(selectedFile, JSON.parse(validation.prettified));
        // 推送成功後，更新 base 狀態
        const prettifiedText = validation.prettified;
        setText(prettifiedText);
        setOriginalText(prettifiedText); // 更新 base 狀態
        setIsEditing(false);
      } catch (error) {
        console.error("Push failed:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [handleUpload, isUploading, selectedFile, text, validateAndPrettifyJson]
  );

  // 重置所有狀態（可選，用於清理）
  const resetEditor = useCallback(() => {
    setSelectedFile(null);
    setIsEditing(false);
    setText("");
    setOriginalText("");
    setJsonError(null);
  }, []);

  // const openNewMR = ({ sourceBranch, targetBranch, title, description }) => {
  //   const url = new URL(`${GITLAB_BASE}/${PROJECT_PATH}/-/merge_requests/new`);
  //   url.searchParams.set("merge_request[source_branch]", sourceBranch);
  //   url.searchParams.set("merge_request[target_branch]", targetBranch);
  //   if (title) url.searchParams.set("merge_request[title]", title);
  //   if (description)
  //     url.searchParams.set("merge_request[description]", description);
  //   window.open(url.toString(), "_blank");
  // };

  // 發送合併到本地
  const handleMergeToLocal = useCallback(() => {
    console.log("merge to local", selectedFile);
    dispatch(
      openCommonModal({
        modalType: COMMON_MODAL_TYPE.REQUEST_MODAL,
        modalProps: {
          title: "發 MR 到遠端",
          filePath: selectedFile,
          onSubmit: async ({
            sourceBranch,
            targetBranch,
            commitMessage,
            mrTitle,
            authorName,
            authorEmail,
          }) => {
            try {
              await commitAndOpenMR({
                projectPath: PROJECT_PATH,
                sourceBranch,
                targetBranch,
                commitMessage,
                filePath: selectedFile, // e.g. 'configs/foo.json'
                content: text, // 編輯器最新內容
                mrTitle,
                authorName,
                authorEmail,
              });
            } catch (e) {
              console.error(e);
              alert("操作失敗: " + e.message);
            }
          },
        },
      })
    );
  }, [selectedFile, text]);

  // 檢查是否有未保存的更改
  const hasUnsavedChanges = text !== originalText && text !== "";

  // 檢查是否可以執行各種操作
  const canPull = selectedFile && !isEditing;
  const canEdit = selectedFile;
  const canPush = selectedFile && isEditing && !jsonError; // 只有在沒有 JSON 錯誤時才能推送

  // 手動美化 JSON 功能
  const prettifyJson = useCallback(() => {
    const validation = validateAndPrettifyJson(text);
    if (validation.isValid) {
      setText(validation.prettified);
    }
  }, [text, validateAndPrettifyJson]);

  return {
    // 狀態
    selectedFile,
    isEditing,
    text,
    originalText,
    hasUnsavedChanges,
    jsonError, // 新增：JSON 錯誤狀態
    reloadKey,

    // 操作權限檢查
    canPull,
    canEdit,
    canPush,

    // 處理函數
    handleInitLoad,
    handleTextChange,
    handleFileSelect,
    handleToggleEdit,
    handlePull,
    handleSync,
    handleAutoSync,
    handlePush,
    handleMergeToLocal,
    resetEditor,
    prettifyJson, // 新增：手動美化 JSON
    validateAndPrettifyJson, // 新增：驗證和美化函數
  };
};
