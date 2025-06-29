import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Dropdown from "@/components/Fields/DropDown";
import { instrConfigSelector } from "@/events/202501/instrEditor/store/selector";
import {
  setInstrTempConfig,
  setFormState,
} from "@/events/202501/instrEditor/store/config/slice";
import ImageWithCollapseModal from "../../components/ImageWithCollapseModal";
import ImageWithNavTab from "../../components/ImageWithNavTab";
import SingleStaticImage from "../../components/SingleStaticImage";
import FloatImages from "../../components/FloatImages";
import Terms from "../../components/Terms";

import { formFieldsToInstrConfig } from "@/utils/jsonAdapter";
import { FIELD_TYPE } from "../../constant";
import { StyledFormBlock, StyledBtn, StyledSaveBtn } from "../styles";

const formComponents = {
  [FIELD_TYPE?.STATIC_IMAGE]: SingleStaticImage,
  [FIELD_TYPE?.IMAGE_WITH_NAV_TAB]: ImageWithNavTab,
  [FIELD_TYPE?.IMAGE_WITH_COLLAPSE_MODAL]: ImageWithCollapseModal,
  [FIELD_TYPE?.FLOAT_IMAGES]: FloatImages,
  [FIELD_TYPE?.TERMS]: Terms,
};

const Edit = ({
  className,
  formData,
  defaultValues,
  methods,
  currentPanelData,
}) => {
  const dispatch = useDispatch();
  const {
    instrConfig: { formFields },
    isPreview,
  } = useSelector(instrConfigSelector);

  const handleSave = methods.handleSubmit(async (data) => {
    await methods.trigger();
    dispatch(
      setFormState({ isPreview: true, isEdit: false, isLoadVersion: false })
    );

    const updatedPanelData = formFieldsToInstrConfig(data, currentPanelData);
    dispatch(setInstrTempConfig({ instrTempConfig: updatedPanelData }));
  });

  const handleEdit = () => {
    dispatch(
      setFormState({ isPreview: false, isEdit: true, isLoadVersion: false })
    );
  };

  return (
    <div className={className}>
      {formData?.map((data, index) => {
        const SelectedComponent = formComponents[data?.dropType];
        return (
          <StyledFormBlock key={index}>
            <Dropdown
              dropType={data?.dropType}
              formFields={formFields}
              disabled={isPreview}
            />
            {SelectedComponent ? (
              <SelectedComponent
                formId={index}
                fields={data.fields}
                defaultValues={defaultValues}
                disabled={isPreview} // 禁用所有表單欄位
              />
            ) : (
              <div>未選擇說明頁類型</div>
            )}
            <hr className="horizontal-line" />
          </StyledFormBlock>
        );
      })}

      <div className="btn-group">
        {isPreview ? (
          <StyledBtn type="button" onClick={handleEdit}>
            Edit
          </StyledBtn>
        ) : (
          <StyledSaveBtn type="submit" onClick={handleSave}>
            Save
          </StyledSaveBtn>
        )}
      </div>
    </div>
  );
};

export default styled(Edit)`
  padding: 10px 8px;

  .btn-group {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;
