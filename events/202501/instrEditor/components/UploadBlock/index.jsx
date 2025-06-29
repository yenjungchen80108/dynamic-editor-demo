import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Tabs from "@radix-ui/react-tabs";
import styled from "styled-components";

import { useHandleUpload } from "@/hooks/useHandleUpload";
import { setInstrTempConfig } from "@/events/202501/instrEditor/store/config/slice";
import {
  StyledTabsRoot,
  StyledTabsList,
  StyledTabsTrigger,
  StyledTabsContent,
} from "./styles";

const UploadBlock = ({ className, fileName, configData, children }) => {
  // const [jsonData, setJsonData] = useState(configData);
  const [tempJson, setTempJson] = useState(JSON.stringify(configData, null, 2));
  const [tempConfig, setTempConfig] = useState(configData);
  const dispatch = useDispatch();

  const { handleUpload, uploadStatus } = useHandleUpload();

  const onUploadClick = async (e) => {
    e.preventDefault();
    handleUpload(fileName, tempConfig);
  };

  const handleJsonChange = (e) => {
    const text = e.target.value;

    setTempJson(text);

    try {
      const obj = JSON.parse(text);
      setTempConfig(obj);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(setInstrTempConfig({ instrTempConfig: tempConfig }));
  }, [tempConfig]);

  return (
    <div className={className}>
      <StyledTabsRoot className="TabsRoot" defaultValue="tab1">
        <StyledTabsList className="TabsList" aria-label="">
          <StyledTabsTrigger className="TabsTrigger" value="tab1">
            JSON
          </StyledTabsTrigger>
          <StyledTabsTrigger className="TabsTrigger" value="tab2">
            Preview
          </StyledTabsTrigger>
        </StyledTabsList>
        <StyledTabsContent className="TabsContent" value="tab1">
          <button onClick={onUploadClick}>Upload JSON to S3</button>
          {uploadStatus && <p>{uploadStatus}</p>}
          <textarea
            value={tempJson} // 显示 JSON 数据
            onChange={handleJsonChange} // 监听用户修改
            rows={100}
            cols={50}
          ></textarea>
        </StyledTabsContent>
        <StyledTabsContent className="TabsContent" value="tab2">
          {children}
        </StyledTabsContent>
      </StyledTabsRoot>
    </div>
  );
};

export default styled(UploadBlock)`
  overflow: scroll;
`;
