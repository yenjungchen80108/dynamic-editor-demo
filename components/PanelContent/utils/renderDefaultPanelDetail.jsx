import { StyledCustomImage } from "../styles";
import { withS3Host } from "@/utils/imageHost";

const renderDefaultPanelDetail = ({ title, titleImage, ...props }) => {
  if (titleImage) {
    return (
      <div className="panel-detail-button">
        <StyledCustomImage
          src={withS3Host(titleImage)}
          alt=""
          {...props.styles}
        />
      </div>
    );
  }

  return <div className="panel-detail-button">{title}</div>;
};

export default renderDefaultPanelDetail;
