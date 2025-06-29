import React, { useState, useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";
import { instrConfigSelector } from "@/events/202501/instrEditor/store/selector";
import VersionSelector from "../components/VersionSelector";
import { S3_FILE_NAME } from "@/events/202501/actPage/constant";
import { setFormState } from "@/events/202501/instrEditor/store/config/slice";
import * as Tabs from "@radix-ui/react-tabs";
// import { useHandleUpload } from "@/hooks/useHandleUpload";
import Edit from "./Edit";
import Preview from "./Preview";
import { instrConfigToFormFields } from "@/utils/jsonAdapter";
import { extractRegisterValues } from "./utils";

// 定義 useReducer 的 actions
const FORM_ACTIONS = {
  INIT: "INIT",
  EDIT: "EDIT",
  LOAD_VERSION: "LOAD_VERSION",
};

// useReducer 處理函數
const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_ACTIONS.INIT:
      return action.payload; // 初始化表單
    case FORM_ACTIONS.EDIT:
      return action.payload; // 編輯時更新
    case FORM_ACTIONS.LOAD_VERSION:
      return action.payload; // 選擇歷史版本後更新
    default:
      return state;
  }
};

const Form = ({ fileName, instrTabId }) => {
  const dispatch = useDispatch();
  const [curVersionId, setCurVersionId] = useState(null);
  const [initialETag, setInitialETag] = useState(null);

  const {
    instrConfig: { formFields },
    actConfig: { panelsConfig },
    instrTempConfig,
    isEdit,
    isPreview,
    isLoadVersion,
  } = useSelector(instrConfigSelector);

  // 使用 useReducer 處理表單數據
  const [currentPanelData, dispatchForm] = useReducer(formReducer, []);

  // 監聽表單數據
  useEffect(() => {
    let sourceData = [];

    // 初始編輯模式
    if (isEdit && !isLoadVersion && !isPreview) {
      sourceData = panelsConfig[instrTabId].panelData;
    }

    // 預覽返回編輯模式
    if (isPreview && !isEdit && !isLoadVersion) {
      sourceData = instrTempConfig;
    }

    // 載入歷史版本模式
    if (curVersionId) {
      sourceData = currentPanelData;
    }

    dispatchForm({ type: FORM_ACTIONS.INIT, payload: sourceData });
    methods.reset(
      { defaultValues: instrConfigToFormFields(sourceData, formFields) },
      {
        keepDefaultValues: false,
      }
    );

    if (curVersionId) {
      setCurVersionId(null);
    }
  }, [instrTempConfig, curVersionId, instrTabId]);

  // 表單資料
  const formData = instrConfigToFormFields(currentPanelData, formFields) || [];
  const defaultValues = formData.reduce((acc, item, index) => {
    if (item.fields && Array.isArray(item.fields)) {
      extractRegisterValues(item.fields, acc, index);
    }
    return acc;
  }, {});

  const formKey = curVersionId || "default";
  const methods = useForm({
    mode: "onChange",
    key: formKey,
    defaultValues,
    shouldFocusError: false,
  });

  // get initial etag
  useEffect(() => {
    if (!fileName) return;

    const fetchLatestETag = async () => {
      try {
        const response = await fetch("/api/gen-presigned-post-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileName }),
        });

        if (!response.ok) throw new Error("Failed to get latest ETag");

        const { latestETag } = await response.json();
        console.log("initialETag", latestETag);
        setInitialETag(latestETag);
      } catch (error) {
        console.error("Error fetching latest ETag:", error);
      }
    };

    fetchLatestETag();
  }, [fileName]);

  // 選擇歷史版本時，加載新數據
  const loadConfig = async (versionId) => {
    const bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
    const objectKey = S3_FILE_NAME;
    setCurVersionId(versionId);

    dispatch(
      setFormState({ isEdit: true, isPreview: false, isLoadVersion: true })
    );

    const url = `https://${bucket}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${objectKey}?versionId=${versionId}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data");

      const newData = await response.json();

      dispatchForm({
        type: FORM_ACTIONS.LOAD_VERSION,
        payload: newData?.panelsConfig[instrTabId].panelData,
      });
    } catch (error) {
      console.error("Error loading config:", error);
    }
  };

  const tabConfig = [
    {
      label: "Edit",
      value: "edit",
      content: (
        <>
          <VersionSelector onSelect={(versionId) => loadConfig(versionId)} />
          <hr />
          <Edit
            methods={methods}
            formData={formData}
            defaultValues={defaultValues}
            currentPanelData={currentPanelData}
          />
        </>
      ),
    },
    {
      label: "Preview",
      value: "preview",
      content: (
        <Preview
          panelData={currentPanelData}
          fileName={fileName}
          instrTabId={instrTabId}
          panelsConfig={panelsConfig}
          initialETag={initialETag}
        />
      ),
    },
  ];

  return (
    <FormProvider {...methods}>
      <form autoComplete="off">
        <Tabs.Root className="TabsRoot" defaultValue="edit">
          <Tabs.List className="TabsList" aria-label="">
            {tabConfig.map((tab) => (
              <Tabs.Trigger
                key={tab.value}
                className="TabsTrigger"
                value={tab.value}
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {tabConfig.map((tab) => (
            <Tabs.Content
              key={tab.value}
              className="TabsContent"
              value={tab.value}
            >
              {tab.content}
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </form>
    </FormProvider>
  );
};

export default styled(Form)`
  padding: 10px 8px;
  .btn-group {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;
