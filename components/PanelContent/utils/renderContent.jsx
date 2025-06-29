import cx from "classnames";

import { createScrollService } from "../utils/scrollIntoView";

import Collapsible from "../Collapsible";
import { StyledPanelDetail } from "../styles";

import renderContentType from "./renderContentType";

const renderContent = ({
  index,
  content,
  // renderTitle,
  renderActionButton,
  renderPanelDetail,
  renderSeeMore,
  onCollapsibleToggle,
  onActionButtonClick,
  onOpenModalClick,
}) => {
  // const shouldRenderTitle = content?.header
  const shouldRenderActionButton = renderActionButton && content?.actionButton; // 跳轉按鈕
  const shouldRenderPanelDetail = content?.modal?.detailButton; // 機率彈窗
  const shouldRenderSeeMore = content?.collapsible; // 查看更多按鈕

  const handleDetailClick =
    (param = {}) =>
    () => {
      if (!param?.props) {
        console.error(
          "[enderSeeMore warn]:",
          "please check config panel_data[].modal"
        );
        return;
      }
      onOpenModalClick?.(param);
    };

  const defaultPanelDetail = shouldRenderPanelDetail && (
    <StyledPanelDetail
      className="panel-detail"
      buttonStyle={content?.modal?.detailButton?.style}
      onClick={handleDetailClick({
        type: content?.modal?.type,
        props: content?.modal?.props,
      })}
    >
      {renderPanelDetail({
        index,
        title: content?.modal?.detailButton?.title,
        titleImage: content?.modal?.detailButton?.titleImage,
      })}
    </StyledPanelDetail>
  );

  const handleActionButtonClick = (data) => () => {
    if (data?.scrollTarget) {
      return createScrollService({
        beforeScroll: () => onActionButtonClick?.(data?.payload),
        selector: data?.scrollTarget,
      });
    }
    return onActionButtonClick?.(data?.payload);
  };

  const actionButton = (data = {}) =>
    renderActionButton({
      index,
      shouldRenderActionButton,
      onActionButtonClick: handleActionButtonClick({
        ...content?.actionButton,
        ...data,
      }),
      ...content?.actionButton,
      ...data,
    });

  if (content?.collapsible) {
    return (
      <Collapsible
        index={index}
        defaultIsOpen={content?.defaultIsOpen}
        onCollapsibleToggle={onCollapsibleToggle}
        className={content?.header?.className}
        modalConfig={content?.modal}
        collapsibleConfig={content?.collapsible}
        renderActionButton={({ open, onToggle }) =>
          actionButton?.({ open, onToggle })
        }
        // renderHeader={(data) => {
        //   if (!shouldRenderTitle) return null
        //   return renderTitle({
        //     index,
        //     open: data?.open,
        //     title: content?.header?.title,
        //     titleImage: content?.header?.titleImage,
        //     openTitleImg: content?.header?.openTitleImg,
        //     onToggle: data?.onToggle,
        //     canToggle: content?.header?.canToggle,
        //   })
        // }}
        renderPanelDetail={({ open }) => {
          if (!shouldRenderPanelDetail) return null;
          if (!open && !content?.modal?.detailButton?.closeStyle) return null;

          return (
            <StyledPanelDetail
              onClick={handleDetailClick({
                index,
                type: content?.modal?.type,
                props: content?.modal?.props,
              })}
              className="panel-detail"
              buttonStyle={
                open
                  ? content?.modal?.detailButton?.style
                  : content?.modal?.detailButton?.closeStyle
              }
            >
              {renderPanelDetail({
                index,
                title: content?.modal?.detailButton?.title,
                titleImage: content?.modal?.detailButton?.titleImage,
              })}
            </StyledPanelDetail>
          );
        }}
        renderSeeMore={(data) => {
          if (!shouldRenderSeeMore) return null;

          return renderSeeMore?.({
            index,
            open: data?.open,
            onToggle: data?.onToggle,
            props: content?.seeMore,
          });
        }}
      >
        {renderContentType(content, index)}
      </Collapsible>
    );
  }

  if (content?.actionButton) {
    return (
      <div
        className={cx(
          "panel-content-with-action-button",
          content?.header?.className
        )}
      >
        {/* <div className="panel-content-header">
          <div className="panel-content-header-title">
            {shouldRenderTitle &&
              renderTitle({
                index,
                title: content?.header?.title,
                titleImage: content?.header?.titleImage,
              })}
          </div>
        </div> */}
        {actionButton?.()}
        <div className="panel-content-body">
          {renderContentType(content, index)}
          {defaultPanelDetail}
        </div>
      </div>
    );
  }

  return (
    <>
      {renderContentType(content, index)}
      {defaultPanelDetail}
    </>
  );
};

export default renderContent;
