/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import SingleImageUploader from "@/components/Fields/Upload";
import useImageUploader from "@/hooks/useImageUploader";
import { space } from "styled-system";
import { withS3Host } from "@/utils/imageHost";

const StaticImage = ({
  className,
  label,
  registerName,
  defaultValue,
  required,
  defaultLabel,
  isDisabled,
}) => {
  const { uploadedImage, handleImageChange } = useImageUploader();

  // 處理圖片變更（本地選擇新圖）
  const handleImageUpdate = (file) => {
    handleImageChange(file, defaultValue);
  };

  return (
    <div className={className}>
      <h3>
        {label || defaultLabel}
        {required && <span className="need-mark">*</span>}{" "}
      </h3>
      <SingleImageUploader
        onChange={(file) => handleImageUpdate(file, defaultValue)}
        maxFileSize={5 * 1024 * 1024}
        // localModified={localModified}
        defaultImageUrl={defaultValue}
        registerName={registerName}
      />
      {!isDisabled && (
        <>
          <div>
            registerName:&nbsp;<span className="name">{registerName}</span>
          </div>
          <div>
            defaultValue:&nbsp;
            <span className="name">{defaultValue}</span>
          </div>
          <div>
            imageUrl:&nbsp;
            <span className="name">
              {uploadedImage?.previewUrl || (
                <a
                  href={withS3Host(defaultValue)}
                  target="_blank"
                  className="link-image"
                >
                  {withS3Host(defaultValue)}
                </a>
              )}
            </span>
          </div>
        </>
      )}

      {uploadedImage ? (
        <div className="image-preview">
          <img src={uploadedImage.previewUrl} alt="Uploaded" />
        </div>
      ) : defaultValue ? (
        <div className="image-preview">
          <img src={withS3Host(defaultValue)} alt="Static from S3" />
        </div>
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
};

export default styled(StaticImage)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${space}

  .name {
    color: #5e88ff;
  }

  .link-image {
    text-decoration: underline;
  }

  .image-preview {
    height: ${({ height }) => (height ? `${height}px` : "350px")};
    width: ${({ width }) => (width ? `${width}px` : "auto")};
    overflow: hidden;
    border: 1px solid #000;
    background-color: #676767;
  }

  .image-preview img {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: contain;
  }
`;
