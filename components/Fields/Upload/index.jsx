import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { StyledInputContainer } from "../styles";
import styled from "styled-components";
import useImageUploader from "../../../hooks/useImageUploader";
import { imageUploaderSelector } from "@/events/202501/instrEditor/store/selector";

const SingleImageUploader = ({
  className,
  onChange,
  maxFileSize = 5 * 1024 * 1024,
  acceptType = ["image/jpeg", "image/png"],
  defaultImageUrl,
}) => {
  const { uploadToS3 } = useImageUploader();
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const { modifiedImages } = useSelector(imageUploaderSelector) || {};

  useEffect(() => {
    if (defaultImageUrl) {
      const extractedFileName = defaultImageUrl.split("/").pop();
      setFileName(extractedFileName);
    }
  }, [defaultImageUrl]);

  const validateFileSize = (file) => {
    if (!acceptType.includes(file.type)) {
      return "Invalid file type";
    }
    if (file.size > maxFileSize) {
      return "File size exceeds limit";
    }
    return null;
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const error = validateFileSize(file);
    if (error) {
      setError(error);
      onChange(null);
    } else {
      setError(null);
      setFileName(file.name); // 更新顯示的檔案名稱

      onChange(file);
    }
  };

  return (
    <StyledInputContainer className={className}>
      <div className="upload-block">
        {/* 顯示已選擇的檔案名稱 */}
        {/* <button onClick={() => inputRef.current.click()}>選擇檔案</button> */}
        <div>
          <label className="input-file">
            選擇檔案
            <input
              type="file"
              accept={acceptType.join(",")}
              onChange={handleChange}
              ref={inputRef}
              style={{ display: "none" }} // 隱藏原始的 input
            />
          </label>
          {fileName && <span>{fileName}</span>}
        </div>
        {/* <span className="file-name">{fileName || "未選擇任何檔案"}</span> */}
        <button
          onClick={(e) => {
            e.preventDefault();
            uploadToS3({ defaultValue: defaultImageUrl });
          }}
          disabled={modifiedImages ? !modifiedImages[defaultImageUrl] : true}
        >
          Upload S3
        </button>
        <button onClick={() => onChange(null)} disabled>
          remove
        </button>
      </div>
      {error && (
        <div className="input-desc">
          <div className="input-alert">{error || "※請檢查欄位"}</div>
        </div>
      )}
    </StyledInputContainer>
  );
};

export default styled(SingleImageUploader)`
  .upload-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
  }

  .input-file {
    background: #676767;
    color: #fff;
    padding: 4px 6px;
    border-radius: 4px;
    margin-right: 4px;
  }
`;
