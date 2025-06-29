/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { actConfigSelector } from "@/events/202501/actPage/store/selector";
import PanelContent from "@/components/PanelContent";
import ActionButton from "@/components/ActionButton";
import { renderDefaultSeeMore } from "@/components/PanelContent/utils";
import styled from "styled-components";
import { space } from "styled-system";
import { withS3Host } from "@/utils/imageHost";
import UploadBlock from "@/events/202501/instrEditor/components/UploadBlock";
import { S3_FILE_NAME, INSTR_PAGE_ID } from "@/events/202501/actPage/constant";
import { S3_BUCKET_NAME } from "@/constants/s3";

import { checkFileExistInS3 } from "@/hoc/checkFileExist";
// import { useInstrCookies } from "@/hooks/useInstrCookies";

const Tab2 = ({ className, isEditMode, fileName, actInstrConfigData }) => {
  const {
    actConfig: { panelsConfig },
  } = useSelector(actConfigSelector);
  const [isFileExist, setIsFileExist] = useState(false);

  const panelData = panelsConfig?.[4]?.panelData;
  const router = useRouter();
  // const { setInstrCookies } = useInstrCookies();

  // 檢查檔案是否存在
  useEffect(() => {
    const fileExist = checkFileExistInS3(S3_BUCKET_NAME, S3_FILE_NAME);
    setIsFileExist(fileExist);
  }, []);

  // 跳到編輯頁
  const handleGoToEdit = async () => {
    if (!isFileExist) {
      return;
    }

    // setInstrCookies(S3_FILE_NAME, INSTR_PAGE_ID);

    router.push(
      `/events/202501/instr?fileName=${S3_FILE_NAME}&instrPageId=${INSTR_PAGE_ID}`
    );
  };

  return (
    <div className={className}>
      {isEditMode && (
        <ActionButton onClick={handleGoToEdit} disabled={!isFileExist}>
          <div className="btn-text">Edit</div>
        </ActionButton>
      )}
      <UploadBlock fileName={fileName} configData={actInstrConfigData}>
        <PanelContent
          className="panel-content"
          panelData={panelData?.slice(0, 1)}
          // onActionButtonClick={handleNavTab}
          // onOpenModalClick={handleOpenModalClick}
          renderSeeMore={(data) => {
            if (data.index !== 0) return renderDefaultSeeMore(data);

            return (
              <StyledSeeMore onClick={data?.onToggle} {...(data?.styles || {})}>
                <img
                  src={withS3Host(
                    `images/202501/act/instr/${data.open ? "see_more_open" : "see_more"}.png`
                  )}
                  alt=""
                />
              </StyledSeeMore>
            );
          }}
        />
        <PanelContent
          className="panel-content"
          panelData={panelData?.slice(1)}
          // onActionButtonClick={handleNavTab}
        />
      </UploadBlock>
    </div>
  );
};

const StyledSeeMore = styled.div`
  position: relative;
  margin: -10px auto 10px;
  width: 100px;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export default styled(Tab2)`
  ${space}

  .btn-text {
    margin-bottom: 5px;
  }
`;
